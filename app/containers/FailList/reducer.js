/*
 *
 * FailList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_ACADEMIC_YEAR_LIST,
  SET_SECTION_LIST,
  SET_EXAM_LIST,
  SET_ON_CHANGE_ACADEMIC_YEAR,
  SET_ON_CHANGE_SECTION,
  SET_ON_CHANGE_EXAM_TYPE,
  SET_FAIL_LIST_DATA
} from './constants';

export const initialState = fromJS({
  failListData: [],
  yearList: '',
  sectionList: '',
  examList: '',

  acYear: '',
  classConfigId: '',
  examConfigId: '',
});

function failListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ACADEMIC_YEAR_LIST:
      return state.set('yearList', action.yearList);

    case SET_SECTION_LIST:
      return state.set('sectionList', action.sectionList);
    case SET_EXAM_LIST:
      return state.set('examList', action.examList);

    case SET_ON_CHANGE_ACADEMIC_YEAR:
      return state.set('acYear', action.acYear);

    case SET_ON_CHANGE_SECTION:
      return state.set('classConfigId', action.classConfigId);

    case SET_ON_CHANGE_EXAM_TYPE:
      return state.set('examConfigId', action.examConfigId);

    case SET_FAIL_LIST_DATA:
      return state.set('failListData', action.failListData);

    default:
      return state;
  }
}

export default failListReducer;
