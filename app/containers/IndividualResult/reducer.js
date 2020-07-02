/*
 *
 * IndividualResult reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  SET_ON_CHANGE_STUDENT_ID, 
  SET_ON_CHANGE_STUDENT_MOBILE, 
  SET_ACADEMIC_YEAR_LIST,
  SET_ON_CHANGE_ACADEMIC_YEAR,
  SET_ON_CHANGE_EXAM_TYPE,
  SET_EXAM_LIST,
  SET_INDIVIDUAL_RESULT_DATA
} from './constants';

export const initialState = fromJS({});

function individualResultReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ON_CHANGE_STUDENT_ID:
      return state.set('stdID', action.stdID);

    case SET_ON_CHANGE_STUDENT_MOBILE:
      return state.set('stdMobile', action.stdMobile);

    case SET_ON_CHANGE_ACADEMIC_YEAR:
      return state.set('acYear', action.acYear);

    case SET_ACADEMIC_YEAR_LIST:
        return state.set('yearList', action.yearList);

    case SET_EXAM_LIST:
      return state.set('examList', action.examList);

    case SET_ON_CHANGE_EXAM_TYPE:
      return state.set('examConfigId', action.examConfigId);

    case SET_INDIVIDUAL_RESULT_DATA:
      return state.set('resultData', action.resultData);
      
    default:
      return state;
  }
}

export default individualResultReducer;
