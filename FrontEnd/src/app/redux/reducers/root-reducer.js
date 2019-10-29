import { combineReducers } from "redux";
import loginReducer from "./login-reducer";
import signUpReducer from './signup-reducer';
import profileReducer from './profile-reducer';
import utilReducer from './util-reducer';
import menuReducer from './menu-reducer';
import searchReducer from './search-reducer';
import orderReducer from './order-reducer';

const rootReducer = combineReducers({ 
    loginReducer , 
    signUpReducer, 
    profileReducer, 
    utilReducer, 
    menuReducer, 
    searchReducer,
    orderReducer
});

export default rootReducer;
