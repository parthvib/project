function chechauthstatus(req,res,next){
    const uid =req.session.uid;


    if(!uid){
        return next();
    }
res.locals.uid=uid;//to store user id (csrf token)
res.locals.isauth=true;//to indicate that user we are working on is auhtenticated
res.locals.isAdmin=req.session.isAdmin;

next();
}
//for incoming request we can check for uid as it is mentioned
//next method meand the request is passed to another middleware
//it just means that the code after that gets executed
//locals which we used again for csrf token
//isauth=true means that the user is authenticated
module.exports=chechauthstatus;




