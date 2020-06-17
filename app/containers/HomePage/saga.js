import { take, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL, fetch_urlMappingInfoBy_urlName, fetch_menu_urlName, fetch_welcomeSpeechBy_urlId, fetch_noticeBy_urlId } from '../../utils/serviceUrl';
// import { getMethod } from '../../utils/baseMethod';

import { setInstituteUrlInfo, setUrlInfo, setWelcomeSpeech, setNotice, setUrlId } from './actions';
import { getUrlInfoLocally } from '../../utils/localStorageMethod';
import { makeSelectInstituteUrlInfo } from '../Header/selectors';
import { makeSelectUrlId } from './selectors';
import { fetch_WelcomeSpeech_byUrlId } from '../Header/saga';

// Individual exports for testing

// export function* fetch_InstituteUrlInfo_byUrlName() {

//   let instituteHostNm = window.location.pathname.slice(1);
//   // console.log('instituteHostNm', instituteHostNm);

//   const requestURL = BASE_URL.concat(fetch_urlMappingInfoBy_urlName).concat('?urlName=').concat(instituteHostNm);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Authorization': tokenData.token_type + " " + tokenData.access_token,
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   console.log('response', response);
//   try {

//     yield put(setUrlInfo(response));

//     let urlInfoObj = {
//       urlName: response.urlInfoDTO.urlName,
//       urlInfoID: response.urlInfoDTO.urlInfoID,
//       instituteName: response.urlInfoDTO.instituteName,
//       instituteAddress: response.urlInfoDTO.instituteAddress,
//       instituteContact: response.urlInfoDTO.instituteContact,
//       instituteEmail: response.urlInfoDTO.instituteEmail,
//     }

//     setUrlInfoLocally(JSON.stringify(urlInfoObj));

//     yield fetch_Menu_byUrlId(response.urlInfoDTO.urlInfoID);
//     yield fetch_WelcomeSpeech_byUrlId(response.urlInfoDTO.urlInfoID);
//     yield fetch_InstituteNotice_byUrlId(response.urlInfoDTO.urlInfoID);
//   } catch (error) { }

// }

// export function* fetch_Menu_byUrlId(urlId) {

//   const requestURL = BASE_URL.concat(fetch_menu_urlName).concat('?urlid=').concat(urlId);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('menu response', response);
//   try {
//     yield put(setWelcomeSpeech(response));
//   } catch (error) { }

// }

export function* fetch_WelcomeSpeech() {
  yield fetch_WelcomeSpeech_byUrlId();
}

// export function* fetch_InstituteNotice_byUrlId(urlId) {

//   let urlInfoId = { urlInfoID: urlId }
//   // console.log('urlInfoId', urlInfoId);

//   const requestURL = BASE_URL.concat(fetch_noticeBy_urlId);
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(urlInfoId)
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('InstituteNotice response', response);
//   try {
//     yield put(setNotice(response));
//   } catch (error) { }

// }

export default function* homePageSaga() {
  yield fetch_WelcomeSpeech();
}
