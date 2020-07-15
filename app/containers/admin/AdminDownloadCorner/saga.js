import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  BASE_URL_NETI_CMS,
  fetch_downloadCornerList
} from '../../../utils/serviceUrl';
import request from '../../../utils/request';
import { 
  getDownloadCornerListData, showDialog, makeChangeSerialValue, 
} from './actions';
import {
  SUBMIT_FORM_DATA, SET_DIALOG_TYPE, SET_HIDE_DIALOG
} from './constants'
import { 
  makeSelectDialogVisibility, 
  makeSelectSerialValue,
  makeSelectTitleValue,
  makeSelectUpdateRowData
} from './selectors';


function adminCommonRequestOptions(){
  let adminToken = JSON.parse(localStorage.adminToken);
  // console.log('adminToken', adminToken);

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

  const optionsPUT = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
    body:{}
  };

  const optionsDELETE = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken.access_token,
    },
    body:{}
  };

  return {
    GET: optionsGET,
    POST: optionsPOST,
    PUT: optionsPUT,
    DELETE: optionsDELETE,
  }
}

export function* get_downloadCornerListData() {
  const requestURL = BASE_URL_NETI_CMS + fetch_downloadCornerList;
  const requestOptions = adminCommonRequestOptions();

  try {
    const response = yield call(request, requestURL, requestOptions.GET);
    console.log('seat info list', response);
    yield put(getDownloadCornerListData(response.item));
  } catch (error) { }
};


export function* submitFormData() {
  let serialNo = yield select(makeSelectSerialValue());
  let title = yield select(makeSelectTitleValue());
  // let classValue = yield select(makeSelectClassValue());
  // let groupValue = yield select(makeSelectGroupValue());
  // let seatValue = yield select(makeSelectSeatValue());

  // let formDataType = yield select(makeSelectSubmitFormData());
  console.log("SerialNo", serialNo);
  console.log("title", title);
  // console.log("ClassValue", classValue);
  // console.log("GroupValue", groupValue);
  // console.log("SeatValue", seatValue);
  // console.log("formDataType", formDataType);

  if(formDataType == 'insert'){
  //   const requestURL = BASE_URL_NETI_CMS + fetch_seatInfoSave;
  //   const requestOptions = adminCommonRequestOptions();
  //   const postBody = JSON.stringify({
  //     seatSerial: serialNo,
  //     classId: classValue,
  //     groupId: groupValue,
  //     totalSeat: seatValue,
  //   })

  //   requestOptions.POST.body = postBody

  //   try {
  //     const response = yield call(request, requestURL, requestOptions.POST);
  //     console.log('seat info Save res', response);
  //     if(response.messageType == 1){
  //       yield get_seatInfoListData();
  //       yield setDialogHide()
  //     }
  //   }
  //   catch (error) {
  //     console.log("error", error);
  //   }
  }
  else if(formDataType == 'update'){
  //   const updateRowData = yield select(makeSelectUpdateRowData())

  //   const requestURL = BASE_URL_NETI_CMS + fetch_seatInfoUpdate;
  //   const requestOptions = adminCommonRequestOptions();
  //   const putBody = JSON.stringify({
  //     seatId: updateRowData.seatId,
  //     seatSerial: serialNo,
  //     classId: classValue,
  //     groupId: groupValue,
  //     totalSeat: seatValue,
  //   })

  //   requestOptions.PUT.body = putBody

  //   try {
  //     const response = yield call(request, requestURL, requestOptions.PUT);
  //     console.log('seat info UPDATE res', response);
  //     if(response.messageType == 1){
  //       yield get_seatInfoListData();
  //       yield setDialogHide()
  //     }
  //   }
  //   catch (error) {
  //     console.log("error", error);
  //   }
  }
  // else if(formDataType == 'delete'){
  //   const updateRowData = yield select(makeSelectUpdateRowData())

  //   const requestURL = BASE_URL_NETI_CMS + fetch_seatInfoDelete + "?seatId=" + updateRowData.seatId;
  //   const requestOptions = adminCommonRequestOptions();

  //   try {
  //     const response = yield call(request, requestURL, requestOptions.DELETE);
  //     console.log('seat info DELETE res', response);
  //     if(response.messageType == 1){
  //       yield get_seatInfoListData();
  //       yield setDialogHide()
  //     }
  //   }
  //   catch (error) {
  //     console.log("error", error);
  //   }
    
  // }
  
  
};


export function* getDialogViaibility() {
  const dialogTypeAndVisible = yield select(makeSelectDialogVisibility())

  if(dialogTypeAndVisible=='update'){
    const updateRowData = yield select(makeSelectUpdateRowData())

    yield put(makeChangeSerialValue(updateRowData.serial));
    // yield put(makeChangeClassValue(updateRowData.classId));
    // yield put(makeChangeGroupValue(updateRowData.groupId));
    // yield put(makeChangeSeatValue(updateRowData.totalSeat));

    // console.log("updateRowData", updateRowData);
  }
  else{
    yield put(makeChangeSerialValue(''));
    // yield put(makeChangeClassValue(''));
    // yield put(makeChangeGroupValue(''));
    // yield put(makeChangeSeatValue(''));
  }

  // console.log("dialog", dialogTypeAndVisible);
  let dialogObj = {
    dialogTypeAndVisible: dialogTypeAndVisible,
    visibility: true
  }

  yield put(showDialog(dialogObj));
  
};

export function* setDialogHide() {
  const dialogTypeAndVisible = yield select(makeSelectDialogVisibility())

  // console.log("dialog Hide", dialogTypeAndVisible);
  let dialogObj = {
    dialogTypeAndVisible: dialogTypeAndVisible,
    visibility: false
  }
    yield put(showDialog(dialogObj));
};

// Individual exports for testing
export default function* adminDownloadCornerSaga() {
  yield get_downloadCornerListData();

  yield takeLatest(SUBMIT_FORM_DATA, submitFormData);

  yield takeLatest(SET_DIALOG_TYPE, getDialogViaibility);
  yield takeLatest(SET_HIDE_DIALOG, setDialogHide);
}
