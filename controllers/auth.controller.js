//this file contains the function that needs to handled by
//the request
//we have to create a function that needs to be active when the
// request is sent
const User = require('../models/user.model');
const authutil = require('../util/authentication');
const validation = require('../util/validation');
//const userDetailsAreValid = require('../util/validation');
const sessionFlash = require('../util/session-flash');

function getsignup(req, res) {
let sessionData=sessionFlash.getSessionData(req);


//let is used because we are overwriting it in the next line
if(!sessionData){
    sessionData={
        email:'',
        confirmEmail:'',
        password:'',
        fullname:'',
        street:'',
        postal:'',
        city:'',
//default data
    };
}

    res.render('customer/auth/signup',{inputData:sessionData});
    //this inputData will be used in the template later


}

async function signup(req, res, next) {
    const enteredData={
       email: req.body.email,
       confirmEmail:req.body['confirm-email'],
       password: req.body.password,
       fullname:req.body.fullname,
        street:req.body.street,
        postal:req.body.postal,
        city:req.body.city
    };



    if(!validation.userDetailsArevalid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
        
        )|| !validation.emailIsconfirmed(req.body.email,req.body['confirm-email'])
    )
        {
           sessionFlash.flashDatatoSession(req, {
               errorMessage:'Please check your input.password must be atleast 6 character long',
               ...enteredData//this is to preserve the input 
           },function(){

               res.redirect('/signup');
           }) 
        return;

    }


    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.phno,
        req.body.street,
        req.body.postal,
        req.body.city
    );
   

try{
    const existsAlready=await user.existsAlready();
    if(existsAlready){
        sessionFlash.flashDatatoSession(
            req,
            {
            errorMessage:'user exixts already! try logging in instead',
            ...enteredData,
            },
            function(){
                res.redirect('/signup');

            });
        return;
    }
    await user.signup();
}
catch(error){
    next(error);
    return;
}
            //instead of redirecting we should render the page then with render we will not generate any extra 
            //cycle we return a new request cycle and we can not use html show changes 
            //because we use html and if user clicks on the submit data again then that will be problematic
            //so we have can use session for showing temporary message 
            //and res.redirect is only used in such case

            
        
    


    // await user.signup();
    //the function below can throw error so for that we have to put an error handler


    res.redirect('/login');

    //to store that data into database
}
//in this user we pass various values as this includes
//various values

function getlogin(req, res) {

    let sessionData=sessionFlash.getSessionData(req);
    if(!sessionData){

       sessionData={
        email:'',
        password:''
       }; 
    }



    res.render('customer/auth/login',{inputData:sessionData});
}
// const sessionErrorData={
    
//     errorMessage:'Invalid credentials-please double-check your email and password',
//     email:user.email,
//     password:user.password
// };

async function login(req,res,next) {
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try{
        existingUser =await user.getuserWithsameEmail();

    }   catch(error){
        next(error);
        return;
    }


const sessionErrorData={
    errorMessage:'invalid credentials-please double check your mail and password',
    email:user.email,
    password:user.password
}


   // const existingUser = await user.getuserWithsameEmail();
    if (!existingUser) {
        sessionFlash.flashDatatoSession(req,sessionErrorData,function(){

            res.redirect('/login');
        })
        return;
    }
    const passwordIscorrect=await user.hasmatchingPassword(
        existingUser.password
    );
    if(!passwordIscorrect)
    {

        sessionFlash.flashDatatoSession(req,sessionErrorData,function(){

            
        res.redirect('/login');
        })
        return;
    }



    // const passwordIscorrect =  user.hasmatchingPassword(existingUser.password);
    // //the password which we got from the database
    // if (!passwordIscorrect) {
    //     sessionFlash.flashDatatoSession(req,sessionErrorData,function(){

    //         res.redirect('/login');
    //     })
    //     return;
    // }
    //if password is correct than we want user to logged in /this user to which session belongs should be treated as logged in and for that we need a new folder which is util
    authutil.createuserSession(req, existingUser, function () {
        res.redirect('/');
    });

    //forward request object ,login functon also gets the request object 
    //existing user which we got from the database 
    //function that should be executed once the session was saved
    //and that logic is in util authentication file

}


//we send single function but we have send more function 
//so we create an object that will combine that

function logout(req, res) {
    authutil.destroyuserAuthSession(req);
    res.redirect('/login');
}
//function to be performed when user clicks on logout button
//we have to destroy user session in order to logout so for that in 
// util folder where we created the session we have delete there

module.exports = {
    getsignup: getsignup,
    getlogin: getlogin,
    signup: signup,
    login: login,
    logout: logout

};