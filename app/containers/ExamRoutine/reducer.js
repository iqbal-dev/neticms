/*
 *
 * ExamRoutine reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import { 
  SET_CLASS_LIST, 
  SET_EXAM_TYPE_LIST, 
  SET_ON_CHANGE_CLASS_ID,
  SET_ON_CHANGE_EXAM_TYPE_ID,
  SET_ON_CHANGE_EXAM_SESSION_ID,
  SET_EXAM_ROUTINE_LIST_DATA, 
  SET_DATA_TABLE_LOADER, 
  SET_CLASS_LOADER,
  SET_EXAM_TYPE_LOADER,
  SET_EXAM_SESSION_LOADER,
  SET_EXAM_SESSION_LIST
} from './constants';

export const initialState = fromJS({
  classList: [],
  ExamTypeList: [],
  examSessionList: [],
  classId: '',
  examTypeId: '',
  examSessionId: '',
  examRoutineListData: [],
  dataTableLoader: false,
  classLoader: false,
  examTypeLoader: false,
  examSessionLoader: false,
});

function examRoutineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_CLASS_LIST:
      return state.set('classList', action.classList);

    case SET_EXAM_TYPE_LIST:
      return state.set('examTypeList', action.examTypeList);

    case SET_EXAM_SESSION_LIST:
      return state.set('examSessionList', action.examSessionList);
      
    case SET_ON_CHANGE_CLASS_ID:
      return state.set('classId', action.classId);

    case SET_ON_CHANGE_EXAM_TYPE_ID:
      return state.set('examTypeId', action.examTypeId);

    case SET_ON_CHANGE_EXAM_SESSION_ID:
      return state.set('examSessionId', action.examSessionId);

    case SET_EXAM_ROUTINE_LIST_DATA:
      return state.set('examRoutineListData', action.examRoutineListData);

    case SET_DATA_TABLE_LOADER:
      return state.set('dataTableLoader', action.dataTableLoader);

    case SET_CLASS_LOADER:
      return state.set('classLoader', action.classLoader);

    case SET_EXAM_TYPE_LOADER:
      return state.set('examTypeLoader', action.examTypeLoader);

    case SET_EXAM_SESSION_LOADER:
      return state.set('examSessionLoader', action.examSessionLoader);
    
      
    default:
      return state;
  }
}

export default examRoutineReducer;
