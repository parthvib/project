//this file is for session setup work
//to keep the app.js file clean

const expresssession=require('express-session');

const mongoDbStore=require('connect-mongodb-session');
const { Store } = require('express-session');

function createSessionStore(){
    const MongoDbStore=mongoDbStore(expresssession);//mongoDbstore is a function to create session

    const store=new MongoDbStore({
      uri:'mongodb://0.0.0.0:27017/',
       databaseName:'online-shop',
       collection:'sessions' //this collection means database where we will store this sessions
    });

    return store;

}

//this function is used to create a configauration for the store
//we will return an object because  express session pacakge wants an object 
function createsessionconfig(){
    return{
        //we have to set up secret key for securing the session  
        secret:'super-secret',
        resave:false,
        saveUninitialized:false,//it stores in database when some values are changed
        store :createSessionStore(),
        cookie:{
            maxAge:2 *24 *60 *60 *1000 //to set this to 2 days 
        }
    };//this ensures that only save data in databse if it really changed and store to create session store  

}
module.exports=createsessionconfig;


