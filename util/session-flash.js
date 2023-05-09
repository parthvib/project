function getSessionData(req){
const sessiondata=req.session.flashedData;

req.session.flashedData=null;
return sessiondata;
}



function flashDatatoSession(req,data,action){
req.session.flashedData = data;
req.session.save(action);

}
//request object to access the session
//data that should be flashed 
//action/function that should be executed when the function is called 

module.exports={
    getSessionData:getSessionData,
    flashDatatoSession:flashDatatoSession
}