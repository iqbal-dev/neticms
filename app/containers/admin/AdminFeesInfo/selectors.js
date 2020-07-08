import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminFeesInfo state domain
 */

const selectAdminFeesInfoDomain = state =>
  state.get('adminFeesInfo', initialState);

  const makeSelectFeesInfoListData = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('feesInfoList'));

  const makeSelectClassInfoListData = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('classInfoList'));

  const makeSelectGroupInfoListData = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('groupInfoList'));

  const makeSelectSerialNo = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('serialNo'));

  const makeSelectClass = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('selectedClass'));

  const makeSelectGroup = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('selectedGroup'));

  const makeSelectFeeName = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('feeName'));

  const makeSelectFeeDetails = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('feeDetails'));

  const makeSelectFeeAmount = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('feeAmount'));

  const makeSelectFeeType = () =>
  createSelector(selectAdminFeesInfoDomain, substate => substate.get('feeType'));


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
  makeSelectFeesInfoListData,
  makeSelectSerialNo,
  makeSelectClass,
  makeSelectGroup,
  makeSelectFeeName,
  makeSelectFeeDetails,
  makeSelectFeeAmount,
  makeSelectFeeType,
  makeSelectClassInfoListData,
  makeSelectGroupInfoListData
 };
