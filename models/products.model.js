const mongodb = require('mongodb');

const db = require('../data/database');


class Product {
    constructor(productdata) {
        this.title = productdata.title;//this title and all are the name of the fields written in form
        this.summary = productdata.summary;
        this.price = +productdata.price;//it will force and convert it to a number
        this.description = productdata.description;

        this.image = productdata.image;//the name of image file will be stored
        this.updateImagedata();
        // this.imagepath = `product-data/images/${productdata.image}`;
        // //it is full path of the image;
        // this.imageurl = `/products/assets/images/${productdata.image}`;
        if (productdata._id) {
            this.id = productdata._id.toString(); //this id is the id generated automatically 

        }//this condition will extract and store id if there is a unique id 
        //this ensures that if we create a product without any id then we dont get any error
    }//storing all the data we need to store in the class
    
    static async findById(productId){
        let prodId;
        // JSON.stringify(productId);
        console.log(productId);
        try{

           prodId = new mongodb.ObjectId(productId);
        } catch(error){
            error.code = 404;
            throw error;
        }
        // JSON.stringify(prodId);
        // console.log(prodId);
       

        const product=await db
        .getdb().
        collection('products')
        .findOne({ _id: prodId });

        if(!product){
            const error=new Error('Could not find product with provided id');
            error.code=404;
            throw error;
        }

        return new Product(product);
    }

    static async findAll() {
        const products = await db.getdb().collection('products').find().toArray();//it will give all the data
        return products.map(function(productdocument) {
            return new Product(productdocument);
        });

    }
    // static async findMultiple(ids){
    //     const productIds=ids.map(function(id){
    //         return new mongodb.ObjectId(id);

    //     })
    //     const products = await db.getdb().collection('products').find({_id:{ $in: productIds}}).toArray();
    //     return products.map(function(productdocument){
    //         return new Product(productdocument);

    //     });
    // }

    updateImagedata(){
        
        this.imagepath = `product-data/images/${this.image}`;
        //it is full path of the image;
        this.imageurl = `/products/assets/images/${this.image}`;
    }

    //this is to view in all products page
    async save() {

        const productdata = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
        };

        if(this.id){
            //...
            const productId=new mongodb.ObjectId(this.id);
            if(!this.image){
                delete productdata.image;
            }
           await db.getdb().collection('products').updateOne({_id:productId},{
                $set:productdata,
            });


        }
        else{

            await db.getdb().collection('products').insertOne(productdata);
        }



    }
    replaceImage(newImage){
        this.image=newImage;
        this.updateImagedata();

    }

    remove(){
       const productId= new mongodb.ObjectId(this.id);
      return db.getdb().collection('products').deleteOne({ _id : productId});
      
    }

}//this method we do interaction with the database 

//to define a blue print 
module.exports = Product;