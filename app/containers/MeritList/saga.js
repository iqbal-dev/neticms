import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import {
  fetch_examListBy_classConfigID, BASE_URL_EM, FETCH_SECTION_WISE_MERIT_LIST, fetch_coreSettingsListBy_typeId, fetch_coreSettingsClassConfigurationListBy_instituteId
} from '../../utils/serviceUrl';

import {
  SUBMIT_SEARCH_BUTTON, SET_ACADEMIC_YEAR, SET_EXAM_LIST, SET_ACADEMIC_YEAR_LIST, SET_ON_CHANGE_SECTION
} from './constants';
import {
  setAcademicYearList, setSectionList, setExamList, setMeritListData, setLoader
} from './actions';
import {
  makeSelectAcademicYear, makeSelectClassConfigId, makeSelectExamConfigId
} from './selectors';

// Individual exports for testing

export function* fetch_AcademicYearList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  yield put(setLoader('autoLoadOn'));

  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  try {
    const response = yield call(request, requestURL, options);
    // console.log('ac-year merit list', response);
    yield put(setLoader('autoLoadOff'));
    yield put(setAcademicYearList(response.item));
  } catch (error) { }
};

export function* fetch_classShiftSectionBy_instituteId() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  yield put(setLoader('autoLoadOn'));

  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('home-saga-sec', response);
  yield put(setLoader('autoLoadOff'));
  yield put(setSectionList(response.item));

}

export function* fetch_examListBy_sectionId() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let classConfigId = yield select(makeSelectClassConfigId());
  yield put(setLoader('dependendLoadOn'));

  const requestURL = BASE_URL_EM.concat(fetch_examListBy_classConfigID).concat('?instituteId=').concat(instituteId).concat('&classConfigId=').concat(classConfigId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  yield put(setLoader('dependendLoadOff'));

  // console.log('home-saga-sec', response);
  yield put(setExamList(response.item));

}

export function* fetch_meritList() {

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let acYear = yield select(makeSelectAcademicYear());
  let classConfigId = yield select(makeSelectClassConfigId());
  let examConfigId = yield select(makeSelectExamConfigId());

  // console.log('acyear', acYear);
  yield put(setLoader('tableLoadOn'));

  const requestURL = BASE_URL_EM.concat(FETCH_SECTION_WISE_MERIT_LIST).concat('?classConfigId=').concat(classConfigId).concat('&examConfigId=').concat(examConfigId).concat('&academicYear=').concat(acYear).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(setLoader('tableLoadOff'));
    console.log('merit lis Res', response);
    yield put(setMeritListData(response.item));
  } catch (error) { }

}

export default function* meritListSaga() {
  yield fetch_AcademicYearList();
  yield fetch_classShiftSectionBy_instituteId();
  yield takeLatest(SET_ON_CHANGE_SECTION, fetch_examListBy_sectionId);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_meritList)
}
