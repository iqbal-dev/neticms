import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CLASS_NAME_LIST, CLASS_NAME_SELECTED, CLASS_GROUP_NAME_DROPDOWN_LIST, SUBMIT_SEARCH_BUTTON } from './constants';
import { BASE_URL_EM, fetch_coreSettingsClassConfigurationListBy_instituteId, fetch_group_names_by_classConfigId, fetch_student_info_by_groupConfigId } from '../../utils/serviceUrl';
import request from '../../utils/request';
import { classNameListDropDown, classGroupListDropDown, searchResult, studentSearchResult} from './actions';
import { makeSelectClassNameSelected, makeSelectGroupNameSelected } from './selectors';

export function* fetch_className(){
  let token = JSON.parse(localStorage.getItem('emToken'));
  console.log('token', token);
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
  console.log('instituteId', instituteId);
  
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
    yield put(classNameListDropDown(response.item));
    console.log('response.item', response.item);
    
  } catch (error) { }

}

export function* fetch_studentGroupNames(){
  let classConfigId = yield select(makeSelectClassNameSelected());
  let token = JSON.parse(localStorage.getItem('emToken'));
  console.log('token', token);
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }
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
    yield put(classGroupListDropDown(response.item));
    console.log('Class Group response.item', response.item);
    
  } catch (error) { }

}

export function* fetch_studentInfo(){
  let token = JSON.parse(localStorage.getItem('emToken'));
  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let groupConfigId = yield select(makeSelectGroupNameSelected());
  let classConfigId = yield select(makeSelectClassNameSelected());
  console.log('groupConfigId', groupConfigId);
  
  let instituteId = '';
  { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

  const requestURL = BASE_URL_EM.concat(fetch_student_info_by_groupConfigId).concat('?classConfigId=').concat(classConfigId).concat('&instituteId=').concat(instituteId);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.access_token,
    },
  };

  try{
    const response = yield call(request, requestURL, options);
  yield put(studentSearchResult(response.item));

  }catch(error){}
  
  
}

// Individual exports for testing
export default function* studentInfoSaga() {
  yield fetch_className();
  yield takeLatest(CLASS_NAME_SELECTED, fetch_studentGroupNames);
  yield takeLatest(SUBMIT_SEARCH_BUTTON, fetch_studentInfo)
  // See example in containers/HomePage/saga.js
}
