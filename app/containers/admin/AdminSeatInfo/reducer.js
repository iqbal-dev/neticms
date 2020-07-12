/*
 *
 * AdminSeatInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  
  GET_GROUP_LIST, 
  GET_CLASS_LIST,
  GET_SEAT_INFO_LIST,
  SET_CLASS_VALUE,
  SET_GROUP_VALUE,
  SET_SERIAL_VALUE,
  SET_SEAT_VALUE,
  SUBMIT_FORM_DATA,
  SET_DIALOG_TYPE,
  SET_SHOW_DIALOG,
  SET_HIDE_DIALOG,
  SET_UPDATE_ROW_DATA, 
} from './constants';

export const initialState = fromJS({
  serialValue: '',
  seatValue: '',
  seatInfoList: []
});

function adminSeatInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_CLASS_LIST:
      return state.set('classList', action.classList);

    case GET_GROUP_LIST:
      return state.set('groupList', action.groupList);

    case GET_SEAT_INFO_LIST:
        return state.set('seatInfoList', action.seatInfoList);

    
    case SET_SERIAL_VALUE:
      return state.set('serialValue', action.serialValue);

    case SET_CLASS_VALUE:
      return state.set('classValue', action.classValue);

    case SET_GROUP_VALUE:
      return state.set('groupValue', action.groupValue);

    case SET_SEAT_VALUE:
      return state.set('seatValue', action.seatValue);

    case SUBMIT_FORM_DATA:
      return state.set('submitFormData', action.submitFormData);


    case SET_DIALOG_TYPE:
      return state.set('dialogType', action.dialogType);

    case SET_SHOW_DIALOG:
      return state.set('dialogVisible', action.dialogVisible);

    case SET_UPDATE_ROW_DATA:
      return state.set('rowData', action.rowData);

    default:
      return state;
  }
}

export default adminSeatInfoReducer;
