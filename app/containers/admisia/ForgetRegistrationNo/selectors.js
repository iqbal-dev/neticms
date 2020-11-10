import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgetRegistrationNo state domain
 */

const selectForgetRegistrationNoDomain = state =>
  state.get('forgetRegistrationNo', initialState);

/**
 * Other specific selectors
 */
const makeSelectMobileNo = () =>
  createSelector(selectForgetRegistrationNoDomain, substate => substate.get('mobileNo'));

const makeSelectApplicantInfoList = () =>
  createSelector(selectForgetRegistrationNoDomain, substate => substate.get('applicantInfoList'));

const makeSelectCommitteeloaderType = () =>
  createSelector(selectForgetRegistrationNoDomain, substate => substate.get('loaderType'));

const makeSelectMessage = () =>
  createSelector(selectForgetRegistrationNoDomain, substate => substate.get('message'));

/**
 * Default selector used by ForgetRegistrationNo
 */

const makeSelectForgetRegistrationNo = () =>
  createSelector(selectForgetRegistrationNoDomain, substate => substate.toJS());

export default makeSelectForgetRegistrationNo;
export {
  selectForgetRegistrationNoDomain,
  makeSelectMobileNo,
  makeSelectApplicantInfoList,
  makeSelectCommitteeloaderType,
  makeSelectMessage
};
