//click listener
const mobilemenuBtnElement=document.getElementById('mobile-menu-btn');
//this above method id not available in node js

const mobilemenuElement=document.getElementById('mobile-menu');

function toggleMobileMenu(){

mobilemenuElement.classList.toggle('open');

//this classlist element allows to manage the css classes 
//it checks that whenever this open css class is clicked the class is either added or removed
}
mobilemenuBtnElement.addEventListener('click',toggleMobileMenu);


//() this are not included so that the function only executes on the click event 