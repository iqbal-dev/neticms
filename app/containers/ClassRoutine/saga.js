import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { BASE_URL_EM, fetch_coreSettingsClassConfigurationListBy_instituteId, fetch_classRoutineList } from '../../utils/serviceUrl';
import { setSectionList, setClassRoutineListData, setDataTableLoader, setClassLoader } from './actions';
import { SUBMIT_SEARCH_BUTTON } from './constants';
import { makeSelectClassConfigId } from './selectors';


export function* fetch_classShiftSectionBy_instituteId() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  yield put(setClassLoader(true));
  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat(instituteId);
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
    yield put(setSectionList(response.item));
    yield put(setClassLoader(false));
  } catch (error) { }
}

export function* fetch_classRoutine() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let classConfigId = yield select(makeSelectClassConfigId());

  // console.log('acyear', acYear, 'classConfigId', classConfigId, 'examConfigId', examConfigId);
  yield put(setDataTableLoader(true));

  const requestURL = BASE_URL_EM.concat(fetch_classRoutineList).concat('?classConfigId=').concat(165480/*classConfigId*/).concat('&instituteId=').concat(15051/*instituteId*/);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };

  const response = yield call(request, requestURL, options);
  try {
    yield put(setClassRoutineListData(response));
    yield put(setDataTableLoader(false));
  } catch (error) { }

}

// Individual exports for testing
export default function* classRoutineSaga() {
  yield fetch_classShiftSectionBy_instituteId()
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_classRoutine)
}
