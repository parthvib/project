//to manage the items that are already in the cart


//this is included in cart ejs file
const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');
const cartTotalPriceElement = document.getElementById('cart-total-price');

const cartBadge = document.querySelector('.nav-items .badge');




async function updateCartItem(event){
    //since we are using patch request we need get rid of the default methods which are get and post
event.preventDefault();

const form = event.target;

const productId = form.dataset.productid;
const csrftoken = form.dataset.csrf;
const quantity = form.firstElementChild.value;

let response;
try{

    
     response = await fetch('/cart/items',{
        method:'PATCH',
        body:JSON.stringify({
            productId:productId,
            quantity:quantity,
            _csrf:csrftoken
        }),
        headers:{
         'content-type': 'application/json'   
    
        }
    });
}catch(error)
{
    alert('something went wrong');
    return;
}
if(!response.ok){
    alert('something went wrong');
    return;
}
const responseData = await response.json();

console.log(responseData);
if(responseData.updatedCartData.updatedItemPrice==0){
    form.parentElement.parentElement.remove();

}else{
    const cartItemTotalPriceElement=form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPriceElement.textContent=responseData.updatedCartData.updatedItemPrice.tofixed(2);
     
}



cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.tofixed(2);

//to update the badge in navigation area
cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;




}

for(const formElements of cartItemUpdateFormElements ){
    formElements.addEventListener('submit',updateCartItem);

}