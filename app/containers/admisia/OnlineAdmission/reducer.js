/*
 *
 * OnlineAdmission reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  SET_CLASS_CONFIG_LIST, 
  SET_DATA_TABLE_LOADER 
} from './constants';

export const initialState = fromJS({
  classConfigObj: {
    currentAcademicYear: '',
    classConfigList: []
  },
  dataTableLoader: false
});

function onlineAdmissionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_CLASS_CONFIG_LIST:
      return state.set('classConfigObj', action.classConfigObj);

    case SET_DATA_TABLE_LOADER:
      return state.set('dataTableLoader', action.dataTableLoader);

    default:
      return state;
  }
}

export default onlineAdmissionReducer;
