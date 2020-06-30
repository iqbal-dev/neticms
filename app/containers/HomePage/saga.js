import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  BASE_URL, fetch_urlMappingInfoBy_urlName, fetch_menu_urlName, fetch_welcomeSpeechBy_urlId, fetch_noticeBy_urlId,
  fetch_instituteHistoryBy_urlId, fetch_instituteTopEventBy_urlId, fetch_em_token, BASE_URL_EM, fetch_coreSettingsListBy_typeId, fetch_coreSettingsClassConfigurationListBy_instituteId
} from '../../utils/serviceUrl';
import {
  setUrlInfo, setWelcomeSpeech, setNotice, setUrlId, setMenu, setLatestNews, setHistoryDetails, setTopEvents, setAccessToken, setGlobalAcademicYearList, setGlobalSectionList
} from './actions';
import { makeSelectAccessToken } from './selectors';
import { setAcademicYearList } from '../FailList/actions';

export function* fetch_instituteUrlInfo_byUrlName() {

  let instituteHostNm = window.location.pathname.slice(1);
  // console.log('instituteHostNm', instituteHostNm);

  const requestURL = BASE_URL.concat(fetch_urlMappingInfoBy_urlName).concat('?urlName=').concat(instituteHostNm);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('response', response);
  try {

    if (response) {

      let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
      // console.log('after-response', instituteUrlInfo);

      if (instituteUrlInfo == null) {

        // console.log('truee');

        let instituteInfoArr = [{
          key: 1,
          urlName: response.urlInfoDTO.urlName,
          urlInfoID: response.urlInfoDTO.urlInfoID,
          instituteName: response.urlInfoDTO.instituteName,
          instituteAddress: response.urlInfoDTO.instituteAddress,
          instituteContact: response.urlInfoDTO.instituteContact,
          instituteEmail: response.urlInfoDTO.instituteEmail,
        }]

        localStorage.setItem('instituteInfo', JSON.stringify(instituteInfoArr));

      } else {

        var instituteInfo = JSON.parse(localStorage.instituteInfo);
        // console.log('instituteInfo length', instituteInfo);

        for (var i = 0; i < instituteInfo.length; i++) {
          //look for match with name
          if (response.urlInfoDTO.urlName !== instituteInfo[i].urlName) {
            console.log('not match');

            instituteInfo[i].urlName = response.urlInfoDTO.urlName;
            instituteInfo[i].urlInfoID = response.urlInfoDTO.urlInfoID;
            instituteInfo[i].instituteName = response.urlInfoDTO.instituteName;
            instituteInfo[i].instituteAddress = response.urlInfoDTO.instituteAddress;
            instituteInfo[i].instituteContact = response.urlInfoDTO.instituteContact;
            instituteInfo[i].instituteEmail = response.urlInfoDTO.instituteEmail;
            break;
          }
        }
        localStorage.setItem("instituteInfo", JSON.stringify(instituteInfo));

      }

      // let getInstituteUrlInfo = JSON.parse(localStorage.instituteInfo);
      console.log(JSON.parse(localStorage.instituteInfo));

      yield put(setUrlInfo(response));
      yield fetch_emAuthToken();
      yield fetch_Menu_byUrlId(response.urlInfoDTO.urlInfoID);
      yield fetch_InstituteTopNotices_byUrlId(response.urlInfoDTO.urlInfoID);
      yield fetch_WelcomeSpeech_byUrlId(response.urlInfoDTO.urlInfoID);
      yield fetch_instituteHistory_byUrlId(response.urlInfoDTO.urlInfoID);
      yield fetch_instituteTopEvent_byUrlId(response.urlInfoDTO.urlInfoID);

    }

    // console.log('after updt', JSON.parse(localStorage.instituteInfo));

  } catch (error) { }

}

export function* fetch_emAuthToken() {

  var FormData = require('form-data');
  var data = new FormData();
  data.append('grant_type', 'client_credentials');

  const requestURL = BASE_URL_EM.concat(fetch_em_token);
  const options = {
    method: 'POST',
    headers:
    {
      'authorization': 'Basic bmV0aXdvcmxkLXdlYi1yZWFkLXdyaXRlLWNsaWVudDo5UU5uenczSg==',
    },
    body: data
  };
  try {
    const response = yield call(request, requestURL, options);
    yield put(setAccessToken(response));
    localStorage.setItem('token', JSON.stringify(response));

    // yield put(setAccessToken(response))
    console.log('token-response', response);
  } catch (error) { console.log('token-response-err', error); }

}

export function* fetch_Menu_byUrlId(urlInfoId) {

  const requestURL = BASE_URL.concat(fetch_menu_urlName).concat('?urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  try {
    yield put(setMenu(response));
  } catch (error) { }

}

export function* fetch_LatestNews() {

  const requestURL = BASE_URL.concat(fetch_LatestNews);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  try {
    yield put(setLatestNews(response));
  } catch (error) { }

}

export function* fetch_InstituteTopNotices_byUrlId(urlInfoId) {

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
  try {
    yield put(setNotice(response));
  } catch (error) { }

}

export function* fetch_WelcomeSpeech_byUrlId(urlInfoId) {

  const requestURL = BASE_URL.concat(fetch_welcomeSpeechBy_urlId).concat('?urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  try {
    yield put(setWelcomeSpeech(response[0]));
  } catch (error) { }

}

export function* fetch_instituteHistory_byUrlId(urlInfoId) {

  const requestURL = BASE_URL.concat(fetch_instituteHistoryBy_urlId).concat('?type=').concat('History').concat('&urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  try {
    yield put(setHistoryDetails(response[0]));
  } catch (error) { }

}

export function* fetch_instituteTopEvent_byUrlId(urlInfoId) {

  const requestURL = BASE_URL.concat(fetch_instituteTopEventBy_urlId).concat('?urlid=').concat(urlInfoId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  try {
    yield put(setTopEvents(response));
  } catch (error) { }

}

export function* fetch_academicYearListBy_typeId() {

  let token = yield select(makeSelectAccessToken());
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat('10608');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('home-saga', response);
  yield put(setGlobalAcademicYearList(response.item));

}

export function* fetch_classShiftSectionBy_typeId() {

  let token = yield select(makeSelectAccessToken());
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat('10608');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('home-saga-sec', response);
  yield put(setAcademicYearList(response.item));

  // yield put(setGlobalSectionList(response.item));

}

export default function* homePageSaga() {
  yield fetch_instituteUrlInfo_byUrlName();
  yield fetch_academicYearListBy_typeId();
  yield fetch_classShiftSectionBy_typeId();

}
