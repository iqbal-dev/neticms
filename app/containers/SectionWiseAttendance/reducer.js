/*
 *
 * SectionWiseAttendance reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ON_CHANGE_DATE, SET_ATTENDANCE_LIST, SET_CHART_DATA, SET_LOADER } from './constants';

export const initialState = fromJS({
  stdAttendanceList: [],
  date: '',
  loaderStatus: '',
});

function sectionWiseAttendanceReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ON_CHANGE_DATE:
      return state.set('date', action.date);

    case SET_ATTENDANCE_LIST:
      return state.set('stdAttendanceList', action.dataList);

    case SET_CHART_DATA:
      return state.set('chartDataArray', action.dataArray);


    case SET_LOADER:
      return state.set('loaderStatus', action.loaderStatus);

    default:
      return state;
  }
}

export default sectionWiseAttendanceReducer;
