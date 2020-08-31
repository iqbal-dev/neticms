import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionWiseAttendance state domain
 */

const selectSectionWiseAttendanceDomain = state =>
  state.get('sectionWiseAttendance', initialState);

// const makeSelectSectionWiseAttendance = () =>
//   createSelector(selectSectionWiseAttendanceDomain, substate =>
//     substate.toJS(),
//   );

const makeSelectDate = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate => substate.get('date'));

const makeSelectStdAttendanceList = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate => substate.get('stdAttendanceList'));

const makeSelectChartDataArray = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate => substate.get('chartDataArray'));

const makeSelectLoaderStatus = () =>
  createSelector(selectSectionWiseAttendanceDomain, substate => substate.get('loaderStatus'));

// export default makeSelectSectionWiseAttendance;
export {
  selectSectionWiseAttendanceDomain,
  makeSelectDate,
  makeSelectStdAttendanceList,
  makeSelectChartDataArray,
  makeSelectLoaderStatus
};
