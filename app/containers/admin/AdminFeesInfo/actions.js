/*
 *
 * AdminFeesInfo actions
 *
 */

import { DEFAULT_ACTION, GET_FEES_INFO_LIST,SET_SAVE_ONCHANGE_FEE_NAME,SET_ROWDATA_TO_UPDATE_FORM,SET_MODAL_STATUS,
  RESET_FORM_DATA, GET_CLASS_INFO_LIST,GET_GROUP_INFO_LIST,SET_SAVE_ONCHANGE_SERIAL_NO,SET_SAVE_ONCHANGE_CLASS_LIST_VALUE,SET_SAVE_ONCHANGE_GROUP_LIST_VALUE, SET_SAVE_ONCHANGE_FEE_DETAILS,SET_SAVE_ONCHANGE_FEE_AMOUNT,GET_DATATABLE_ROWDATA,SET_SAVE_ONCHANGE_FEE_PAYMENT_MODE, 
  SET_SAVE_ONCHANGE_FEE_TYPE, SAVE_FEE_INFO, UPDATE_FEE_INFO } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getFeesInfoListData(feesInfoList) {
  return {
    type: GET_FEES_INFO_LIST,
    feesInfoList
  };
}

export function getClassInfoListData(classInfoList) {
  return {
    type: GET_CLASS_INFO_LIST,
    classInfoList
  };
}

export function getGroupInfoListData(groupInfoList) {
  return {
    type: GET_GROUP_INFO_LIST,
    groupInfoList
  };
}

export function setSerialNo(serialNo) {
  return {
    type: SET_SAVE_ONCHANGE_SERIAL_NO,
    serialNo
  };
}

export function setSelectedClassValue(selectedClass) {
  return {
    type: SET_SAVE_ONCHANGE_CLASS_LIST_VALUE,
    selectedClass
  };
}

export function setSelectedGroupValue(selectedGroup) {
  return {
    type: SET_SAVE_ONCHANGE_GROUP_LIST_VALUE,
    selectedGroup
  };
}

export function setFeeName(feeName) {
  return {
    type: SET_SAVE_ONCHANGE_FEE_NAME,
    feeName
  };
}


export function setFeeDetails(feeDetails) {
  return {
    type: SET_SAVE_ONCHANGE_FEE_DETAILS,
    feeDetails
  };
}

export function setFeeAmount(feeAmount) {
  return {
    type: SET_SAVE_ONCHANGE_FEE_AMOUNT,
    feeAmount
  };
}

export function setFeeType(feeType) {
  return {
    type: SET_SAVE_ONCHANGE_FEE_TYPE,
    feeType
  };
}

export function setFeePaymentMode(paymentMode) {
  return {
    type: SET_SAVE_ONCHANGE_FEE_PAYMENT_MODE,
    paymentMode
  };
}

export function setDatatableRowdata(rowData) {
  return {
    type: GET_DATATABLE_ROWDATA,
    rowData
  };
}

export function setRowdataToUpdateForm() {
  return {
    type: SET_ROWDATA_TO_UPDATE_FORM,
  };
}

export function resetFormData() {
  return {
    type: RESET_FORM_DATA,
  };
}




export function setFeeInfo() {
  return {
    type: SAVE_FEE_INFO,
  };
}

export function setUpdateFeeInfo() {
  return {
    type: UPDATE_FEE_INFO,
  };
}

export function setModalVisibleStatus() {
  return {
    type: SET_MODAL_STATUS,
  };
}
