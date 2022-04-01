import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_IDCARD_DATA } from '../actions'

const initialState = {
  filename: null,
  filepath: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IDCARD_DATA:
      return Object.assign({}, state, {
        filename: action.payload.filename,
        filepath: action.payload.filepath,
      })

    default:
      return state
  }
}

export default authReducer
