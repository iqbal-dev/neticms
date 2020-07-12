/*
 *
 * AdminSyllabus reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_SYLLABUS_INFO_LIST, SET_CLASS_LIST, SET_CLASS_ID, SET_GROUP_LIST, SET_GROUP_ID,
  SET_UPLOAD_FILE, SET_ROW_DATA, SET_DIALOG_VISIBLE_STATUS,
} from './constants';

export const initialState = fromJS({
  syllabusList: '',
  classList: '',
  classId: '',
  groupList: '',
  groupId: '',
  file: '',
  rowData: '',
  dialogVisible: false,
});

function adminSyllabusReducer(state = initialState, action) {
  switch (action.type) {

    case SET_SYLLABUS_INFO_LIST:
      return state.set('syllabusList', action.syllabusList);

    case SET_CLASS_LIST:
      return state.set('classList', action.classList);

    case SET_CLASS_ID:
      return state.set('classId', action.classId);

    case SET_GROUP_LIST:
      return state.set('groupList', action.groupList);

    case SET_GROUP_ID:
      return state.set('groupId', action.groupId);

    case SET_UPLOAD_FILE:
      return state.set('file', action.file);

    case SET_ROW_DATA:
      return state.set('rowData', action.rowData);

    case SET_DIALOG_VISIBLE_STATUS:
      return state.set('dialogVisible', !state.get('dialogVisible'));

    default:
      return state;
  }
}

export default adminSyllabusReducer;
