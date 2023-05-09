
const Product = require('../models/products.model');
//we already have find all products function so we have to import
//that file 

 async function getAllproducts(req,res,next){

    try{
        const products= await Product.findAll();
        res.render('customer/products/all-products', {products:products});
        //this means that in this all product template we can loop through the products

    }
    catch(error)
    {
        next(error);
    }

    
}

async function getProductDetails(req,res,next){
   try{
   
    const product = await Product.findById(req.params.id);
    res.render('customer/products/product-details' , {product:product});
   } catch (error){
       next(error);
   }

}
 
module.exports={
    getAllproducts:getAllproducts,
    getProductDetails:getProductDetails
};
