export const SET_IDCARD_DATA = 'SET_IDCARD_DATA'

export const setIdcardData = (idcardData) => {
  return {
    type: SET_IDCARD_DATA,
    payload: idcardData,
  }
}
