export const SET_IDCARD_DATA = "SET_IDCARD_DATA";
export const SET_SIMPLE_EDIT_PW = "SET_SIMPLE_EDIT_PW";
export const SET_MESSAGE_MODAL = "SET_MESSAGE_MODAL";

export const setIdcardData = (idcardData) => {
    return {
        type: SET_IDCARD_DATA,
        payload: idcardData,
    };
};

export const setEditPassword = (editPassword) => {
    return {
        type: SET_SIMPLE_EDIT_PW,
        payload: editPassword,
    };
};

export const setMessageModal = (boolean, content) => {
    return {
        type: SET_MESSAGE_MODAL,
        payload: {
            isModalOpen: boolean,
            content,
        },
    };
};
