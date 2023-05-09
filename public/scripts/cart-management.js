//to get acces to that button
//and trigger a method whenever that item is added 
const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadges = document.querySelector('.nav-items .badge');
async function addToCart() {
    const productId = addToCartButtonElement.dataset.productid;
    const csrftoken = addToCartButtonElement.dataset.csrf;
    let response;
    try {


        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrftoken
            }),
            headers: {
                'content-type': 'application/json' //to extract json data from such objects we have to
                //add another middleware 

            } //headers are metadata that are sent along with requests  
        });
    }
    catch (error) {
        alert('something went wrong');

    }

    if (!response.ok) {
        alert('something went wrong ');
        return;
    }
    const responseData = await response.json();//it deformat the response data into regular javascript 

    const totalQuantity = responseData.newTotalItems;

    // for(const cartBadge of cartBadges ){
    cartBadges.textContent = totalQuantity;
    // }




}
addToCartButtonElement.addEventListener('click', addToCart);