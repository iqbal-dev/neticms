/*
 *
 * OnlineClassRoutine reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_CLASS_LIST, SET_CLASS_ID, SET_GROUP_LIST, SET_GROUP_ID, SET_DATE, SET_ONLINE_CLASS_ROUTINE_LIST, SET_LOADER
} from './constants';

export const initialState = fromJS({
  classConfigList: [],
  classConfigId: '',
  groupList: [],
  groupId: '',
  onlineClassRoutineList: [],
  loader: '',
});

function onlineClassRoutineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_CLASS_LIST:
      return state.set('classConfigList', action.classConfigList);

    case SET_CLASS_ID:
      return state.set('classConfigId', action.classConfigId);

    case SET_GROUP_LIST:
      return state.set('groupList', action.groupList);

    case SET_GROUP_ID:
      return state.set('groupId', action.groupId);

    case SET_DATE:
      return state.set('date', action.date);

    case SET_ONLINE_CLASS_ROUTINE_LIST:
      return state.set('onlineClassRoutineList', action.onlineClassRoutineList);

    case SET_LOADER:
      return state.set('loader', action.loader);

    default:
      return state;
  }
}

export default onlineClassRoutineReducer;
