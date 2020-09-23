import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  BASE_URL_EM,
  fetch_coreSettingsClassConfigurationListBy_instituteId,
  fetch_group_names_by_classConfigId,
  FETCH_ONLINE_CLASS_ROUTINE
} from '../../utils/serviceUrl';
import { setOnlineClassRoutineList, setClassConfigList, setGroupList, setLoader } from './actions';
import { makeSelectClassId, makeSelectGroupId, makeSelectDate } from './selectors';
import { SET_CLASS_ID, SUBMIT_SEARCH_BTN } from './constants';
var moment = require('moment/moment');

export function* fetch_ClassConfigListBy_InstituteId() {

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
  // console.log('onlineClassRoutineList-res', response);
  yield put(setClassConfigList(response.item));
  yield put(setLoader('autoLoadOff'));

}

export function* fetch_GroupListBy_ClassConfigId() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let classConfigId = yield select(makeSelectClassId());

  yield put(setLoader('dependendLoadOn'));
  const requestURL = BASE_URL_EM.concat(fetch_group_names_by_classConfigId).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  // console.log('GroupList-res', response);
  yield put(setGroupList(response.item));
  yield put(setLoader('dependendLoadOff'));

}

export function* fetch_OnlineClassRoutine() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let reqResBody = {
    "classConfigId": yield select(makeSelectClassId()),
    "date": moment(yield select(makeSelectDate())).format('DD/MM/YYYY'),
    "groupId": parseInt(yield select(makeSelectGroupId())),
    "instituteId": instituteId
  }

  // console.log('reqBody', reqResBody);

  yield put(setLoader('tableLoadOn'));

  const requestURL = BASE_URL_EM + FETCH_ONLINE_CLASS_ROUTINE;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
    body: JSON.stringify(reqResBody)
  };

  try {

    const response = yield call(request, requestURL, options);
    yield put(setLoader('tableLoadOff'));
    // console.log('search-res', response);

    if (response.item) { yield put(setOnlineClassRoutineList(response.item)) }
    else { yield put(setOnlineClassRoutineList()) }

  } catch (error) { }

}

export default function* onlineClassRoutineSaga() {
  yield fetch_ClassConfigListBy_InstituteId();
  yield takeLatest(SET_CLASS_ID, fetch_GroupListBy_ClassConfigId);
  yield takeLatest(SUBMIT_SEARCH_BTN, fetch_OnlineClassRoutine);
}
