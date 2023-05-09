function isempty(value){
    return !value || value.trim()==='';

}

function userCredentialsAreValid(email,password,)
{
    return email && email.includes('@')&&
    password &&
    password.trim().length>=6
}





function userDetailsArevalid(email, password, name, street, postal, city) {
    return (
        userCredentialsAreValid(email,password)&&
         !isempty(name) && 
         !isempty(street)&& 
         !isempty(postal) &&
         !isempty(city)

          
          );



}
function emailIsconfirmed(email,confirmEmail){
    return email ===confirmEmail;

}


module.exports={userDetailsArevalid:userDetailsArevalid,emailIsconfirmed:emailIsconfirmed};
