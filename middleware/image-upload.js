const multer=require('multer');
const uuid=require('uuid').v4;
const upload=multer({
    storage:multer.diskStorage({
        destination:'product-data/images',
        filename:function(req,file,cb){
        cb(null,uuid()+ '-' + file.originalname);

        }// this file holds information about the file,this original name 
        //includes the original file extension
        
    })
});

const configuredmulteredmiddleware=upload.single('image');
//this multer allows us to accept various files

module.exports=configuredmulteredmiddleware;
//this will extract a image and store it in a wrong path
//and will store it under a wrong name

