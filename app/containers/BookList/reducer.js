/*
 *
 * BookList reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_MODAL_STATUS, FETCH_CLASS_LIST, FETCH_BOOK_LIST_BY_CLASS_ID, FETCH_BOOK_LIST, SET_LOADER } from './constants';

export const initialState = fromJS({
  modalVisible: false,
  bookList: [],
  allClassList: [],
  classId: '',
  allBookList: [],
  loaderType: '',
});

function bookListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_MODAL_STATUS:
      const status = state.get('modalVisible');
      return state.set('modalVisible', !status);

    case FETCH_CLASS_LIST:
      return state.set('allClassList', action.allClassList);

    case FETCH_BOOK_LIST_BY_CLASS_ID:
      return state.set('classId', action.classId);

    case FETCH_BOOK_LIST:
      return state.set('allBookList', action.allBookList);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default bookListReducer;
