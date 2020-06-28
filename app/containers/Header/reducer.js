/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_INSTITUTE_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE, SET_LOADER,
  SET_ERROR_MESSAGE, SET_HISTORY_DETAILS, SET_TOP_EVENT, SET_LATEST_NEWS, SET_ACCESS_TOKEN, SET_SECTION_LIST,
  SET_CLASS_LIST_BY_TYPE_ID,
  SET_APP_HEADER_DATA
} from './constants';

export const initialState = fromJS({
  headerData: '',
  accessToken: '',
  urlInfo: '',
  urlId: '',
  newsList: '',
  historyDetails: '',
  topEvents: '',
  loadingStatus: false,
  errorMsg: '',
  classList: '',
});

function headerReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state;

      case SET_APP_HEADER_DATA:
      return state.set('headerData', action.headerData);

    case SET_ACCESS_TOKEN:
      return state.set('accessToken', action.accessToken);

      case SET_INSTITUTE_URL_INFO:
      return state.set('urlInfo', action.urlInfo);

    // case SET_URL_ID:
    // return state.set('urlId', action.urlId);

    case SET_MENU:
      return state.set('menuList', action.menuList);

      case SET_LATEST_NEWS:
        return state.set('newsList', action.newsList);

    case SET_WELCOME_SPEECH:
      return state.set('welcomeSpeech', action.welcomeSpeech);

    case SET_NOTICE:
      return state.set('noticeList', action.noticeList);

    case SET_HISTORY_DETAILS:
      return state.set('historyDetails', action.historyDetails);

      case SET_TOP_EVENT:
      return state.set('topEvents', action.topEvents);

    case SET_LOADER:
      return state.set('loadingStatus', action.loadingStatus);

    case SET_ERROR_MESSAGE:
      return state.set('errorMsg', action.errorMsg);
    
    case SET_CLASS_LIST_BY_TYPE_ID:
      return state.set('classList', action.classList);

    case SET_SECTION_LIST:
      return state.set('sectionList', action.sectionList);

    default:
      return state;
  }
}

export default headerReducer;
