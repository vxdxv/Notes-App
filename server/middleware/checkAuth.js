function isLoggedIn(req,res,next){
    if(req.user) next();
    else res.status(401).send("Access Denied");
}
export default isLoggedIn; 