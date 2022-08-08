const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//------------ Local User Model ------------//
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //------------ User Matching ------------//
        await prisma.user
          .findFirst({
            where: { email: email },
          })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "This email ID is not registered",
              });
            }

            //------------ Password Matching ------------//
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Password incorrect! Please try again.",
                });
              }
            });
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: { id: Number(id) },
      });
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
