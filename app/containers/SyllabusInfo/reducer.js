/*
 *
 * SyllabusInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, FETCH_SYLLABUS_LIST, SET_ROW_DATA, SET_FETCH_FILE, SET_LOADER } from './constants';

export const initialState = fromJS({
  syllabusList: "",
  rowdata: '',
  file: '',
});

function syllabusInfoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case FETCH_SYLLABUS_LIST:
      return state.set("syllabusList", action.syllabusList);

    case SET_ROW_DATA:
      return state.set("rowdata", action.rowdata);

    case SET_FETCH_FILE:
      return state.set("file", action.file);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default syllabusInfoReducer;
