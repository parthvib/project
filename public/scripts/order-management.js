const updateOrderFormElements = document.querySelectorAll(
    '.order-actions form'
);

async function updateOrder(event){
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);
    const newStatus = formData.get('status');
    const orderId = formData.get('orderid');
    const csrftoken = formData.get('_csrf');

    let response;
    try{
        response= await fetch(`/admin/orders/${orderId}`,{
            method:'PATCH',
            body:JSON.stringify({
                newStatus:newStatus,
                _csrf:csrftoken,

            }),
            headers:{
                'content-Type':'application/json',

            },

        });

    }catch(error){
        alert('something went wrong -could not update');
        return;
        
    }
    if (!response.ok) {
        alert ( 'Something went wrong - could not update order status.');
        return;
    }
    const responseData = await response.json ();
    
    form.parentElement. parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}
    for (const updateOrderFormElement of updateOrderFormElements) {
    updateOrderFormElement.addEventListener('submit',updateOrder);


}
