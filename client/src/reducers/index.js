import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import productReducer from "./productReducer";


const rootReducer = combineReducers({
    user: userReducer,
    catalog: productReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))