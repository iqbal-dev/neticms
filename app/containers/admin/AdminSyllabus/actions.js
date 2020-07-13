/*
 *
 * AdminSyllabus actions
 *
 */

import {
  SET_SYLLABUS_INFO_LIST, SET_CLASS_LIST, SET_CLASS_ID, SET_GROUP_LIST, SET_GROUP_ID,
  SET_UPLOAD_FILE, SET_ROW_DATA, SET_DIALOG_VISIBLE_STATUS, SUBMIT_SAVE, SUBMIT_UPDATE,
  SUBMIT_DELETE,
} from './constants';

export function setSyllabusInfoList(syllabusList) {
  return {
    type: SET_SYLLABUS_INFO_LIST, syllabusList
  };
}

export function setClassList(classList) {
  return {
    type: SET_CLASS_LIST, classList
  };
}

export function setClassId(classId) {
  return {
    type: SET_CLASS_ID, classId,
  };
}

export function setGroupList(groupList) {
  return {
    type: SET_GROUP_LIST, groupList
  };
}

export function setGroupId(groupId) {
  return {
    type: SET_GROUP_ID, groupId,
  };
}

export function setUploadFile(file) {
  return {
    type: SET_UPLOAD_FILE, file
  };
}

export function setRowData(rowData) {
  return {
    type: SET_ROW_DATA, rowData
  };
}

export function setDialogVisibleStatus() {
  return { type: SET_DIALOG_VISIBLE_STATUS, };
}

export function submitSave() {
  return { type: SUBMIT_SAVE, };
}

export function submitUpdate() {
  return { type: SUBMIT_UPDATE, };
}

export function submitDelete() {
  return { type: SUBMIT_DELETE };
}
