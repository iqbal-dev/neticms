import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import {

  BASE_URL_EM, BASE_URL_NETI_CMS, BASE_URL_NW,
  fetch_urlMappingInfoBy_urlName, fetch_menu_urlName, fetch_em_token,
  fetch_welcomeSpeechBy_cmsId, fetch_noticeBy_cmsId, fetch_instituteHistoryBy_cmsId,
  fetch_instituteTopEventBy_cmsId,
  fetch_coreSettingsListBy_typeId, fetch_coreSettingsClassConfigurationListBy_instituteId, fetch_usefullLinksBy_cmsId,
  fetch_sliderImage_cmsId

} from '../../utils/serviceUrl';

import {
  setUrlInfo, setWelcomeSpeech, setNotice, setUrlId, setMenu, setLatestNews, setHistoryDetails, setTopEvents, setEmAccessToken, setGlobalAcademicYearList, setGlobalSectionList, setUseFullLinks, setHomeSlider, visibleInstMappingDialog, hideInstMappingDialog, setMappingInstitute, setLoader
} from './actions';
import { makeSelectEmAccessToken, makeSelectMappingInstId } from './selectors';
import { setAcademicYearList } from '../FailList/actions';
import { SUBMIT_MAP } from './constants';

export function* fetch_instituteUrlInfo_byUrlName() {

  let instituteHostNm = window.location.pathname.slice(1);

  // console.log('instituteHostNm', instituteHostNm);
  let instMappingCheck = true;
  if (instituteHostNm == 'institute/home') {
    var instituteInfo = JSON.parse(localStorage.instituteInfo);
    instituteHostNm = instituteInfo[0].urlName;
    instMappingCheck = false;
  } else { instMappingCheck = true }

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_urlMappingInfoBy_urlName).concat(instituteHostNm);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('url-mapping-response', response);
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
          logoName: response.item.logoName,
          logoContent: response.item.logoContent
        }]

        localStorage.setItem('instituteInfo', JSON.stringify(instituteInfoArr));

      } else {

        var instituteInfo = JSON.parse(localStorage.instituteInfo);
        for (var i = 0; i < instituteInfo.length; i++) {
          //look for match with name
          // if (response.item.urlName !== instituteInfo[i].urlName) {
          // console.log('not match');

          instituteInfo[i].urlName = response.item.urlName;
          instituteInfo[i].cmsId = response.item.cmsId;
          instituteInfo[i].instituteName = response.item.instituteName;
          instituteInfo[i].instituteAddress = response.item.instituteAddress;
          instituteInfo[i].instituteContact = response.item.instituteContact;
          instituteInfo[i].instituteEmail = response.item.instituteEmail;
          instituteInfo[i].logoName = response.item.logoName;
          instituteInfo[i].logoContent = response.item.logoContent;
          instituteInfo[i].emInstituteList = response.item.edumanInstituteList

          break;
          // }
        }
        localStorage.setItem("instituteInfo", JSON.stringify(instituteInfo));

      }
      // console.log('instInfo-storage', JSON.parse(localStorage.instituteInfo));

      yield fetch_emAuthToken();
      yield put(setUrlInfo(response.item));

      let urlDetails = JSON.parse(localStorage.instituteInfo);
      if (urlDetails[0].cmsId && urlDetails[0].emInstituteList.length > 1 && instMappingCheck) {
        yield put(visibleInstMappingDialog());
        console.log('inst home not found');
      } else {

        let loadingStatus= {
          homeSlider: true,
          noticeList: true,
          welcomeSpeech: true,
          usefullLink: true,
          eventList: true,
        }

        // yield put(setLoader("homeSlider", true));
        // yield put(setLoader("noticeList", true));

        yield put(hideInstMappingDialog());
        // yield fetch_Menu_byUrlId(response.item.cmsId);
        yield fetch_InstituteTopNotices_byUrlId(response.item.cmsId);
        yield fetch_WelcomeSpeech_byUrlId(response.item.cmsId);
        yield fetch_usefullLinks_byUrlId(response.item.cmsId);
        yield fetch_instituteHistory_byUrlId(response.item.cmsId);
        yield fetch_instituteTopEvent_byUrlId(response.item.cmsId);
        yield fetch_SliderImage_byUrlId(response.item.cmsId);
      }

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
    yield put(setEmAccessToken(response));
    localStorage.setItem('emToken', JSON.stringify(response));
    // console.log('token-response', response);
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
  // console.log('notice func', cmsId);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_noticeBy_cmsId).concat('?cmsId=').concat(cmsId);
  // console.log('requestURL', requestURL);

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = yield call(request, requestURL, options);
  // console.log('instituteTopNotices_Res', response);

  try {
    yield put(setNotice(response.item));
    sessionStorage.setItem('allNoticeList', JSON.stringify(response.item));
    // yield put(setLoader("noticeList", false));
  } catch (error) { }

}

