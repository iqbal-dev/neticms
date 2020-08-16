import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feesInfo state domain
 */

const selectFeesInfoDomain = state => state.get('feesInfo', initialState);

const makeSelectClassList = () =>
  createSelector(selectFeesInfoDomain, substate => substate.get('classList'));

const makeSelectFeesInfoList = () =>
  createSelector(selectFeesInfoDomain, substate => substate.get('feesInfoList'));

const makeSelectOnchangeClassValue = () =>
  createSelector(selectFeesInfoDomain, substate => substate.get('classValue'));

const makeSelectLoaderType = () =>
  createSelector(selectFeesInfoDomain, substate => substate.get('loaderType'));

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeesInfo
 */

const makeSelectFeesInfo = () =>
  createSelector(selectFeesInfoDomain, substate => substate.toJS());

export default makeSelectFeesInfo;
export {
  selectFeesInfoDomain, makeSelectClassList, makeSelectOnchangeClassValue,
  makeSelectFeesInfoList, makeSelectLoaderType
};
