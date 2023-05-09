
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51N5BoISGC4iX2KGEiOZIHWTMzQ22Rvh9U5GWo24SaF3y9LZIu253ouMju8CrWIYkBtRfxq3wxdKifL8tAo21mYzD00dxmPvEOH');



const Order=require('../models/order.model');
const User = require('../models/user.model');

//const stripeobj=stripe('sk_test_51N5BoISGC4iX2KGEiOZIHWTMzQ22Rvh9U5GWo24SaF3y9LZIu253ouMju8CrWIYkBtRfxq3wxdKifL8tAo21mYzD00dxmPvEOH');

async function getOrders(req,res,next){
    try{

        const orders = await Order.findAlluser(res.locals.uid);
        res.render('customer/orders/all-orders',{//to get their own orders
            orders: orders
             //to the above template the orders that are found are passed

        });

    }catch(error){
        next(error);
         
    }
}

async function addOrder(req,res,next){
    const cart =res.locals.cart;
    let userDocument
    try{

       userDocument = await User.findbyId(res.locals.uid);
    }
    catch(error)
    {
        return next(error);
    }
    const order = new Order(cart,userDocument);

    try{

        
       await order.save();
    
    }
    catch(error){
        next(error);
        return;

    }
    req.session.cart =null;//to clear cart once the order is placed

  

    
    const session = await stripe.checkout.sessions.create({
        line_items:cart.items.map(function(item){
            return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
       // price: '{{PRICE_ID}}',
       price_data:{
        currency:'inr',
        product_data:{
          name:item.product.title,  
        },
        unit_amount:+item.product.price.toFixed(2) * 100
    
       },
        quantity: item.quantity,
      }

       
    }),
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
}
function getsuccess(req,res){
    res.render('customer/orders/success');

}
function failure(req,res){
    res.render('customer/orders/failure');
    
}




    //res.redirect('/orders');




module.exports={
    addOrder:addOrder,
    getOrders:getOrders,
    getsuccess:getsuccess,
    failure:failure
}