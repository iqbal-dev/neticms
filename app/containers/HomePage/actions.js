/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, SET_URL_INFO, SET_URL_ID, SET_MENU, SET_WELCOME_SPEECH, SET_NOTICE, SET_LOADER } from './constants';

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
  console.log('HP-action', urlId);
  
  return {
    type: SET_URL_ID,
    urlId,
  };
}

export function setLoader(loadingStatus) {
  return {
    type: SET_LOADER,
    loadingStatus,
  };
}
