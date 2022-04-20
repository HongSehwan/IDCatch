import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";

export const rootReducer = combineReducers({
    authReducer,
    modalReducer,
});
