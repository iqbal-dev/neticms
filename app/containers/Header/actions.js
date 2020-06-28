/*
 *
 * Header actions
 *
 */

import { DEFAULT_ACTION, SET_ACCESS_TOKEN, SET_INSTITUTE_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_SECTION_LIST,
  SET_NOTICE, SET_LOADER, SET_ERROR_MESSAGE, SET_HISTORY_DETAILS, SET_TOP_EVENT, SET_LATEST_NEWS, SET_CLASS_LIST_BY_TYPE_ID, SET_APP_HEADER_DATA
 } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAppHeaderData(headerData) {
  return {
    type: SET_APP_HEADER_DATA, headerData
  };
}

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken,
  };
}

export function setInstituteUrlInfo(urlInfo) {
  return {
    type: SET_INSTITUTE_URL_INFO,
    urlInfo,
  };
}

// export function setUrlId(urlId) {
//   return {
//     type: SET_URL_ID,
//     urlId,
//   };
// }

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

export function setErrorMessage(errorMsg) {
  return {
    type: SET_ERROR_MESSAGE,
    errorMsg,
  };
}

export function setSectionList(sectionList) {
  return {
    type: SET_SECTION_LIST,
    sectionList,
  };
}

export function setClassListByTypeId(classList) {
  return {
    type: SET_CLASS_LIST_BY_TYPE_ID,
    classList,
  };
}
