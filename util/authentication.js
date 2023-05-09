function createuserSession(req,user,action){

req.session.uid = user._id.toString();
req.session.isAdmin=user.isAdmin;
req.session.save(action);
//this req.session is the property given session package
//by this we can store any data we want to store in that session
//_id is the id format used in mongodb
//and we are converting that id to string
// =========================
//after updating the session we need to save that by save method from the package
//and the action will only executed once the session was saved
//and the action is the anonyms function we passed in controller file
//request object to access the session
//user that we created for all the data that belongs to that user 
//action that should be executed once the session was updated 
//so if we redirect the user we only redirect once the session is saved only when updated session data was saved 
//-- in session store

//this function shows that we dont have any user id
//and when we dont have any user id, ofcourse we are logged out 

}

function destroyUserAuthSession(req){
    req.session.uid=null;

}
module.exports={
    createuserSession:createuserSession,
    destroyuserAuthSession:destroyUserAuthSession

};