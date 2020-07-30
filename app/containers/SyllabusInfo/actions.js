/*
 *
 * SyllabusInfo actions
 *
 */

import { DEFAULT_ACTION, FETCH_SYLLABUS_LIST, SET_ROW_DATA, SUBMIT_FETCH_FILE, SET_FETCH_FILE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchSyllabusList(syllabusList) {
  return {
    type: FETCH_SYLLABUS_LIST,
    syllabusList
  };
}

export function setRowData(rowdata) {
  return {
    type: SET_ROW_DATA,
    rowdata
  };
}

export function submitForFetchFile() {
  return {
    type: SUBMIT_FETCH_FILE,
  };
}

export function setSyllabusFile(file) {
  return {
    type: SET_FETCH_FILE,
    file
  };
}
