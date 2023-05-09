const express=require('express');
const orderscontroller = require('../controllers/orders.controller');
const router = express.Router();

router.post('/',orderscontroller.addOrder);//prefix is added in app.js '/orders'

router.get('/',orderscontroller.getOrders);

router.get('/success',orderscontroller.getsuccess);
router.get('/failure',orderscontroller.failure);

//patch is used when we are updating parts of the exixting data

module.exports=router;//this shows which features should be added to other files
//and which other files can access it 
