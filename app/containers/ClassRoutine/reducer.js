/*
 *
 * ClassRoutine reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  SET_SECTION_LIST, 
  SET_ON_CHANGE_SECTION,
  SET_CLASS_ROUTINE_LIST_DATA, SET_DATA_TABLE_LOADER, SET_CLASS_LOADER
} from './constants';

import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({
  sectionList: [],
  classConfigId: '',
  classRoutineListData: [],
  dataTableLoader: false,
  classLoader: false,
});

function classRoutineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_SECTION_LIST:
      return state.set('sectionList', action.sectionList);
      
    case SET_ON_CHANGE_SECTION:
      return state.set('classConfigId', action.classConfigId);

    case SET_CLASS_ROUTINE_LIST_DATA:
      return state.set('classRoutineListData', action.classRoutineListData);

    case SET_CLASS_ROUTINE_LIST_DATA:
      return state.set('classRoutineListData', action.classRoutineListData);

    case SET_DATA_TABLE_LOADER:
      return state.set('dataTableLoader', action.dataTableLoader);

    case SET_CLASS_LOADER:
      return state.set('classLoader', action.classLoader);
      
    default:
      return state;
  }
}

export default classRoutineReducer;

// 
