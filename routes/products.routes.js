
const express=require('express');
const productsController=require('../controllers/products.controller');

const router = express.Router();


router.get('/products', productsController.getAllproducts);
    
router.get('/products/:id', productsController.getProductDetails);



module.exports=router;//this shows which features should be added to other files
//and which other files can access it 
