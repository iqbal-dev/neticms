/*
 *
 * StudentInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, CLASS_NAME_DROPDOWN_LIST, CLASS_NAME_SELECTED, CLASS_GROUP_NAME_DROPDOWN_LIST,
  SUBMIT_SEARCH_BUTTON, STUDENT_SEARCH_RESULT, CLASS_GROUP_NAME_SELECTED, SET_LOADER
} from './constants';

export const initialState = fromJS({
  classNamesDropdown: [],
  groupList: "",
  classNameSelected: "",
  groupNameSelected: "",
  searchButtonResult: "",
  studentInfoResult: "",
  loaderType: '',
});

function studentInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CLASS_NAME_DROPDOWN_LIST:
      return state.set('classNamesDropdown', action.classNamesDropdown);
    case CLASS_NAME_SELECTED:
      return state.set('classNameSelected', action.classNameSelected);

    case CLASS_GROUP_NAME_SELECTED:
      return state.set('groupNameSelected', action.groupNameSelected);

    case CLASS_GROUP_NAME_DROPDOWN_LIST:
      return state.set('groupList', action.groupList);

    case STUDENT_SEARCH_RESULT:
      return state.set('studentInfoResult', action.studentInfoResult);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default studentInfoReducer;
