/*
 *
 * TeacherInformation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TEACHER_INFORMATON_LIST, SET_LOADER } from './constants';

export const initialState = fromJS({
  teacherList: []
});

function teacherInformationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case TEACHER_INFORMATON_LIST:
      return state.set('teacherList', action.teacherList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default teacherInformationReducer;