export function* fetch_SliderImage_byUrlId(cmsId) {
  // console.log('SliderImage', cmsId);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_sliderImage_cmsId).concat('?photoType=Home%20Slider').concat('&cmsId=').concat(cmsId);
  console.log('requestURL SliderImage', requestURL);

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = yield call(request, requestURL, options);
  console.log('SliderImage_Res...........', response);

  try {
    yield put(setHomeSlider(response.item));
    // yield put(setLoader("homeSlider", false));
    // sessionStorage.setItem('allNoticeList', JSON.stringify(response.item));
  } catch (error) { }

}

export function* fetch_WelcomeSpeech_byUrlId(cmsId) {

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_welcomeSpeechBy_cmsId).concat('?cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('welcome-speechRes', response);

  try {
    yield put(setWelcomeSpeech(response.item));
  } catch (error) { }

}

export function* fetch_usefullLinks_byUrlId(cmsId) {

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_usefullLinksBy_cmsId).concat('?cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = yield call(request, requestURL, options);
  // console.log('useFullsLinks-Res', response);

  try {
    yield put(setUseFullLinks(response.item));
  } catch (error) { }

}

export function* fetch_instituteHistory_byUrlId(cmsId) {

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_instituteHistoryBy_cmsId).concat('?cmsId=').concat(cmsId).concat('&aboutusType=History');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('history-Res', response);

  try {
    yield put(setHistoryDetails(response.item));
  } catch (error) { }

}

export function* fetch_instituteTopEvent_byUrlId(cmsId) {

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_instituteTopEventBy_cmsId).concat('?cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('event-response', response);

  try {
    yield put(setTopEvents(response.item));
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
  // console.log('home-saga', response);
  yield put(setGlobalAcademicYearList(response.item));

}

export function* fetch_classShiftSectionBy_typeId() {

  let token = yield select(makeSelectEmAccessToken());
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat('10608');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('home-saga-sec', response);

  yield put(setGlobalSectionList(response.item));

}

export function* emInstituteIdMapping() {

  let selectedInstituteId = yield select(makeSelectMappingInstId());
  let urlDetails = JSON.parse(localStorage.instituteInfo);
  console.log('map func', selectedInstituteId, urlDetails);

  let mappinginstitute = [];

  urlDetails[0].emInstituteList.filter((details => {

    if (selectedInstituteId == details.edumanInstituteId) {
      // console.log('matched inst', details);
      mappinginstitute.push(details);
    }

  }));

  let instituteInfo = JSON.parse(localStorage.instituteInfo);

  for (var i = 0; i < instituteInfo.length; i++) {
    instituteInfo[i].emInstituteList = mappinginstitute;
  }

  localStorage.setItem("instituteInfo", JSON.stringify(instituteInfo));
  // console.log('fetch-afterset', JSON.parse(localStorage.instituteInfo));
  yield put(hideInstMappingDialog());
  yield put(setMappingInstitute(''));

  yield fetch_InstituteTopNotices_byUrlId(urlDetails[0].cmsId);
  yield fetch_WelcomeSpeech_byUrlId(urlDetails[0].cmsId);
  yield fetch_usefullLinks_byUrlId(urlDetails[0].cmsId);
  yield fetch_instituteHistory_byUrlId(urlDetails[0].cmsId);
  yield fetch_instituteTopEvent_byUrlId(urlDetails[0].cmsId);
  yield fetch_SliderImage_byUrlId(urlDetails[0].cmsId);

}

export default function* homePageSaga() {
  yield fetch_instituteUrlInfo_byUrlName();
  yield fetch_classShiftSectionBy_typeId();
  yield takeLatest(SUBMIT_MAP, emInstituteIdMapping)

}
