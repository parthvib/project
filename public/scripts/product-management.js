//this file is used so that we can use delete button 
//we have to listen to all delete buttons and  see that which product was clicked and 

// const res = require("express/lib/response");

// send correct request 
const deleteProductButtonElements=document.querySelectorAll('.product-item button');

async function deleteProduct(event){ //we need a way to find out for which product the element was clicked
   const button= event.target;
   const productId=button.dataset.productid;//to get access to arbitary value(data-product productid is a property)
//    we have to dend this object to backend we can use third party packages
   const csrftoken = button.dataset.csrf;

   const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrftoken, {
       method:'DELETE'

   });//we need to include csrf token because other wise it will be blocked, it will send the get request
   //this will send a valid request

   //we want to remove the item from the screen without reloading the page
   if(!response.ok)
   {
       alert('something went wrong!');
       return;
   }
button.parentElement.parentElement.parentElement.parentElement.remove();
//it basically removes article from products page
//last is to access list items 
//remove will remove the element from the dom


}

for(const deleteProductButtonElement of deleteProductButtonElements){
    deleteProductButtonElement.addEventListener('click',deleteProduct);

}

