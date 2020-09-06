/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION, SET_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE,
  SET_LOADER, SET_LATEST_NEWS, SET_HISTORY_DETAILS, SET_TOP_EVENT, SET_ACCESS_TOKEN,
  SET_ACADEMIC_YEAR_LIST, SET_SECTION_LIST, SET_USEFULL_LINKS, SET_HOME_SLIDER,
  VISIBLE_INST_MAPPING_DIALOG, HIDE_INST_MAPPING_DIALOG, SET_MAPPING_INSTITUTE, SUBMIT_MAP,
  SET_HOME_SLIDER_LOADER, SET_NOTICE_LOADER, SET_SPEECH_LOADER, SET_LINK_LOADER,
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

export function setEmAccessToken(accessToken) {
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

export function setNotice(noticeList) {
  return {
    type: SET_NOTICE,
    noticeList,
  };
}

export function setWelcomeSpeech(welcomeSpeech) {
  return {
    type: SET_WELCOME_SPEECH,
    welcomeSpeech,
  };
}

export function setUseFullLinks(useFullLinks) {
  return {
    type: SET_USEFULL_LINKS,
    useFullLinks,
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

export function visibleInstMappingDialog() {
  return {
    type: VISIBLE_INST_MAPPING_DIALOG,
  };
}

export function hideInstMappingDialog() {
  return {
    type: HIDE_INST_MAPPING_DIALOG,
  };
}

export function setMappingInstitute(mappingInstId) {
  return {
    type: SET_MAPPING_INSTITUTE,
    mappingInstId,
  };
}

export function submitToMapInstitute() {
  return {
    type: SUBMIT_MAP,
  };
}

export function setLoader(loadingSection, status) {
  let loadingStatus={
    // homeSlider: true,
    // noticeList: true,
    // welcomeSpeech: false,
    // usefullLink: false,
    // eventList: false,
  }
  // loadingStatus[loadingSection] = status
  let load = {}
  load[loadingSection] = status

  Object.assign(loadingStatus, {...load} )
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

export function setHomeSlider(homeSliderList) {
  return {
    type: SET_HOME_SLIDER,
    homeSliderList,
  };
}


export function setHomeSliderLoader(homeSliderLoader) {
  return {
    type: SET_HOME_SLIDER_LOADER,
    homeSliderLoader,
  };
}

export function setNoticeLoader(noticeLoader) {
  return {
    type: SET_NOTICE_LOADER,
    noticeLoader,
  };
}

export function setSpeechLoader(speechLoader) {
  return {
    type: SET_SPEECH_LOADER,
    speechLoader,
  };
}

export function setLinkLoader(linkLoader) {
  return {
    type: SET_LINK_LOADER,
    linkLoader,
  };
}