import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  makeSelectAdminToken
} from '../../AdminLogin/selectors';

import {
  getFeesInfoListData, getClassInfoListData, getGroupInfoListData
} from './actions';

import {
  fetch_feesInfoList, BASE_URL_NETI_CMS, fetch_classList, fetch_groupList

} from '../../../utils/serviceUrl';

// Individual exports for testing

function adminCommonRequestOptions(){
  let adminToken = JSON.parse(localStorage.adminToken);
  console.log('adminToken', adminToken);

  const optionsGET = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
  };

  const optionsPOST = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
    body:{}
  };

  return {
    GET: optionsGET,
    POST: optionsPOST
  }
}

export function* get_feesInfoListData() {

  // let adminToken = yield select(makeSelectAdminToken());
  let adminToken = JSON.parse(localStorage.adminToken);

  console.log('adminToken', adminToken);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_feesInfoList);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
  };
  try {
    const response = yield call(request, requestURL, options);
    console.log('fees info list', response);
    yield put(getFeesInfoListData(response.item));
  } catch (error) { }
};

export function* get_classListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_classList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('fees info CLASS info list', response);
    // debugger

    yield put(getClassInfoListData(response.item));
    // debugger

  } catch (error) { }
};

export function* get_groupListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_groupList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('fees info  GROUP info list', response);
    yield put(getGroupInfoListData(response.item));
  } catch (error) { }
};

export default function* adminFeesInfoSaga() {
  yield get_feesInfoListData();
  yield get_classListData();
  yield get_groupListData();
}
