/*
 *
 * AllNotice reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_NOTICE_FILE_CONTENT, SET_NOTICE_FILE_CONTENT } from './constants';

export const initialState = fromJS({});

function allNoticeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_NOTICE_FILE_CONTENT:
      return state.set("singleRowData", action.singleRowData);

    case SET_NOTICE_FILE_CONTENT:
      return state.set("singleFileContent", action.singleFileContent);

    default:
      return state;
  }
}

export default allNoticeReducer;
