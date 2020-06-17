/*
 *
 * BookList actions
 *
 */

import { DEFAULT_ACTION, SET_MODAL_STATUS, SET_BOOK_LIST, SUBMIT_CLASS_BUTTON } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setBookList(bookList) {
  return {
    type: SET_BOOK_LIST,
    bookList,
  };
}

export function setModalVisibleStatus() {
  return {
    type: SET_MODAL_STATUS,
  };
}


export function setSubmitClassBtn() {
  return {
    type: SUBMIT_CLASS_BUTTON,
  };
}

