
const globalCtrl = (req,res,next) => {
 
  if (req.user) {
    user = req.user;
  } 
  
  
 
  next();
}



module.exports= globalCtrl