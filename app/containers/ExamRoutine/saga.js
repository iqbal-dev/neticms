import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import request from '../../utils/request';
import {
  BASE_URL_EM,
  fetch_coreSettingsListBy_typeId,
  fetch_examRoutineList,
  fetch_examTypeByClassId,
  fetch_examSessionList
} from '../../utils/serviceUrl';
import {
  setClassList,
  setExamTypeList,
  setExamSessionList,
  setExamRoutineListData,
  setDataTableLoader,
  setClassLoader,
  setExamTypeLoader,
  setExamSessionLoader
} from './actions';
import { SET_ON_CHANGE_CLASS_ID, SUBMIT_SEARCH_BUTTON } from './constants';
import { makeSelectClassId, makeSelectExamSessionId, makeSelectExamTypeId } from './selectors';

export function* fetch_classListBy_typeId() {
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  yield put(setClassLoader(true));
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsListBy_typeId).concat('?typeId=').concat(2102).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('Class routine-saga-sec', response);

  try {
    yield put(setClassList(response.item));
    yield put(setClassLoader(false));
  } catch (error) { }
}

export function* fetch_examType() {

  let classId = yield select(makeSelectClassId());

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  yield put(setExamTypeLoader(true));
  const requestURL = BASE_URL_EM.concat(fetch_examTypeByClassId).concat('?classId=').concat(classId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('exam-res', response);

  try {
    yield put(setExamTypeList(response.item));
    yield put(setExamTypeLoader(false));
  } catch (error) { }

}

export function* fetch_examSessionListData() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  yield put(setExamSessionLoader(true));
  const requestURL = BASE_URL_EM.concat(fetch_examSessionList).concat('?instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('session-sec', response);

  try {
    yield put(setExamSessionList(response.item));
    yield put(setExamSessionLoader(false));
  } catch (error) { }
}

export function* fetch_examRoutine() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let classId = yield select(makeSelectClassId());
  let examTypeId = yield select(makeSelectExamTypeId());
  let examSessionId = yield select(makeSelectExamSessionId());

  // console.log('classId', classId, 'examTypeId', examTypeId, 'examSessionId', examSessionId);
  yield put(setDataTableLoader(true));

  const requestURL = BASE_URL_EM.concat(fetch_examRoutineList).concat('?examConfigId=').concat(examTypeId).concat('&sessionId=').concat(examSessionId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  const response = yield call(request, requestURL, options);
  try {
    // console.log('exam-routine-res', response);
    yield put(setExamRoutineListData(response));
    yield put(setDataTableLoader(false));
  } catch (error) { }

}

// Individual exports for testing
export default function* examRoutineSaga() {
  yield fetch_classListBy_typeId()
  yield fetch_examSessionListData()
  yield takeLatest(SET_ON_CHANGE_CLASS_ID, fetch_examType)
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_examRoutine)
}
