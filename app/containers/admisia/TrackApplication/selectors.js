import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trackApplication state domain
 */

const selectTrackApplicationDomain = state =>
  state.get('trackApplication', initialState);

/**
 * Other specific selectors
 */
const makeSelectRegistrationNo = () =>
  createSelector(selectTrackApplicationDomain, substate => substate.get('regNo'));

const makeSelectApplicantInfoList = () =>
  createSelector(selectTrackApplicationDomain, substate => substate.get('applicantInfoList'));

/**
 * Default selector used by TrackApplication
 */

const makeSelectTrackApplication = () =>
  createSelector(selectTrackApplicationDomain, substate => substate.toJS());

export default makeSelectTrackApplication;
export {
  selectTrackApplicationDomain,
  makeSelectRegistrationNo,
  makeSelectApplicantInfoList
};
