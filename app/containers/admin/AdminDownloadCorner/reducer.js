/*
 *
 * AdminDownloadCorner reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  GET_DOWNLOAD_CORNER_LIST, 

  SET_SHOW_DIALOG,
  SET_UPDATE_ROW_DATA,
  SET_DIALOG_TYPE,
  SUBMIT_FORM_DATA,

  SET_SERIAL_VALUE,
  SET_TITLE_VALUE
} from './constants';

export const initialState = fromJS({});

function adminDownloadCornerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    // case GET_DOWNLOAD_CORNER_LIST:
    //   return state.set('downloadCornerList', action.downloadCornerList);


    case SET_DIALOG_TYPE:
      return state.set('dialogType', action.dialogType);

    case SET_SHOW_DIALOG:
      return state.set('dialogVisible', action.dialogVisible);

    case SET_UPDATE_ROW_DATA:
      return state.set('rowData', action.rowData);

    case SET_SERIAL_VALUE:
      return state.set('serialValue', action.serialValue);

    case SET_TITLE_VALUE:
      return state.set('titleValue', action.titleValue);

    case SUBMIT_FORM_DATA:
      return state.set('submitFormData', action.submitFormData);

      
    default:
      return state;
  }
}

export default adminDownloadCornerReducer;
