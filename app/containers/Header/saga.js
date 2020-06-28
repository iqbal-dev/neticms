// import { take, call, put, select } from 'redux-saga/effects';
// import request from '../../utils/request';
// import { BASE_URL, fetch_urlMappingInfoBy_urlName, fetch_welcomeSpeechBy_urlId, fetch_menu_urlName, fetch_noticeBy_urlId, fetch_instituteHistoryBy_urlId, fetch_instituteTopEventBy_urlId, fetch_em_token, BASE_URL_EM, fetch_sectionListBy_instituteID } from '../../utils/serviceUrl';
// import { fetch_className_typeId } from '../../utils/serviceUrl';
// import { getMethod } from '../../utils/baseMethod';

// import { setInstituteUrlInfo, setWelcomeSpeech, setMenu, setNotice, setHistoryDetails, setTopEvents, setAccessToken, setClassListByTypeId } from './actions';
// import { setUrlInfoLocally } from '../../utils/localStorageMethod';
// import { setUrlId } from '../HomePage/actions';
// import { makeSelectInstituteUrlInfo, makeSelectAccessToken } from './selectors';
// import { makeSelectUrlId } from '../HomePage/selectors';
// // import { makeSelectUrlInfo } from '../HomePage/selectors';

// // Individual exports for testing

// export function* fetch_emAuthToken() {

//   var FormData = require('form-data');
//   var data = new FormData();
//   data.append('grant_type', 'client_credentials');

//   const requestURL = BASE_URL_EM.concat(fetch_em_token);
//   const options = {
//     method: 'POST',
//     headers:
//     {
//       'authorization': 'Basic bmV0aXdvcmxkLXdlYi1yZWFkLXdyaXRlLWNsaWVudDo5UU5uenczSg==',
//     },
//     body: data
//   };
//   try {
//     const response = yield call(request, requestURL, options);
//     yield put(setAccessToken(response))
//     console.log('token-response', response);
//   } catch (error) { console.log('token-response-err', error); }

// }

// let urlInfoId = '';

// export function* fetch_dataByMatching_pathName() {

//   let pathName = window.location.pathname.slice(1);
//   console.log('instituteHostNm', pathName);
//   let routingArray = ["ngghs", "demo2","about", "history", "booklist", "all_events", "classRooms", "donors", "committee", "download_corner",
//     "dressCode", "syllabus_info", "sectionWise_attendance", "studentWise_attendance", "sectionWise_result", "failList", "example",
//     "all_teachers", "fees_info", "Student_info", "welcome_speech", "individual_result", "teacher_attendance", "meritList", "seatInfo",
//     "all_notice", "stuff_information", "event_gallery", "infrastucture", "find_paySlip"
//   ];

//   if (routingArray.includes(pathName)) {
//     console.log('route-match');
//     // console.log('route-match', yield select(makeSelectInstituteUrlInfo()));
//     // console.log('route-match', yield select(makeSelectUrlId()));
//     yield fetch_InstituteUrlInfo_byUrlName(pathName);

//   }else{ 
//     console.log('have or not check', yield select(makeSelectInstituteUrlInfo()));
//   }
//   // else if (pathName === 'home') {

//   //   console.log('have or not check', yield select(makeSelectInstituteUrlInfo()));

//   //   // yield select(makeSelectInstituteUrlInfo());
//   //   // pathName = ;
//   //   yield fetch_InstituteUrlInfo_byUrlName(pathName);
//   // } else { yield fetch_InstituteUrlInfo_byUrlName(pathName) }

// }

// export function* fetch_InstituteUrlInfo_byUrlName(pathName) {

//   const requestURL = BASE_URL.concat(fetch_urlMappingInfoBy_urlName).concat('?urlName=').concat(pathName);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Authorization': tokenData.token_type + " " + tokenData.access_token,
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   console.log('inst-url-info-response', response);
//   try {

//     if (response) {
//       urlInfoId = response.urlInfoDTO.urlInfoID;
//       yield put(setInstituteUrlInfo(response));
//       // setUrlInfoLocally(JSON.stringify(response));
//       yield put(setUrlId(response));

