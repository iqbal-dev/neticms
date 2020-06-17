import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_urlMappingInfoBy_urlName, fetch_welcomeSpeechBy_urlId, fetch_menu_urlName, fetch_noticeBy_urlId, fetch_instituteHistoryBy_urlId, fetch_instituteTopEventBy_urlId } from '../../utils/serviceUrl';
import { getMethod } from '../../utils/baseMethod';

import { setInstituteUrlInfo, setWelcomeSpeech, setMenu, setNotice, setHistoryDetails, setTopEvents } from './actions';
import { setUrlInfoLocally } from '../../utils/localStorageMethod';
import { setUrlId } from '../HomePage/actions';

// Individual exports for testing
let urlInfoId = '';

export function* fetch_InstituteUrlInfo_byUrlName() {

  let instituteHostNm = window.location.pathname.slice(1);
  console.log('instituteHostNm', instituteHostNm);

  const requestURL = BASE_URL.concat(fetch_urlMappingInfoBy_urlName).concat('?urlName=').concat(instituteHostNm);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': tokenData.token_type + " " + tokenData.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('inst-url-info-response', response);
  try {

    if (response) { 
      urlInfoId = response.urlInfoDTO.urlInfoID;
      yield put(setInstituteUrlInfo(response));
      setUrlInfoLocally(JSON.stringify(response));
      yield put(setUrlId(response)); 

      yield fetch_Menu_byUrlId();
      yield fetch_InstituteTopNotices_byUrlId();
      yield fetch_WelcomeSpeech_byUrlId();
      yield fetch_instituteHistory_byUrlId();
      yield fetch_instituteTopEvent_byUrlId();
    }

  } catch (error) { }

}

export function* fetch_Menu_byUrlId() {

  const requestURL = BASE_URL.concat(fetch_menu_urlName).concat('?urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('menu response', response);
  try {
    yield put(setMenu(response));
  } catch (error) { }

}

export function* fetch_LatestNews() {

  const requestURL =BASE_URL.concat(fetch_latestNews);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('menu response', response);
  try {
    yield put(setMenu(response));
  } catch (error) { }

}

export function* fetch_InstituteTopNotices_byUrlId() {

  let reqUrlInfoId = { urlInfoID: urlInfoId }

  const requestURL = BASE_URL.concat(fetch_noticeBy_urlId);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqUrlInfoId)
  };
  const response = yield call(request, requestURL, options);
  console.log('InstituteNotice response', response);
  try {
    yield put(setNotice(response));
  } catch (error) { }

}

export function* fetch_WelcomeSpeech_byUrlId() {

  // console.log('header-urlInfo', urlInfoId);
  
  const requestURL = BASE_URL.concat(fetch_welcomeSpeechBy_urlId).concat('?urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('WelcomeSpeech response', response[0]);
  try {
    yield put(setWelcomeSpeech(response[0]));
  } catch (error) { }

}

export function* fetch_instituteHistory_byUrlId() {

  // console.log('history func', urlInfoId);
  
  const requestURL = BASE_URL.concat(fetch_instituteHistoryBy_urlId).concat('?type=').concat('History').concat('&urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('inst-history response', response);
  try {
    yield put(setHistoryDetails(response[0]));
  } catch (error) { }

}

export function* fetch_instituteTopEvent_byUrlId() {

  // console.log('history func', urlInfoId);
  
  const requestURL = BASE_URL.concat(fetch_instituteTopEventBy_urlId).concat('?urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('inst-topEvent response', response);
  try {
    yield put(setTopEvents(response));
  } catch (error) { }

}

export default function* landingPageSaga() {
  yield fetch_InstituteUrlInfo_byUrlName();
}
