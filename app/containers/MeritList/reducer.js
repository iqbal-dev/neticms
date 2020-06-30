/*
 *
 * MeritList reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION,SET_MERIT_LIST_DATA, SET_ACADEMIC_YEAR, SET_EXAM_LIST,SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST,SET_ON_CHANGE_EXAM_TYPE, SET_ON_CHANGE_SECTION } from './constants';

export const initialState = fromJS({
  academicYear: '',
  examList: '',
  academicYearList: '',
  sectionList: '',
  meritListData: [],
  classConfigId: '',
  examConfigId: '',

});

function meritListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case SET_ACADEMIC_YEAR_LIST:
      return state.set('academicYearList', action.academicYearList);

      case SET_SECTION_LIST:
      return state.set('sectionList', action.sectionList);

      case SET_ACADEMIC_YEAR:
      return state.set('academicYear', action.academicYear);

      case SET_ON_CHANGE_SECTION:
        return state.set('classConfigId', action.classConfigId);
  
      case SET_ON_CHANGE_EXAM_TYPE:
        return state.set('examConfigId', action.examConfigId);

      case SET_EXAM_LIST:
      return state.set('examList', action.examList);

      case SET_MERIT_LIST_DATA:
        return state.set('meritListData', action.meritListData);



    default:
      return state;
  }
}

export default meritListReducer;
