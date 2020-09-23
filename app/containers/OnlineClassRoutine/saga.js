import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  fetch_examListBy_classConfigID,
  BASE_URL_EM,
  fetch_student_sectionWise_resultList,
  fetch_coreSettingsListBy_typeId,
  fetch_coreSettingsClassConfigurationListBy_instituteId,
  fetch_group_names_by_classConfigId
} from '../../utils/serviceUrl';
import { setOnlineClassRoutineList, setClassConfigList, setGroupList } from './actions';
import { makeSelectClassId } from './selectors';
import { SET_CLASS_ID } from './constants';

export function* fetch_ClassConfigListBy_InstituteId() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  const requestURL = BASE_URL_EM.concat(fetch_coreSettingsClassConfigurationListBy_instituteId).concat('?instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('onlineClassRoutineList-res', response);
  yield put(setClassConfigList(response.item));

}

export function* fetch_GroupListBy_ClassConfigId() {

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let emToken = JSON.parse(localStorage.getItem('emToken'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  let classConfigId = yield select(makeSelectClassId());

  const requestURL = BASE_URL_EM.concat(fetch_group_names_by_classConfigId).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + emToken.access_token,
    },
  };
  const response = yield call(request, requestURL, options);
  console.log('GroupList-res', response);
  yield put(setGroupList(response.item));

}

export default function* onlineClassRoutineSaga() {
  yield fetch_ClassConfigListBy_InstituteId();
  yield takeLatest(SET_CLASS_ID, fetch_GroupListBy_ClassConfigId)
}
