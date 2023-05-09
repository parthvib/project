const { get } = require('express/lib/response');
const mongodb=require('mongodb');

const MongoClient =mongodb.MongoClient;

let database;

async function connecttodatabase(){
const client=await MongoClient.connect('mongodb://0.0.0.0:27017/');
database=client.db('online-shop');

}
function getdb(){
    // if(!database)
    // {
    //     throw new Error('you must connect first');
    // }
    return database;
}
module.exports={
    connecttodatabase:connecttodatabase,
    getdb:getdb
};
