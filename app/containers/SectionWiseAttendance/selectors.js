import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionWiseAttendance state domain
 */

const selectSectionWiseAttendanceDomain = state =>
  state.get('sectionWiseAttendance', initialState);

const makeSelectSectionWiseAttendance = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate =>
    substate.toJS(),
  );

const makeSelectDate = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate => substate.get('date'));

const makeSelectSectionWiseAttendanceData = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate => substate.get('attendanceListData'));

export default makeSelectSectionWiseAttendance;
export { 
  selectSectionWiseAttendanceDomain,
  makeSelectDate,
  makeSelectSectionWiseAttendanceData
 };
