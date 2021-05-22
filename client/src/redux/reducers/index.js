import {combineReducers} from "redux" ;
import posts from "./posts" 
import auth from "./auth" ; 
import selecteduser from "./selected" ; 
export default combineReducers({
    posts  , auth  , selecteduser
})