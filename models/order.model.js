const { MongoDBNamespace } = require('mongodb');
const mongodb=require('mongodb');
const db = require('../data/database');


class Order {

    //status=> pending ,fullfilled ,cancelled
    constructor(cart, userData, status = 'pending', date, orderId) {//the date parameter will receive date in string form and the built in date class will convert it 
        //into date format 
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);//built in class to construct a date

        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });//this allows us to convert the date in more human readable date


            this.id = orderId;
        }



    }//constructor for initializing order object
    //we need various data such as cart user data such as name id address,date when the order was placed

    static transformOrderDocument(orderDoc){
        return new Order(
            orderDoc.productData,
            orderDoc.userData,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id
        );
        
    }

static transformOrderDocuments(orderDocs)
{
    return orderDocs.map(this.transformOrderDocument);
}

static async findAll()
{
    const orders = await db.getdb().collection('orders').find().toArray();
    return this.transformOrderDocuments(orders);

}

static async findAlluser(userId){
    const uid = new mongodb.ObjectId(userId);

    const orders = await db
    .getdb()
    .collection('orders')
    .find({'userData._id':uid})
    .sort({_id: -1})
    .toArray();

    return this.transformOrderDocuments(orders);

}
static async findById(orderId){
    const order = await db.getdb().collection('orders').findOne({_id: new mongodb.ObjectId(orderId)});
    return this.transformOrderDocument(order);

}


    save() {
        if (this.id) {
            const orderId = new mongodb.ObjectId(this.id);
            return db.getdb().collection('orders').updateOne({_id:orderId},{$set:{status:this.status}});

            //updating
        } else {
            const orderDocument = {
                userData:this.userData,
                productData:this.productData,
                date:new Date(),
                status:this.status,
            };
           return db.getdb().collection('orders').insertOne(orderDocument);
        }
    }//we have to diffrentiate between 2 cases that are updating and other is adding a new order.




}


module.exports = Order;