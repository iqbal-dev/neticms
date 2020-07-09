import { take, call, put, select } from 'redux-saga/effects';
import { BASE_URL_NETI_CMS, fetch_classList, fetch_groupList, fetch_seatInfoList } from '../../../utils/serviceUrl';
import request from '../../../utils/request';
import { getSeatInfoListData, getClassListData, getGroupListData } from './actions';

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

export function* get_classListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_classList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('CLASS info list', response);
    yield put(getClassListData(response.item));
  } catch (error) { }
};

export function* get_groupListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_groupList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('GROUP info list', response);
    yield put(getGroupListData(response.item));
  } catch (error) { }
};

export function* get_seatInfoListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_seatInfoList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('seat info list', response);
    yield put(getSeatInfoListData(response.item));
  } catch (error) { }
};

// Individual exports for testing
export default function* adminSeatInfoSaga() {
  yield get_classListData();
  yield get_groupListData();
  yield get_seatInfoListData();
}
