
const Product = require('../models/products.model');//this class has method to talk to databse and 
//fecthing data from the database

function getCart(req, res){
res.render('customer/cart/cart');
}

async function addCartItem(req, res, next) {
    let product;
    try {

        product = await Product.findById(req.body.productId);
    }
    catch (error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;
    cart.addItem(product);//we have to add the product that should be added
    //to add item we need to pass the product that should be added to the cart and for that we need
    //access to the data base
    req.session.cart = cart;//updated cart is saved back to the session

    res.status(201).json({
        message: 'cart updated',
        newTotalItems: cart.totalQuantity//it returns no of items stored in the cart 
        //it total quantity will sums up the cart items
    });
}
function updateCartItem(req,res){
const cart = res.locals.cart;

const updatedCartData=cart.updateItem(req.body.productId, +req.body.quantity);//the quantity updated is always a number

req.session.cart = cart;
res.json({
    message:'Item updated!',
    updatedCartData:{
        newTotalQuantity:cart.totalQuantity,
        newTotalPrice:cart.totalPrice,
        updateItemPrice:updatedCartData.updateItemPrice
    }
});

}
module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem:updateCartItem

};