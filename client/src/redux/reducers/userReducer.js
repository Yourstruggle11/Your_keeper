  //reducer for user registration
 
 export const userRegistrationReducer = (state = {
     loading: false,
     serverError: null,
     userInfo:null,
     emailCheck:false
 }, action) => {

    switch (action.type) {
        case "USER_REGISTRATION_REQUEST":
            return{
                loading: true,
                serverError: null,
                emailCheck:false
            }

        case "USER_REGISTRATION_SUCCESS":
            return{
                loading: false,
                serverError: null,
                userInfo: action.payload,
                emailCheck:true
                }
        case "USER_REGISTRATION_FAIELD":
            return{
                loading: false,
                serverError: action.payload,
                emailCheck:false
                }

        default:
            return state;
            
    }
 }

 const initialValue = {
    serverError: false,
    isAuthenticate: false
 }
 //reducer for user login
 export const userLoginReducer = (state = {initialValue}, action) => {

   switch (action.type) {
       case "USER_LOGIN_REQUEST":
           return{
               loading: true,
               isAuthenticate: false,
               serverError: false,
           }

       case "USER_LOGIN_SUCCESS":
           return{
               loading: false,
               serverError: false,
               userInfo: action.payload,
               isAuthenticate: true,
               }
       case "USER_LOGIN_FAIELD":
           return{
               loading: false,
               serverError: true,
               }
        case "USER_LOGOUT":
            return{
                isAuthenticate: false,
            }

       default:
           return state;
           
   }
}