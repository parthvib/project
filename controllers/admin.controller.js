//const product = require('../models/products.model');
const Product = require('../models/products.model');
const Order =require('../models/order.model');

async function getproducts(req, res, next) {
    try {

        const products = await Product.findAll();
        res.render('admin/products/all-products', { products: products });
    }
    catch (error) {
        next(error);
        return;
    }

}
function getnewproduct(req, res) {
    res.render('admin/products/new-products');

}//this function will be responsible for showing  new products
async function createnewProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });

    // console.log(req.body);
    // console.log(req.file);
    try {
        await product.save();
    }
    catch (error) {
        next(error);
        return;

    }


    res.redirect('/admin/products');

}//this function is responsible for submitting the new product

async function getupdateproduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        // console.log(req.params.id);
        //by this way we can extract values from id or url
        res.render('admin/products/update-product', { product: product });//the product in above line is passed into this template

    }
    catch (error) {
        next(error);
    }
}

async function updateproduct(req, res, next) {
    const product = new Product({
        // title:req.body.title,
        // price:req.body.price instead of writting this we simply have to write 
        ...req.body,
        _id: req.params.id
    });
    if (req.file) {
        //replace the old image with the new one
        product.replaceImage(req.file.filename);
    }
    try {

        await product.save();
    }
    catch (error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
    
}

async function deleteProduct(req,res,next){
    let product
    try{

        product = await Product.findById(req.params.id);
        await product.remove();
    } catch(error)
    {
        return next(error);
    }
    res.json({message: 'Deleted product'});

}

    // res.redirect({message:'deleted product'});we are 
    //we are redirecting even though we are sending javascripts requests that's why the csrf error appereared
    // we dont load a new page and thid front end javascript does not support 
    //so  we will target and trigger with the help of ajax request 

    async function getOrders (req, res, next) {
        try {
        const orders = await Order.findAll();
        res.render ('admin/orders/admin-orders',{
            orders:orders});
            
        }catch(error){
            next(error);
        }
    }
    async function updateOrder (req, res, next) {
        const orderId = req.params.id;
        const newStatus = req.body.newStatus;

try {
    const order = await Order.findById(orderId);
    order.status = newStatus;
    await order.save();
    res.json({ message: 'Order updated', newStatus: newStatus });

    }catch(error){
        next(error);
    }

    }



module.exports = {
    getproducts: getproducts,
    getnewproduct: getnewproduct,
    createnewProduct: createnewProduct,
    getupdateproduct: getupdateproduct,
    updateproduct: updateproduct,
    deleteProduct:deleteProduct,
    getOrders:getOrders,
    updateOrder:updateOrder
}