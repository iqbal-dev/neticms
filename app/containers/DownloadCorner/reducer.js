/*
 *
 * DownloadCorner reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, DOWNLOAD_ALL_LINKS, SET_DOWNLOAD_ITEM, GET_DOWNLOAD_ITEM, SET_LOADER } from './constants';

export const initialState = fromJS({
  downloadLinks: [],
  downloadFile: '',
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
    case SET_LOADER:
      return state.set('loaderType', action.loaderType);
    default:
      return state;
  }
}

export default downloadCornerReducer;
