import { validPassword } from "./regexSignup";


export const checkPassword = (password, password2) => {
  
    if ((!new RegExp(validPassword).test(password)) || (!new RegExp(validPassword).test(password2))){
       ;console.log("error_password")
        return false
    }

    if (password !== password2 ){
         console.log('error_confirm');
         return false
     }
      return true
     }
     
    
  