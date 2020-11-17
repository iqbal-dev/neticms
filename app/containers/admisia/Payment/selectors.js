import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the payment state domain
 */

const selectPaymentDomain = state => state.get('payment', initialState);

/**
 * Other specific selectors
 */

const makeSelectRegistrationNo = () =>
  createSelector(selectPaymentDomain, substate => substate.get('regNo'));

const makeSelectApplicantInfoList = () =>
  createSelector(selectPaymentDomain, substate => substate.get('applicantInfos'));

const makeSelectApplicantInfoMsgType = () =>
  createSelector(selectPaymentDomain, substate => substate.get('msgType'));

const makeSelectLoader = () =>
  createSelector(selectPaymentDomain, substate => substate.get('loaderType'));

/**
 * Default selector used by Payment
 */

const makeSelectPayment = () =>
  createSelector(selectPaymentDomain, substate => substate.toJS());

export default makeSelectPayment;
export {
  selectPaymentDomain,
  makeSelectRegistrationNo,
  makeSelectApplicantInfoList,
  makeSelectApplicantInfoMsgType,
  makeSelectLoader,
};
