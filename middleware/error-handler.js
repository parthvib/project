function handleerrors(error,req,res,next){
console.log(error);
res.status(500).render('shared/500');
//500 indicates server side error

if(error.code === 404){
    return res.status(404).render('shared/404');
}

}
//express will call this function whenever we have error in other middlewares

module.exports=handleerrors;

//