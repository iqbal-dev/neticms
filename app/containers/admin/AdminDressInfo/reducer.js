/*
 *
 * AdminDressInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_DRESS_INFO_LIST, GET_GENDER_INFO_LIST, SET_SAVE_ONCHANGE_CLASS_RANGE, SET_SAVE_ONCHANGE_DETAILS, SET_SAVE_ONCHANGE_IMAGE, SET_SAVE_ONCHANGE_GENDER_LIST_VALUE, RESET_FORM_DATA, GET_DATATABLE_ROWDATA, SAVE_DRESS_INFO, UPDATE_DRESS_INFO, SET_MODAL_STATUS, SET_SAVE_ONCHANGE_SERIAL_NO } from './constants';


export const initialState = fromJS({
  dressInfoList: [],
  genderInfoList: [],
  selectedGender: '',
  serialNo: '',
  classRange: '',
  dressCodeDetails: '',
  rowData: '',
  dressCodeImage: '',
  modalVisible: false,


});

function adminDressInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_DRESS_INFO_LIST:
      return state.set('dressInfoList', action.dressInfoList);
    case GET_GENDER_INFO_LIST:
        return state.set('genderInfoList', action.genderInfoList);
        case SET_SAVE_ONCHANGE_SERIAL_NO:
          return state.set('serialNo', action.serialNo);
    case SET_SAVE_ONCHANGE_GENDER_LIST_VALUE:
          return state.set('selectedGender', action.selectedGender);
    case SET_SAVE_ONCHANGE_CLASS_RANGE:
          return state.set('classRange', action.classRange);
    case SET_SAVE_ONCHANGE_DETAILS:
        return state.set('dressCodeDetails', action.dressCodeDetails);
        case SET_SAVE_ONCHANGE_IMAGE:
          return state.set('dressCodeImage', action.dressCodeImage);
          case GET_DATATABLE_ROWDATA:
            return state.set('rowData', action.rowData);
            case SET_MODAL_STATUS:
              const status = state.get('modalVisible');
              return state.set('modalVisible', !status);
    default:
      return state;
  }
}

export default adminDressInfoReducer;
