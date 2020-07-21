/*
 *
 * SyllabusInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, FETCH_SYLLABUS_LIST } from './constants';

export const initialState = fromJS({
  syllabusList:"",
});

function syllabusInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_SYLLABUS_LIST:
      console.log('action.syllabusList', action.syllabusList);
      return state.set("syllabusList", action.syllabusList);
    default:
      return state;
  }
}

export default syllabusInfoReducer;
