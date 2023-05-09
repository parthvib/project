


    const imagePicker=document.querySelector('#image-upload-control input');
    const imagepreview=document.querySelector('#image-upload-control img');

    function updateimagepreview(){
        const files=imagePicker.files;
        if(!files || files.length === 0){
            imagepreview.style.display='none';
            return;
        }
        const pickedFile = files[0];
       imagepreview.src= URL.createObjectURL(pickedFile);
       imagepreview.style.display='block';
        //this will generate a url that will work on the computer of the client


    }
    imagePicker.addEventListener('change',updateimagepreview);


