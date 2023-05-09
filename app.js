
const path=require('path');
const express=require('express');
const csurf =require('csurf');
//the csurf will protect our website and we have to have token attached 
//for post requestss
const expresssession=require('express-session');
const createsessionconfig=require('./config/session');

const db=require('./data/database');
//here we need to get aware of the routes

const addcsrftokenmiddleware = require('./middleware/csrf-token');

const errorhandlermiddleware=require('./middleware/error-handler');
const checkauthstatusmiddleware=require('./middleware/check-auth');
const protectRoutesmiddleware=require('./middleware/protect-routes');
const cartMiddleware=require('./middleware/cart');
const updatecartprices =require('./middleware/update-cart-price');
const authroutes=require("./routes/auth.routes");
//'./' means that look for the routes folder we are currently in 
const productroutes=require('./routes/products.routes');
const baseroutes=require('./routes/base.routes');
const adminroutes=require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes=require('./routes/orders.routes');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));//this will construct an absolute path
app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));//this will serve images folder statically 
app.use(express.urlencoded({extended: false}));
//to accept all the values and it is set to false to make regular form submmision

app.use(express.json());//json data will be parsed with this


const sessionconfig=createsessionconfig();

app.use(expresssession(sessionconfig));
app.use(csurf());
//we hve write this app.use middleware after app.use(csurf) because
//this csurf provides that token
app.use(cartMiddleware);//after initialiazing session because we are using session in that middleware
//app.use(updatecartprices);
app.use(addcsrftokenmiddleware);
app.use(checkauthstatusmiddleware);
//we are not writing () after above function because we want express to process it
//csurf will deny the requests that doesn't have token attached  
app.use(baseroutes);
app.use(authroutes);
app.use(productroutes);
app.use('/cart',cartRoutes);
app.use(protectRoutesmiddleware);
app.use('/orders',orderRoutes)
app.use('/admin',adminroutes);
//after protect routes because orders is only available if we are logged in


//this makes sures that for all requests this function is evlauted
// to protect the routes we have to make sure that requests to / admin routes are only sent if we add the routes 

app.use(errorhandlermiddleware);


db.connecttodatabase().
then(function(){
app.listen(3000);
})
.catch(function(error)
{
    console.log('failed to connect to database');
    console.log(error);
});

//app.listen(3000);it will only start or show the page if databse is connected