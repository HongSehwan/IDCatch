import { SET_MESSAGE_MODAL } from "../actions";

const initialState = {
    messageModal: {
        isModalOpen: false,
        content: "",
    },
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE_MODAL:
            return Object.assign({}, state, {
                messageModal: {
                    ...action.payload,
                },
            });

        default:
            return state;
    }
};

export default modalReducer;
