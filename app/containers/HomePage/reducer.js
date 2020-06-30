/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE,
  SET_LOADER, SET_LATEST_NEWS, SET_HISTORY_DETAILS, SET_TOP_EVENT, SET_ACCESS_TOKEN,
  SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST,
} from './constants';

export const initialState = fromJS({
  accessToken: '',
  urlInfo: '',
  urlId: '',
  newsList: '',
  historyDetails: '',
  topEvents: '',
  menuList: '',
  welcomeSpeech: '',
  noticeList: '',
  loadingStatus: false,

  academicYearList: '',
  sectionList: '',
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state;

    case SET_URL_INFO:
      return state.set('urlInfo', action.urlInfo);

    case SET_URL_ID:
      return state.set('urlId', action.urlId);

    case SET_ACCESS_TOKEN:
      return state.set('accessToken', action.accessToken);

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

    case SET_ACADEMIC_YEAR_LIST:
      return state.set('academicYearList', action.yearList);

    case SET_SECTION_LIST:
      return state.set('sectionList', action.sectionList);

    default:
      return state;
  }
}

export default homePageReducer;
