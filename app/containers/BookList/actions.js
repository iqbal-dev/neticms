/*
 *
 * BookList actions
 *
 */

import {
  DEFAULT_ACTION, SET_MODAL_STATUS, FETCH_CLASS_LIST, FETCH_BOOK_LIST_BY_CLASS_ID,
  FETCH_BOOK_LIST, SET_LOADER
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setModalVisibleStatus() {
  return {
    type: SET_MODAL_STATUS,
  };
}

export function fetchClassList(allClassList) {
  return {
    type: FETCH_CLASS_LIST,
    allClassList
  };
}

export function fetchBookListByClassId(classId) {
  return {
    type: FETCH_BOOK_LIST_BY_CLASS_ID,
    classId
  };
}

export function fetchBookList(allBookList) {
  return {
    type: FETCH_BOOK_LIST,
    allBookList
  };
}

export function setLoader(loaderType) {
  return { type: SET_LOADER, loaderType, };
}
