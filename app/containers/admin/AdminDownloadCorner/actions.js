/*
 *
 * AdminDownloadCorner actions
 *
 */

import { 
  DEFAULT_ACTION, 

  GET_DOWNLOAD_CORNER_LIST,
  SET_DIALOG_TYPE,
  SET_SHOW_DIALOG,
  SET_HIDE_DIALOG,
  SET_UPDATE_ROW_DATA,
  SET_SERIAL_VALUE,
  SET_TITLE_VALUE,
  SUBMIT_FORM_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDownloadCornerListData(downloadCornerList) {
  return {
    type: GET_DOWNLOAD_CORNER_LIST,
    downloadCornerList
  };
}

export function makeChangeSerialValue(serialValue) {
  // console.log("Action -> ",serialValue)
  return {
    type: SET_SERIAL_VALUE,
    serialValue
  };
}

export function makeChangeTitleValue(titleValue) {
  // console.log("Action -> ",serialValue)
  return {
    type: SET_TITLE_VALUE,
    titleValue
  };
}

// makeChangeTitleValue

export function makeSubmitFormData(submitFormData) {
  // console.log("submitFormData", submitFormData);
  
  return {
    type: SUBMIT_FORM_DATA,
    submitFormData
  };
}


export function setDialogVisible(dialogType) {
  console.log("ACRION", dialogType);
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



//makeChangeSerialValue
