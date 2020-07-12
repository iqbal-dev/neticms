import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  makeSelectAdminToken
} from '../../AdminLogin/selectors';
import makeSelectAdminFeesInfo, {makeSelectFeesInfoListData, makeSelectClassInfoListData,
   makeSelectGroupInfoListData, makeSelectSerialNo, makeSelectPaymentMode,
    makeSelectClass, makeSelectGroup, makeSelectFeeDetails, makeSelectFeeName,makeSelectDatatableRowdata,
     makeSelectFeeAmount,makeSelectFeeType} from './selectors';


import {
  getFeesInfoListData, getClassInfoListData, getGroupInfoListData,
  setSerialNo,setSelectedClassValue, setFeeAmount,setFeeName, setFeePaymentMode, setFeeType, setSelectedGroupValue, setFeeDetails,setModalVisibleStatus,
} from './actions';

import {
  fetch_feesInfoList, BASE_URL_NETI_CMS, fetch_classList, fetch_groupList,save_newFeeInfo,update_newFeeInfo

} from '../../../utils/serviceUrl';
import { DEFAULT_ACTION, GET_FEES_INFO_LIST,SET_SAVE_ONCHANGE_FEE_NAME,GET_CLASS_INFO_LIST,GET_GROUP_INFO_LIST,SET_SAVE_ONCHANGE_SERIAL_NO,SET_SAVE_ONCHANGE_CLASS_LIST_VALUE,SET_SAVE_ONCHANGE_GROUP_LIST_VALUE, SET_SAVE_ONCHANGE_FEE_DETAILS,SET_SAVE_ONCHANGE_FEE_AMOUNT, SET_SAVE_ONCHANGE_FEE_TYPE,SET_ROWDATA_TO_UPDATE_FORM,GET_DATATABLE_ROWDATA,RESET_FORM_DATA, SAVE_FEE_INFO, UPDATE_FEE_INFO } from './constants';


// Individual exports for testing

function adminCommonRequestOptions(){
  let adminToken = JSON.parse(localStorage.adminToken);

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
    yield put(getFeesInfoListData(response.item));
  } catch (error) { }
};

export function* get_classListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_classList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    yield put(getClassInfoListData(response.item));

  } catch (error) { }
};

export function* get_groupListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_groupList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    yield put(getGroupInfoListData(response.item));
  } catch (error) { }
};

export function* submit_feeInfo() {
  let adminToken = JSON.parse(localStorage.adminToken);

  let requestObj = {
    "classId": yield select(makeSelectClass()),
    "feeAmount": yield select(makeSelectFeeAmount()),
    "feeName": yield select(makeSelectFeeName()),
    "feePaymentMode": yield select(makeSelectPaymentMode()),
    "feeSerial": yield select(makeSelectSerialNo()),
    "feeType": yield select(makeSelectFeeType()),
    "groupId": yield select(makeSelectGroup())

  }

  
  const requestURL = BASE_URL_NETI_CMS.concat(save_newFeeInfo);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
    body: JSON.stringify(requestObj)
  };

  const response = yield call(request, requestURL, options);
  try {
    if(response.messageType == 1) {
      yield put(setModalVisibleStatus());
    }
  } catch (error) { }
}

export function* update_feeInfo() {
  let adminToken = JSON.parse(localStorage.adminToken);
  let rowData =  yield select(makeSelectDatatableRowdata());


  let requestObj = {
    "classId": yield select(makeSelectClass()),
    "feeAmount": yield select(makeSelectFeeAmount()),
    "feeName": yield select(makeSelectFeeName()),
    "feePaymentMode": yield select(makeSelectPaymentMode()),
    "feeSerial": yield select(makeSelectSerialNo()),
    "feeType": yield select(makeSelectFeeType()),
    "groupId": yield select(makeSelectGroup()),
    "feeId": rowData.feeId
  }

  
  const requestURL = BASE_URL_NETI_CMS.concat(update_newFeeInfo);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
    body: JSON.stringify(requestObj)
  };

  const response = yield call(request, requestURL, options);
  try {
    if(response.messageType == 1) {
      yield put(setModalVisibleStatus());
    }
  } catch (error) { }
}

export function* get_rowdata_to_update_form() {
  let rowData =  yield select(makeSelectDatatableRowdata());
  yield put(setSelectedClassValue(rowData.classId));
  yield put(setFeeAmount(rowData.feeAmount));
  yield put(setFeeName(rowData.feeName));
  yield put(setFeePaymentMode(rowData.feePaymentMode));
  yield put(setSerialNo(rowData.feeSerial));
  yield put(setFeeType(rowData.feeType));
  yield put(setSelectedGroupValue(rowData.groupId));
  yield put(setFeeDetails(rowData.feeDetails));
}

export function* reset_formFieldData() {
  yield put(setSelectedClassValue());
  yield put(setFeeAmount());
  yield put(setFeeName());
  yield put(setFeePaymentMode());
  yield put(setSerialNo());
  yield put(setFeeType());
  yield put(setSelectedGroupValue());
  yield put(setFeeDetails());
}




export default function* adminFeesInfoSaga() {
  yield get_feesInfoListData();
  yield get_classListData();
  yield get_groupListData();
  yield takeLatest(SAVE_FEE_INFO, submit_feeInfo);
  yield takeLatest(GET_DATATABLE_ROWDATA, get_rowdata_to_update_form);
  yield takeLatest(RESET_FORM_DATA, reset_formFieldData);
  yield takeLatest(UPDATE_FEE_INFO, update_feeInfo);




}
