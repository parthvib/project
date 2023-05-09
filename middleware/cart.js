const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
    let cart;
    if (!req.session.cart) {
        cart = new Cart();//initialize with new empty cart 

    }
    else {
        const sessionCart = req.session.cart;//the when refresed the data in cart is gone so for that
        cart = new Cart(
             sessionCart.items,
             sessionCart.totalQuantity,
             sessionCart.totalPrice
             );
        //items property cart.model file
    }
    res.locals.cart = cart; //to make that available for all the response cycle
    next();//so that the request can travel to next middleware
}
module.exports = initializeCart;
