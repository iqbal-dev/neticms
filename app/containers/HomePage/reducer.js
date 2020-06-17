/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE, SET_LOADER } from './constants';

export const initialState = fromJS({
  urlInfo: '',
  menuList: '',
  welcomeSpeech: '',
  noticeList: '',
  loadingStatus: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state;

    case SET_URL_INFO:
      return state.set('urlInfo', action.urlInfo);

    case SET_URL_ID:
      return state.set('urlId', action.urlId);

    case SET_LOADER:
      return state.set('loadingStatus', action.loadingStatus);

    default:
      return state;
  }
}

export default homePageReducer;
