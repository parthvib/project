
const express=require('express');
const adminController = require('../controllers/admin.controller');
//const adminController = require('../controllers/admin.controller');
const router = express.Router();

const admincontroller=require('../controllers/admin.controller');
const imageuploadmiddleware=require('../middleware/image-upload');


router.get('/products', admincontroller.getproducts);//in head ejs we have written that link so...

router.get('/products/new',admincontroller.getnewproduct);//where user can add new products
// /admin is added in another place 
// admin is written in app.js file
//the controller actions are written in controller.js file
router.post('/products', imageuploadmiddleware,admincontroller.createnewProduct);
// /admin gets ommitted because we created a seprate file
//imageuploader middleware ensures that the uploaded file is extracted and stored 

router.get('/products/:id',admincontroller.getupdateproduct);//this will be a different value everytime when this page is visited

router.post('/products/:id',imageuploadmiddleware,admincontroller.updateproduct);//this will be a different value everytime when this page is visited

router.delete('/products/:id',admincontroller.deleteProduct);//delete is a ajax syntax  and then mannually update the dom 
//it is ajax request
//for that new file product-management js is created
router.get('/orders', admincontroller.getOrders);

router.patch('/orders/:id',admincontroller.updateOrder);

module.exports=router;//this shows which features should be added to other files
//and which other files can access it 
