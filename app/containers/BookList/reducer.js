/*
 *
 * BookList reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_MODAL_STATUS, SET_BOOK_LIST } from './constants';

export const initialState = fromJS({
  modalVisible: false,
  bookList: [],
});

function bookListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_MODAL_STATUS:
      const status = state.get('modalVisible');
      return state.set('modalVisible', !status);

    case SET_BOOK_LIST:
      return state.set('bookList', action.bookList);

      setBookList;

    default:
      return state;
  }
}

export default bookListReducer;
