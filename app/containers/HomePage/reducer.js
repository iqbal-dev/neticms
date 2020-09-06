/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE,
  SET_LOADER, SET_LATEST_NEWS, SET_HISTORY_DETAILS, SET_TOP_EVENT, SET_ACCESS_TOKEN,
  SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST, SET_USEFULL_LINKS, SET_HOME_SLIDER,
  VISIBLE_INST_MAPPING_DIALOG, HIDE_INST_MAPPING_DIALOG, SET_MAPPING_INSTITUTE, SET_HOME_SLIDER_LOADER, SET_NOTICE_LOADER, SET_SPEECH_LOADER, SET_LINK_LOADER,
} from './constants';

export const initialState = fromJS({
  accessToken: '',
  urlInfo: '',
  urlId: '',
  newsList: '',
  historyDetails: '',
  topEvents: '',
  menuList: '',
  noticeList: '',
  welcomeSpeech: '',
  useFullLinks: '',
  loadingStatus: '',
  
  // {
  //   // homeSlider: true,
  //   // noticeList: true,
  //   // welcomeSpeech: false,
  //   // usefullLink: false,
  //   // eventList: false,
  // },

  academicYearList: '',
  sectionList: '',
  instMappingDialog: false,
  mappingInstId: '',
  homeSliderLoader: true,
  noticeLoader: true,
  speechLoader: true,
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

    case SET_NOTICE:
      return state.set('noticeList', action.noticeList);

    case SET_WELCOME_SPEECH:
      return state.set('welcomeSpeech', action.welcomeSpeech);

    case SET_USEFULL_LINKS:
      return state.set('useFullLinks', action.useFullLinks);

    case SET_HISTORY_DETAILS:
      return state.set('historyDetails', action.historyDetails);

    case SET_TOP_EVENT:
      return state.set('topEvents', action.topEvents);

    case VISIBLE_INST_MAPPING_DIALOG:
      return state.set('instMappingDialog', true);

    case HIDE_INST_MAPPING_DIALOG:
      return state.set('instMappingDialog', false);

    case SET_MAPPING_INSTITUTE:
      return state.set('mappingInstId', action.mappingInstId);

    case SET_LOADER:
      return state.set('loadingStatus', action.loadingStatus);

    case SET_ACADEMIC_YEAR_LIST:
      return state.set('academicYearList', action.yearList);

    case SET_SECTION_LIST:
      return state.set('sectionList', action.sectionList);

    case SET_HOME_SLIDER:
      return state.set('homeSliderList', action.homeSliderList);

    case SET_HOME_SLIDER_LOADER:
      return state.set('homeSliderLoader', action.homeSliderLoader);

    case SET_NOTICE_LOADER:
      return state.set('noticeLoader', action.noticeLoader);

    case SET_SPEECH_LOADER:
      return state.set('speechLoader', action.speechLoader);

    case SET_LINK_LOADER:
      return state.set('linkLoader', action.linkLoader);

    default:
      return state;
  }
}

export default homePageReducer;
