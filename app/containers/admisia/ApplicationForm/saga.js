import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  BASE_URL_NETI_CMS,
  insert_applicant_info,
  FETCH_APPLICANT_INFO_DETAILS_BY_REG_ID,
  FETCH_DIVISION_LIST,
  FETCH_DISTRICT_LIST_BY_DIVISION,
} from '../../../utils/serviceUrl';

import { SET_ON_SUBMIT_INSERT_APPLICANT_INFO, SET_DIVISION_ID, SET_DISTRICT_ID } from './constants';
import {
  setApplicantInfoListByRegId,
  setMessage,
  setLoader,
  setDivisionList,
  setDistrictList
} from './actions';
import { makeSelectInsertApplicantInfo, makeSelectDivisionId, makeSelectDivisionList, makeSelectDistrictList, makeSelectDistrictId } from './selectors';

export function* fetch_divisionList() {

  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_DIVISION_LIST);
  const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
  try {
    const response = yield call(request, requestURL, options);
    console.log('response', response);
    yield put(setDivisionList(response.item));
  } catch (error) {
    console.log('division not fetch');
  }

}

export function* fetch_districtList() {

  yield put(setLoader('dropDownLoaderOn'));
  const divisionId = yield select(makeSelectDivisionId());
  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_DISTRICT_LIST_BY_DIVISION).concat('?divisionId=').concat(divisionId);
  const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
  try {
    const response = yield call(request, requestURL, options);
    console.log('district-response', response);
    yield put(setLoader('dropDownLoaderOff'));
    yield put(setDistrictList(response.item));
  } catch (error) {
    console.log('district not fetch');
  }

}

export function* submitApplicantInfo() {

  let insertApplicantInfo = yield select(makeSelectInsertApplicantInfo());
  console.log("INSERT OBJ", insertApplicantInfo);
  yield put(setLoader('RegLoaderOn'));

  const requestURL = BASE_URL_NETI_CMS.concat(insert_applicant_info);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insertApplicantInfo)
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log('SUBMIT::::', response);
    yield put(setMessage(response));
    yield put(setLoader('RegLoaderOff'));

    if (response.messageType === 1) {
      yield fetch_applicantInfoDetailsByRegId(response.item);
    }
  } catch (error) { }

}

export function* fetch_applicantInfoDetailsByRegId(registrationId) {

  let insertApplicantInfoObj = yield select(makeSelectInsertApplicantInfo());

  // console.log('insertApplicantInfoObj', insertApplicantInfoObj);

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsId = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

  yield put(setLoader('RNLoaderOn'));
  const requestURL = BASE_URL_NETI_CMS.concat(FETCH_APPLICANT_INFO_DETAILS_BY_REG_ID).concat('?registrationId=').concat(registrationId).concat('&cmsId=').concat(cmsId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let response = yield call(request, requestURL, options);
    console.log('list-by-regId', response);

    yield put(setLoader('RNLoaderOff'));

    if (response.messageType === 1) {
      yield put(setApplicantInfoListByRegId(response.item.applicantPersonalViewResponse));
    }

    let addressObject = yield fetch_division_district_name();
    // console.log('test-addressObject', addressObject);

    let downloadInformationArray = [];
    let downloadInformationObj = {
      insertApplicantInfoObj: insertApplicantInfoObj,
      applicantPersonalViewResponse: response.item.applicantPersonalViewResponse,
      applicantPreviousExamViewResponses: response.item.applicantPreviousExamViewResponses,
      address: addressObject,
    }

    // console.log('downloadInformationObj', downloadInformationObj);
    downloadInformationArray.push(downloadInformationObj);
    // console.log('downloadInformationArray', downloadInformationArray);

    sessionStorage.setItem("applicantFromDownloadData", JSON.stringify(downloadInformationObj));

  } catch (error) { }
}

export function* fetch_division_district_name() {

  let divisionList = yield select(makeSelectDivisionList());
  let districtList = yield select(makeSelectDistrictList());
  const divisionId = yield select(makeSelectDivisionId());
  const districtId = yield select(makeSelectDistrictId());

  let divisionName = '';
  if (divisionList && divisionList.length) {
    divisionList.filter(item => {
      if (item.divisionId == divisionId) { divisionName = item.divisionName }
    })
  }
  // console.log('come-to-divisionName', divisionName);

  let districtName = '';
  if (districtList && districtList.length) {
    districtList.filter(item => {
      if (item.districtId == districtId) { districtName = item.districtName }
    })
  }
  // console.log('come-to-districtName', districtName);

  const addressObj = {
    divisionName: divisionName,
    districtName: districtName
  }

  // console.log('addressObj', addressObj);
  return addressObj;

}

export default function* applicationFormSaga() {
  yield fetch_divisionList();
  yield takeLatest(SET_DIVISION_ID, fetch_districtList);
  yield takeLatest(SET_ON_SUBMIT_INSERT_APPLICANT_INFO, submitApplicantInfo);
}
