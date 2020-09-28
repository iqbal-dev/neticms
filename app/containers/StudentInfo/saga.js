import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CLASS_NAME_LIST, CLASS_NAME_SELECTED, CLASS_GROUP_NAME_DROPDOWN_LIST, SUBMIT_SEARCH_BUTTON } from './constants';
import { BASE_URL_EM, fetch_coreSettingsClassConfigurationListBy_instituteId, fetch_group_names_by_classConfigId, FETCH_STUDEN_INFO_BY_GROUP_CONFIG_ID } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { classNameListDropDown, classGroupListDropDown, searchResult, studentSearchResult, setLoader } from './actions';
import { makeSelectClassNameSelected, makeSelectGroupNameSelected } from './selectors';

export function* fetch_className() {

  let token = JSON.parse(localStorage.getItem('emToken'));
  // console.log('token', token);
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  // console.log('instituteId', instituteId);

  yield put(setLoader('autoLoadOn'));
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(setLoader('autoLoadOff'));
    yield put(classNameListDropDown(response.item));
    // console.log('response.item', response.item);

  } catch (error) { }

}

export function* fetch_studentGroupNames() {

  let classConfigId = yield select(makeSelectClassNameSelected());
  let token = JSON.parse(localStorage.getItem('emToken'));

  // console.log('token', token);
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  yield put(setLoader('groupLoadOn'));

  const requestURL = BASE_URL_EM.concat(fetch_group_names_by_classConfigId).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };

  try {
    const response = yield call(request, requestURL, options);

    yield put(setLoader('groupLoadOff'));
    yield put(classGroupListDropDown(response.item));
    // console.log('Class Group response.item', response.item);

  } catch (error) { }

}

export function* fetch_studentInfo() {

  let token = JSON.parse(localStorage.getItem('emToken'));
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let groupConfigId = yield select(makeSelectGroupNameSelected());
  let classConfigId = yield select(makeSelectClassNameSelected());
  // console.log('groupConfigId', groupConfigId);

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  yield put(setLoader('tableLoadOn'));

  const requestURL = BASE_URL_EM.concat(FETCH_STUDEN_INFO_BY_GROUP_CONFIG_ID).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(setLoader('tableLoadOff'));
    yield put(studentSearchResult(response.item));
    // console.log('std-list-res', response);

  } catch (error) { }

}

// Individual exports for testing
export default function* studentInfoSaga() {
  yield fetch_className();
  yield takeLatest(CLASS_NAME_SELECTED, fetch_studentGroupNames);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_studentInfo)
  // See example in containers/HomePage/saga.js
}
