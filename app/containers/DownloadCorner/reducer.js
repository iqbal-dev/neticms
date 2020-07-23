/*
 *
 * DownloadCorner reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, DOWNLOAD_ALL_LINKS, SET_DOWNLOAD_ITEM, GET_DOWNLOAD_ITEM } from './constants';

export const initialState = fromJS({
  downloadLinks: [],
});

function downloadCornerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case DOWNLOAD_ALL_LINKS:
      return state.set('downloadLinks', action.downloadLinks);
    case SET_DOWNLOAD_ITEM:
      return state.set('downloadItem', action.downloadItem);
    case GET_DOWNLOAD_ITEM:
      return state.set('downloadFile', action.downloadFile);
    default:
      return state;
  }
}

export default downloadCornerReducer;