//       yield fetch_Menu_byUrlId();
//       yield fetch_InstituteTopNotices_byUrlId();
//       yield fetch_WelcomeSpeech_byUrlId();
//       yield fetch_instituteHistory_byUrlId();
//       yield fetch_instituteTopEvent_byUrlId();

//     }

//   } catch (error) { }

// }

// export function* fetch_Menu_byUrlId() {

//   const requestURL = BASE_URL.concat(fetch_menu_urlName).concat('?urlid=').concat(urlInfoId);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('menu response', response);
//   try {
//     yield put(setMenu(response));
//   } catch (error) { }

// }

// export function* fetch_LatestNews() {

//   const requestURL = BASE_URL.concat(fetch_latestNews);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('menu response', response);
//   try {
//     yield put(setMenu(response));
//   } catch (error) { }

// }

// export function* fetch_InstituteTopNotices_byUrlId() {

//   let reqUrlInfoId = { urlInfoID: urlInfoId }

//   const requestURL = BASE_URL.concat(fetch_noticeBy_urlId);
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(reqUrlInfoId)
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('InstituteNotice response', response);
//   try {
//     yield put(setNotice(response));
//   } catch (error) { }

// }

// export function* fetch_WelcomeSpeech_byUrlId() {

//   // console.log('header-urlInfo', urlInfoId);

//   const requestURL = BASE_URL.concat(fetch_welcomeSpeechBy_urlId).concat('?urlid=').concat(urlInfoId);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('WelcomeSpeech response', response[0]);
//   try {
//     yield put(setWelcomeSpeech(response[0]));
//   } catch (error) { }

// }

// export function* fetch_instituteHistory_byUrlId() {

//   // console.log('history func', urlInfoId);

//   const requestURL = BASE_URL.concat(fetch_instituteHistoryBy_urlId).concat('?type=').concat('History').concat('&urlid=').concat(urlInfoId);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('inst-history response', response);
//   try {
//     yield put(setHistoryDetails(response[0]));
//   } catch (error) { }

// }

// export function* fetch_instituteTopEvent_byUrlId() {

//   // console.log('history func', urlInfoId);

//   const requestURL = BASE_URL.concat(fetch_instituteTopEventBy_urlId).concat('?urlid=').concat(urlInfoId);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('inst-topEvent response', response);
//   try {
//     yield put(setTopEvents(response));
//   } catch (error) { }

// }

// export function* fetch_sectionList() {

//   let token = yield select(makeSelectAccessToken());
//   let instituteUrlInfo = yield select(makeSelectInstituteUrlInfo());
//   let instituteID = instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;
//   // console.log('instituteUrlInfo', instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId);
//   const requestURL = BASE_URL_EM.concat(fetch_sectionListBy_instituteID).concat('?instituteId=').concat(instituteID);
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'bearer ' + token.access_token,

//     },
//   };
//   const response = yield call(request, requestURL, options);
//   // console.log('section list response', response);
//   try {
//     yield put(setSectionList(response.item));
//   } catch (error) { }
// };

// export function* fetch_classNameBy_typeId() {

//   // console.log('history func', urlInfoId);

//   let token = yield select(makeSelectAccessToken())
//   // console.log("TOKEN>>>>>>>>>>>>>>", token);

//   // let instituteUrlInfo = yield select(makeSelectInstituteUrlInfo());
//   // console.log("instituteUrlInfo", instituteUrlInfo);
//   // let instituteID = instituteUrlInfo && instituteUrlInfo.coreUrlMappingDTOs[0] && instituteUrlInfo.coreUrlMappingDTOs[0].edumanDetailsInfoDTO.instituteId;

//   // console.log("instituteID", instituteID);

//   const requestURL = BASE_URL_EM.concat(fetch_className_typeId).concat('?instituteId=').concat('10012');
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'bearer ' + token.access_token,

//     },
//   };

//   const response = yield call(request, requestURL, options);
//   try {
//     yield put(setClassListByTypeId(response.item));
//   } catch (error) { }

// }

// export default function* landingPageSaga() {
//   yield fetch_emAuthToken();
//   yield fetch_dataByMatching_pathName();

// }
