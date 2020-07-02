import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  BASE_URL, fetch_urlMappingInfoBy_urlName, fetch_menu_urlName, fetch_welcomeSpeechBy_urlId, fetch_noticeBy_urlId,
  fetch_instituteHistoryBy_urlId, fetch_instituteTopEventBy_urlId, fetch_em_token, BASE_URL_EM, fetch_coreSettingsListBy_typeId, fetch_coreSettingsClassConfigurationListBy_instituteId, BASE_URL_NETI_CMS, BASE_URL_NW
} from '../../utils/serviceUrl';
import {
  setUrlInfo, setWelcomeSpeech, setNotice, setUrlId, setMenu, setLatestNews, setHistoryDetails, setTopEvents, setAccessToken, setGlobalAcademicYearList, setGlobalSectionList
} from './actions';
import { makeSelectAccessToken } from './selectors';
import { setAcademicYearList } from '../FailList/actions';

export function* fetch_instituteUrlInfo_byUrlName() {

  let instituteHostNm = window.location.pathname.slice(1);
  // console.log('instituteHostNm', instituteHostNm);
  if (instituteHostNm == 'home') {
    var instituteInfo = JSON.parse(localStorage.instituteInfo);
    instituteHostNm = instituteInfo[0].urlName
  }

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_urlMappingInfoBy_urlName).concat(instituteHostNm);
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

        let instituteInfoArr = [{
          key: 1,
          urlName: response.item.urlName,
          cmsId: response.item.cmsId,
          emInstituteList: response.item.edumanInstituteList,
          instituteName: response.item.instituteName,
          instituteAddress: response.item.instituteAddress,
          instituteContact: response.item.instituteContact,
          instituteEmail: response.item.instituteEmail,
          logoName: response.item.logoName
        }]

        localStorage.setItem('instituteInfo', JSON.stringify(instituteInfoArr));

      } else {

        var instituteInfo = JSON.parse(localStorage.instituteInfo);
        // console.log('instituteInfo length', instituteInfo);

        for (var i = 0; i < instituteInfo.length; i++) {
          //look for match with name
          if (response.item.urlName !== instituteInfo[i].urlName) {
            console.log('not match');

            instituteInfo[i].urlName = response.item.urlName;
            instituteInfo[i].cmsId = response.item.cmsId;
            instituteInfo[i].instituteName = response.item.instituteName;
            instituteInfo[i].instituteAddress = response.item.instituteAddress;
            instituteInfo[i].instituteContact = response.item.instituteContact;
            instituteInfo[i].instituteEmail = response.item.instituteEmail;
            instituteInfo[i].logoName = response.logoName;
            instituteInfo[i].emInstituteList = response.item.edumanInstituteList

            break;
          }
        }
        localStorage.setItem("instituteInfo", JSON.stringify(instituteInfo));

      }

      // console.log(JSON.parse(localStorage.instituteInfo));

      yield put(setUrlInfo(response.item));
      yield fetch_emAuthToken();
      // yield fetch_Menu_byUrlId(response.item.cmsId);
      
      yield fetch_InstituteTopNotices_byUrlId(response.item.cmsId);
      yield fetch_WelcomeSpeech_byUrlId(response.item.cmsId);
      yield fetch_instituteHistory_byUrlId(response.item.cmsId);
      yield fetch_instituteTopEvent_byUrlId(response.item.cmsId);

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
    localStorage.setItem('emToken', JSON.stringify(response));

    // yield put(setAccessToken(response))
    console.log('token-response', response);
  } catch (error) { console.log('token-response-err', error); }

}

export function* fetch_Menu_byUrlId(urlInfoId) {

  const requestURL = BASE_URL_NW.concat(fetch_menu_urlName).concat('?urlid=').concat(urlInfoId);
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

  const requestURL = BASE_URL_NW.concat(fetch_LatestNews);
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

export function* fetch_InstituteTopNotices_byUrlId(cmsId) {
  console.log('notice func', cmsId);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_noticeBy_urlId).concat('?cmsId=').concat(cmsId);
  console.log('requestURL', requestURL);

  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  };
  const response = yield call(request, requestURL, options);
  console.log('instituteTopNotices_Res', response);

  try {
    yield put(setNotice(response.item));
    sessionStorage.setItem('allNoticeList',  JSON.stringify(response.item));
  } catch (error) { }

}

export function* fetch_WelcomeSpeech_byUrlId(urlInfoId) {

  const requestURL = BASE_URL_NW.concat(fetch_welcomeSpeechBy_urlId).concat('?urlid=').concat(urlInfoId);
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

  const requestURL = BASE_URL_NW.concat(fetch_instituteHistoryBy_urlId).concat('?type=').concat('History').concat('&urlid=').concat(urlInfoId);
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

  const requestURL = BASE_URL_NW.concat(fetch_instituteTopEventBy_urlId).concat('?urlid=').concat(urlInfoId);
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
  // yield fetch_academicYearListBy_typeId();
  // yield fetch_classShiftSectionBy_typeId();

}
