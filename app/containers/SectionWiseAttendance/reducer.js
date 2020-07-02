/*
 *
 * SectionWiseAttendance reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ON_CHANGE_DATE, SET_SECTION_WISE_ATTENDANCE_LIST_DATA } from './constants';

export const initialState = fromJS({});

function sectionWiseAttendanceReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ON_CHANGE_DATE:
      return state.set('date', action.date);

    case SET_SECTION_WISE_ATTENDANCE_LIST_DATA:
      return state.set('attendanceListData', action.attendanceListData);

    default:
      return state;
  }
}

export default sectionWiseAttendanceReducer;
