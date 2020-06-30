import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  SET_ON_CHANGE_ACADEMIC_YEAR,
  SET_ON_CHANGE_SECTION,
  SET_ON_CHANGE_EXAM_TYPE,
  SUBMIT_SEARCH_BUTTON
} from './constants';
import { BASE_URL_EM, fetch_coreSettingsListBy_typeId, fetch_coreSettingsClassConfigurationListBy_instituteId, fetch_examListBy_classConfigID, fetch_sectionWiseFailList } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { setFailListData, setAcademicYearList, setSectionList, setExamList } from './actions';
import { makeSelectAcademicYear, makeSelectClassConfigId, makeSelectExamConfigId } from './selectors';

export function* fetch_AcademicYearList() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));


  let instituteID = '10020';
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat('2101').concat('&instituteId=').concat(instituteID);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,

    },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('ac-year', response);

    yield put(setAcademicYearList(response.item));
  } catch (error) { }

};

export function* fetch_classShiftSectionBy_instituteId() {

  let emToken = JSON.parse(localStorage.getItem('emToken'));


  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat('10020');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('home-saga-sec', response);
  yield put(setSectionList(response.item));

  // yield put(setGlobalSectionList(response.item));

}

export function* fetch_examListBy_sectionId() {

  let emToken = JSON.parse(localStorage.getItem('emToken'));


  let classConfigId = yield select(makeSelectClassConfigId());
  console.log('classConfigId', classConfigId);

  const requestURL = BASE_URL_EM.concat(fetch_examListBy_classConfigID).concat('?instituteId=').concat('10020').concat('&classConfigId=').concat(classConfigId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('home-saga-sec', response);
  yield put(setExamList(response.item));

}

export function* fetch_failList() {

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let acYear = yield select(makeSelectAcademicYear());
  let classConfigId = yield select(makeSelectClassConfigId());
  let examConfigId = yield select(makeSelectExamConfigId());

  // console.log('acyear', acYear, 'classConfigId', classConfigId, 'examConfigId', examConfigId);
  
  const requestURL = BASE_URL_EM.concat(fetch_sectionWiseFailList).concat('?classConfigId=').concat(classConfigId).concat('&examConfigId=').concat(examConfigId).concat('&academicYear=').concat(acYear).concat('&instituteId=').concat('10020');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  const response = yield call(request, requestURL, options);
  console.log('FAIL LIST Response>>>>>>>>>>>>>>>>', response);
  try {
    yield put(setFailListData(response.item));
  } catch (error) { }

}

export default function* failListSaga() {

  yield fetch_AcademicYearList();
  yield fetch_classShiftSectionBy_instituteId(),
  yield takeLatest(SET_ON_CHANGE_SECTION, fetch_examListBy_sectionId);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_failList)

}
