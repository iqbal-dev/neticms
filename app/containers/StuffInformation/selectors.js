import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the stuffInformation state domain
 */

const selectStuffInformationDomain = state =>
  state.get('stuffInformation', initialState);

/**
 * Other specific selectors
 */

const makeSelectStuffInfoList = () =>
  createSelector(selectStuffInformationDomain, substate => substate.get('staffInfoList'));


  const makeSelectStuffRowData = () =>
  createSelector(selectStuffInformationDomain, substate => substate.get('stuffRowData'));


  

/**
 * Default selector used by StuffInformation
 */

const makeSelectStuffInformation = () =>
  createSelector(selectStuffInformationDomain, substate => substate.toJS());

export default makeSelectStuffInformation;
export {
  selectStuffInformationDomain,
  makeSelectStuffInfoList,
  makeSelectStuffRowData
};
