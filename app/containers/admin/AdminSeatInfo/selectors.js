import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSeatInfo state domain
 */

const selectAdminSeatInfoDomain = state =>
  state.get('adminSeatInfo', initialState);

  // List Data
const makeSelectClassList = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('classList'));

const makeSelectGroupList = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('groupList'));

const makeSelectSeatInfoList = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('seatInfoList'));



  makeSelectClassList
/**
 * Default selector used by AdminSeatInfo
 */

const makeSelectAdminSeatInfo = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.toJS());

export default makeSelectAdminSeatInfo;
export { 
  selectAdminSeatInfoDomain,
  // List Data
  makeSelectClassList,
  makeSelectGroupList,
  makeSelectSeatInfoList,
 };
