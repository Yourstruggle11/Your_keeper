import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {userRegistrationReducer, userLoginReducer} from "./reducers/userReducer"
import noteReducer from "./reducers/noteReducer"

const rootReducer = combineReducers({
    userRegistration : userRegistrationReducer,
    userLogin : userLoginReducer,
    userNote: noteReducer
})

//getting user data from local storage
const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
    userLogin:{
        userInfo: userInfoFromLocalStorage
    },
}

//
const middleware = [thunk];

//creating store
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);





export default store;
