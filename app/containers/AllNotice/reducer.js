/*
 *
 * AllNotice reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_NOTICE_FILE_CONTENT, SET_NOTICE_FILE_CONTENT, GET_DOWNLOAD_ITEM, SET_LOADER } from './constants';

export const initialState = fromJS({});

function allNoticeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case GET_NOTICE_FILE_CONTENT:
      return state.set("singleRowData", action.singleRowData);

    case SET_NOTICE_FILE_CONTENT:
      return state.set("singleFileContent", action.singleFileContent);

    case GET_DOWNLOAD_ITEM:
      return state.set('downloadFile', action.downloadFile);

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default allNoticeReducer;
