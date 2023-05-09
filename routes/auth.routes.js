const express=require('express');
const router = express.Router();
const authcontroller=require('../controllers/auth.controller');

//....
router.get('/signup',authcontroller.getsignup);//we usually add function that needs to be handled when we get request 
//but we now do that in controller function

router.post('/signup',authcontroller.signup);


//commonly post request is for forms or signup
router.get('/login',authcontroller.getlogin);//we usually add function that needs to be handled when we get request 

router.post('/login',authcontroller.login)

router.post('/logout',authcontroller.logout);



module.exports=router;//this shows which features should be added to other files
//and which other files can access it 
