/*
 *
 * DownloadCorner reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, DOWNLOAD_ALL_LINKS } from './constants';

export const initialState = fromJS({
  downloadLinks: [],
});

function downloadCornerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case DOWNLOAD_ALL_LINKS:
      return state.set('downloadLinks', action.downloadLinks);
    default:
      return state;
  }
}

export default downloadCornerReducer;
