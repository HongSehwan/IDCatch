export const SET_IDCARD_DATA = "SET_IDCARD_DATA";
export const SET_SIMPLE_EDIT_PW = "SET_SIMPLE_EDIT_PW";

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
