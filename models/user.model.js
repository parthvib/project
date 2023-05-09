//this file is for storing user data / users in signup
//classes a javasricpt objects that create blueprints of the object that we want to create in future
//constructor-will be called  automatically whenever we create an instance based on the class with a new keyword
const bycrypt = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const mongodb = require('mongodb');


const db = require('../data/database');//this will give access to the exported object from that database.js file




class User {
    constructor(email, password, fullname,phno, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.phno=phno;
        this.address = {
            cstreet: street,
            cpostal: postal,
            ccity: city

        };// address os object

    }
    //this.email will store all received values by using this keyword we are reffering to the to be created object

    //to work with orders findbyId to return data about user
    static async findbyId(userId) {
        const uid = new mongodb.ObjectId(userId);
        return db
            .getdb()
            .collection('users')
            .findOne({ _id: uid }, { projection:{password: 0} });
    }

    getuserWithsameEmail() {
        return db.getdb().collection('users').findOne({ email: this.email });
    }
    //this function will check whether the email is valid or not .
    async existsAlready() {
        const existingUser = await this.getuserWithsameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async signup() {

        const hashpassword = await bycrypt.hash(this.password, 12);



        //with insert one we can enter a new document
        //this signup will store user data input,it takes the property of the above object and stores
        //this property in the database

        await db.getdb().collection('users').insertOne({
            email: this.email,
            password: hashpassword,//the passsword is stored in text format because of security issues
            //and this is then stored in hash format which is cumbersome and hence to convert that in hash format we a library known  bcryptjs  
            name: this.name,
            phno:this.phno,

            address: this.address
        });
    }

    hasmatchingPassword(hashpassword) {
        return bcrypt.compare(this.password, hashpassword);
    }//this function needs user password and the hashed password
    //this.password is the unhashed password entered by the user 
}
//we need methods for comparing the user password

module.exports = User;



