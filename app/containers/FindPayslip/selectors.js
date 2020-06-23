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

/**
 * Default selector used by FindPayslip
 */

const makeSelectFindPayslip = () =>
  createSelector(selectFindPayslipDomain, substate => substate.toJS());

export default makeSelectFindPayslip;
export { selectFindPayslipDomain,
  makeSelectTabPanelStatus,
};
