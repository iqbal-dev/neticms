import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import {
  fetch_dressInfoList, BASE_URL_NETI_CMS, save_newDressInfo

} from '../../../utils/serviceUrl';
import { getDressInfoListData, setModalVisibleStatus } from './actions';
import { SAVE_DRESS_INFO, RESET_FORM_DATA } from './constants';
import { makeSelectClassRange, makeSelectDressCodeDetails, makeSelectDressCodeImage, makeSelectSerialNo, makeSelectGender } from './selectors';

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


export function* get_dressInfoListData() {

  // let adminToken = yield select(makeSelectAdminToken());
  let adminToken = JSON.parse(localStorage.adminToken);

  console.log('adminToken', adminToken);

  const requestURL = BASE_URL_NETI_CMS.concat(fetch_dressInfoList);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
  };
  try {
    const response = yield call(request, requestURL, options);
    yield put(getDressInfoListData(response.item));
  } catch (error) { }
};


export function* reset_formFieldData() {
  yield put(setSelectedGenderValue());
  yield put(setClassRange());
  yield put(setDressCodeDetails());
  yield put(setDressCodeImage());
  yield put(setSerialNo());
}

export function* submit_feeInfo() {
  let adminToken = JSON.parse(localStorage.adminToken);

  let requestObj = {
    "classRange": yield select(makeSelectClassRange()),
    "dressDetails": yield select(makeSelectDressCodeDetails()),
    "dressImageName": yield select(makeSelectDressCodeImage()),
    "dressSerial": yield select(makeSelectSerialNo()),
    "gender": yield select(makeSelectGender()),
  }

  
  const requestURL = BASE_URL_NETI_CMS.concat(save_newDressInfo);
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

export default function* adminDressInfoSaga() {
  yield get_dressInfoListData();
  yield takeLatest(SAVE_DRESS_INFO, submit_dressCodeInfo);
  yield takeLatest(RESET_FORM_DATA, reset_formFieldData);


}
