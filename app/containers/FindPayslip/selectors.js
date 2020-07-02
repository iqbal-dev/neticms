import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findPayslip state domain
 */

const selectFindPayslipDomain = state => state.get('findPayslip', initialState);

/**
 * Other specific selectors
 */
const makeSelectTabPanelStatus = () =>
createSelector(selectFindPayslipDomain, substate => substate.get('activeTab'));

const makeSelectAcademicYearList = () =>
  createSelector(selectFindPayslipDomain, substate => substate.get('yearList'));

const makeSelectAcademicYear = () =>
  createSelector(selectFindPayslipDomain, substate => substate.get('acYear'));

const makeSelectStudentID = () =>
  createSelector(selectFindPayslipDomain, substate => substate.get('stdID'));

const makeSelectFindPayslipData = () =>
  createSelector(selectFindPayslipDomain, substate => substate.get('paySlipListData'));

// const setPaySlipListData = () =>
//   createSelector(selectFindPayslipDomain, substate => substate.get('payslipListData'));

/**
 * Default selector used by FindPayslip
 */

const makeSelectFindPayslip = () =>
  createSelector(selectFindPayslipDomain, substate => substate.toJS());

export default makeSelectFindPayslip;
export { selectFindPayslipDomain,
  makeSelectTabPanelStatus,
  makeSelectAcademicYearList,
  makeSelectAcademicYear,
  makeSelectStudentID,
  makeSelectFindPayslipData,
  // setPaySlipListData
};
