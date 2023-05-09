const express=require('express');
const router = express.Router();
const cartcontroller = require('../controllers/cart.controller');

router.get('/',cartcontroller.getCart)
router.post('/items',cartcontroller.addCartItem);// '/' cart prefix is added in app.js

router.patch('/items',cartcontroller.updateCartItem);

//patch is used when we are updating parts of the exixting data

module.exports=router;//this shows which features should be added to other files
//and which other files can access it 
