import { 
  SET_CLASS_LIST, 
  SET_EXAM_TYPE_LIST,
  SET_EXAM_SESSION_LIST,

  SET_ON_CHANGE_CLASS_ID,
  SET_ON_CHANGE_EXAM_TYPE_ID,
  SET_ON_CHANGE_EXAM_SESSION_ID,
  SUBMIT_SEARCH_BUTTON,
  SET_EXAM_ROUTINE_LIST_DATA,

  SET_DATA_TABLE_LOADER,
  SET_CLASS_LOADER,
  SET_EXAM_TYPE_LOADER,
  SET_EXAM_SESSION_LOADER
} from './constants';
/*
 *
 * ExamRoutine actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setClassList(classList) {
  return {
    type: SET_CLASS_LIST,
    classList,
  };
}

export function setExamTypeList(examTypeList) {
  return {
    type: SET_EXAM_TYPE_LIST,
    examTypeList,
  };
}

export function setExamSessionList(examSessionList) {
  return {
    type: SET_EXAM_SESSION_LIST,
    examSessionList,
  };
}

export function setClassId(classId) {
  return {
    type: SET_ON_CHANGE_CLASS_ID,
    classId
  };
}

export function setExamTypeId(examTypeId) {
  // console.log(examTypeId);
  return {
    type: SET_ON_CHANGE_EXAM_TYPE_ID,
    examTypeId
  };
}

export function setExamSessionId(examSessionId) {
  // console.log(setExamSessionId);
  return {
    type: SET_ON_CHANGE_EXAM_SESSION_ID,
    examSessionId
  };
}
// 

export function submitSearchHandle() {
  return {
    type: SUBMIT_SEARCH_BUTTON,
  };
}

export function setExamRoutineListData(examRoutineListData) {
  return {
    type: SET_EXAM_ROUTINE_LIST_DATA,
    examRoutineListData,
  };
}

export function setDataTableLoader(dataTableLoader) {
  return {
    type: SET_DATA_TABLE_LOADER,
    dataTableLoader,
  };
}

export function setClassLoader(classLoader) {
  return {
    type: SET_CLASS_LOADER,
    classLoader,
  };
}

export function setExamTypeLoader(examTypeLoader) {
  return {
    type: SET_EXAM_TYPE_LOADER,
    examTypeLoader,
  };
}

export function setExamSessionLoader(examSessionLoader) {
  return {
    type: SET_EXAM_SESSION_LOADER,
    examSessionLoader,
  };
}
