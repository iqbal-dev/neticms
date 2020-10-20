import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the onlineAdmission state domain
 */

const selectOnlineAdmissionDomain = state =>
  state.get('onlineAdmission', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OnlineAdmission
 */

const makeSelectOnlineAdmission = () =>
  createSelector(selectOnlineAdmissionDomain, substate => substate.toJS());

const makeSelectClassConfigList = () =>
  createSelector(selectOnlineAdmissionDomain, substate => substate.get('classConfigObj'));

const makeSelectDataTableLoader = () =>
  createSelector(selectOnlineAdmissionDomain, substate => substate.get('dataTableLoader'));

export default makeSelectOnlineAdmission;
export { 
  selectOnlineAdmissionDomain,
  makeSelectClassConfigList,
  makeSelectDataTableLoader
 };
