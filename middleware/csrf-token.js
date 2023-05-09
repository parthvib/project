//express will call middlewares and will values in the below function


function addcsrftoken(req,res,next)
{

res.locals.csrftoken=req.csrfToken()
// this csrfToken method is made available by csurf package
//this method generates a valid token and that token is stored in that variable we created
//which is made available in other files

next();//this is a function which when executed forwards the requests to other middleware


}

module.exports=addcsrftoken;



