import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminFeesInfo state domain
 */

const selectAdminFeesInfoDomain = state =>
  state.get('adminFeesInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminFeesInfo
 */

const makeSelectAdminFeesInfo = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.toJS());

export default makeSelectAdminFeesInfo;
export { selectAdminFeesInfoDomain };
