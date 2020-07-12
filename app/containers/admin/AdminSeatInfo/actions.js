/*
 *
 * AdminSeatInfo actions
 *
 */

import { 
  DEFAULT_ACTION, 
  
  GET_CLASS_LIST,
  GET_GROUP_LIST,
  GET_SEAT_INFO_LIST,

  SET_SERIAL_VALUE,
  SET_CLASS_VALUE,
  SET_GROUP_VALUE, 
  SET_SEAT_VALUE,

  SUBMIT_FORM_DATA,

  SET_DIALOG_TYPE,
  SET_SHOW_DIALOG,
  SET_HIDE_DIALOG,
  SET_UPDATE_ROW_DATA
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getClassListData(classList) {
  return {
    type: GET_CLASS_LIST,
    classList
  };
}

export function getGroupListData(groupList) {
  return {
    type: GET_GROUP_LIST,
    groupList
  };
}

export function getSeatInfoListData(seatInfoList) {
  return {
    type: GET_SEAT_INFO_LIST,
    seatInfoList
  };
}

export function makeChangeSerialValue(serialValue) {
  // console.log("Action -> ",serialValue)
  return {
    type: SET_SERIAL_VALUE,
    serialValue
  };
}

export function makeChangeClassValue(classValue) {
  return {
    type: SET_CLASS_VALUE,
    classValue
  };
}

export function makeChangeGroupValue(groupValue) {
  return {
    type: SET_GROUP_VALUE,
    groupValue
  };
}

export function makeChangeSeatValue(seatValue) {
  return {
    type: SET_SEAT_VALUE,
    seatValue
  };
}

export function makeSubmitFormData(submitFormData) {
  // console.log("submitFormData", submitFormData);
  
  return {
    type: SUBMIT_FORM_DATA,
    submitFormData
  };
}

export function setDialogVisible(dialogType) {
  return {
    type: SET_DIALOG_TYPE,
    dialogType
  };
}

export function showDialog(dialogVisible) {
  // console.log("ACRION", dialogVisible);
  
  return {
    type: SET_SHOW_DIALOG,
    dialogVisible
  };
}

export function setDialogHide() {
  return {
    type: SET_HIDE_DIALOG
  };
}

export function setUpdateRowData(rowData) {
  return {
    type: SET_UPDATE_ROW_DATA,
    rowData
  };
}



// setUpdateRowData


