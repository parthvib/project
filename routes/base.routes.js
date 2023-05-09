
const express=require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.redirect('/products');

});

// we have to define baseroutes for 401
router.get('/401',function(req,res){
res.status(401).render('shared/401');

});
router.get('/403',function(req,res){
    res.status(403).render('shared/403');
    
    });



module.exports=router;//this shows which features should be added to other files
//and which other files can access it 
