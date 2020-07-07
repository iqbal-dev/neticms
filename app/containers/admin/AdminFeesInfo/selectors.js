import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminFeesInfo state domain
 */

const selectAdminFeesInfoDomain = state =>
  state.get('adminFeesInfo', initialState);

  const makeSelectFeesInfoListData = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('feesInfoList'));

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminFeesInfo
 */

const makeSelectAdminFeesInfo = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.toJS());

export default makeSelectAdminFeesInfo;
export { selectAdminFeesInfoDomain,
  makeSelectFeesInfoListData
 };
