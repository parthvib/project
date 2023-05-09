const Product = require("./products.model");

class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {//if no items are then we automatically use empty array
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;

    }
// async updatePrices(){
//     const productIds=this.item.map(function(item){
//         return item.product.id;
//     });
//     const products = await Product.findMultiple(productIds);
//     const deletableCartItemProductIds=[];
//     for(const cartItem of this.items){
//         const product = products.find(function(prod){
//             return prod.id === cartItem.product.id;

//         });
//         if(!product){
//             //product deleted
//             deletableCartItemProductIds.push(cartItem.product.id);
//             continue;
//         }
//         cartItem.product=product;
//         cartItem.totalPrice=cartItem.quantity * cartItem.product.price;
//     }
//     if(deletableCartItemProductIds.length>0){
//         this.items=this.items.filter(function(item){
//             return productIds.indexOf(item.product.id)<0;
//         });
//     }
//     this.totalQuantity=0;
//     this.totalPrice=0;
//     for(const item of this.items){
//         this.totalQuantity=this.totalQuantity + item.quantity;
//         this.totalPrice = this.totalPrice + item.totalPrice;
//     }
// }


    addItem(product) {
        //product object full of product data
        //we have to store this cart items in user session
        //visitors should be able to add items to cart without forcing them to 
        //log in or signup 
        const cartItem = {//in const memory of the object is stored
            product: product,
            quantity: 1,
            totalPrice: product.price
        };

        for (let i = 0; i < this.items.length; i++) {

            const item = this.items[i];
            if (item.product.id === product.id) {
                cartItem.quantity = +item.quantity + 1;//so that the item is converted to numbers and then 1 is added
                cartItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cartItem;

                this.totalQuantity++;
                this.totalPrice += product.price;


                return;//because we dont want to execute further code
            }

        }

        this.items.push(cartItem);//it pushes new element into that array at the end of the array
        //we will have to aggregate that product data, avoid duplicate data in that item  
        //for that we have to check if the product is added to cart array

        this.totalQuantity++;
        this.totalPrice += product.price;



    }



    updateItem(productId, newQuantity) {//quantity is qauntity we update 


        for (let i = 0; i < this.items.length; i++) {//to loop though all tha items and then the productid matches the
            //productId we got in the arguement
            //and then update to quantity and total price
            const item = this.items[i];
            if (item.product.id === productId && newQuantity > 0) {
                // if(newQuantity>0){//if quantity is a positive no than we want to update it or else we want to remove it



                // }
                const cartItem = { ...item }; //creating copy of the item we found there

                const quantityChange = newQuantity - item.quantity;
                console.log(quantityChange);
                cartItem.quantity = newQuantity;
                cartItem.totalPrice = newQuantity * item.product.price;
                this.items[i] = cartItem;
                this.totalQuantity = this.totalQuantity + quantityChange;
                console.log(this.totalQuantity);
                this.totalPrice += quantityChange * item.product.price;
                console.log(this.totalPrice);


                return {updateItemPrice:cartItem.totalPrice };
                //because we dont want to execute further code
            } else if (item.product.id === productId && newQuantity <= 0) {
                //remove that cart item entirely
                this.items.splice(i, 1);//splice allows us to remove items from array
                this.totalQuantity = this.totalQuantity-item.quantity;
                this.totalPrice -=item.totalPrice;
                return {updateItemPrice:0 };//because we dont want to execute further code


            }
        }


    }
}
module.exports = Cart;