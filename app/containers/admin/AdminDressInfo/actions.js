/*
 *
 * AdminDressInfo actions
 *
 */

import { DEFAULT_ACTION, GET_DRESS_INFO_LIST,SET_SAVE_ONCHANGE_SERIAL_NO, GET_GENDER_INFO_LIST, SET_SAVE_ONCHANGE_CLASS_RANGE, SET_SAVE_ONCHANGE_DETAILS, SET_SAVE_ONCHANGE_IMAGE, SET_SAVE_ONCHANGE_GENDER_LIST_VALUE, RESET_FORM_DATA, GET_DATATABLE_ROWDATA, SAVE_DRESS_INFO, UPDATE_DRESS_INFO, SET_MODAL_STATUS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDressInfoListData(dressInfoList) {
  return {
    type: GET_DRESS_INFO_LIST,
    dressInfoList
  };
}

export function setSerialNo(serialNo) {
  return {
    type: SET_SAVE_ONCHANGE_SERIAL_NO,
    serialNo
  };
}


export function getGenderInfoListData(genderInfoList) {
  return {
    type: GET_GENDER_INFO_LIST,
    genderInfoList
  };
}

export function setSelectedGenderValue(selectedGender) {
  return {
    type: SET_SAVE_ONCHANGE_GENDER_LIST_VALUE,
    selectedGender
  };
}


export function setClassRange(classRange) {
  return {
    type: SET_SAVE_ONCHANGE_CLASS_RANGE,
    classRange
  };
}

export function setDressCodeDetails(dressCodeDetails) {
  return {
    type: SET_SAVE_ONCHANGE_DETAILS,
    dressCodeDetails
  };
}

export function setDressCodeImage(dressCodeImage) {
  return {
    type: SET_SAVE_ONCHANGE_IMAGE,
    dressCodeImage
  };
}


export function resetFormData() {
  return {
    type: RESET_FORM_DATA,
  };
}

export function setDatatableRowdata(rowData) {
  return {
    type: GET_DATATABLE_ROWDATA,
    rowData
  };
}

export function setDressCodeInfo() {
  return {
    type: SAVE_DRESS_INFO,
  };
}

export function setUpdateDressCodeInfo() {
  return {
    type: UPDATE_DRESS_INFO,
  };
}

export function setModalVisibleStatus() {
  return {
    type: SET_MODAL_STATUS,
  };
}


