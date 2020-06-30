/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION, SET_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE,
  SET_LOADER, SET_LATEST_NEWS, SET_HISTORY_DETAILS, SET_TOP_EVENT, SET_ACCESS_TOKEN,
  SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setUrlInfo(urlInfo) {
  return {
    type: SET_URL_INFO,
    urlInfo,
  };
}

export function setUrlId(urlId) {
  return {
    type: SET_URL_ID,
    urlId,
  };
}

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  };
}

export function setMenu(menuList) {
  return {
    type: SET_MENU,
    menuList,
  };
}

export function setLatestNews(newsList) {
  return {
    type: SET_LATEST_NEWS,
    newsList,
  };
}

export function setWelcomeSpeech(welcomeSpeech) {
  return {
    type: SET_WELCOME_SPEECH,
    welcomeSpeech,
  };
}

export function setNotice(noticeList) {
  return {
    type: SET_NOTICE,
    noticeList,
  };
}

export function setHistoryDetails(historyDetails) {
  return {
    type: SET_HISTORY_DETAILS,
    historyDetails,
  };
}

export function setTopEvents(topEvents) {
  return {
    type: SET_TOP_EVENT,
    topEvents,
  };
}

export function setLoader(loadingStatus) {
  return {
    type: SET_LOADER,
    loadingStatus,
  };
}

// For global list

export function setGlobalAcademicYearList(yearList) {
  return {
    type: SET_ACADEMIC_YEAR_LIST,
    yearList,
  };
}

export function setGlobalSectionList(sectionList) {
  return {
    type: SET_SECTION_LIST,
    sectionList,
  };
}