import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_IDCARD_DATA, SET_SIMPLE_EDIT_PW } from "../actions";

const initialState = {
    filename: null,
    filepath: "",
    editpw: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IDCARD_DATA:
            return Object.assign({}, state, {
                filename: action.payload.filename,
                filepath: action.payload.filepath,
            });

        case SET_SIMPLE_EDIT_PW:
            return Object.assign({}, state, {
                editpw: action.payload.editpw,
            });

        default:
            return state;
    }
};

export default authReducer;
