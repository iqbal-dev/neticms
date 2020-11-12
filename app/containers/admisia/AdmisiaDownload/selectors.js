import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the admisiaDownload state domain
 */

const selectAdmisiaDownloadDomain = state =>
  state.get('admisiaDownload', initialState);

/**
 * Other specific selectors
 */
const makeSelectRegistrationNo = () =>
  createSelector(selectAdmisiaDownloadDomain, substate => substate.get('regNo'));

const makeSelectApplicantInfoList = () =>
  createSelector(selectAdmisiaDownloadDomain, substate => substate.get('applicantInfoList'));

const makeSelectMessage = () =>
  createSelector(selectAdmisiaDownloadDomain, substate => substate.get('message'));

const makeSelectLoader = () =>
  createSelector(selectAdmisiaDownloadDomain, substate => substate.get('loader'));

/**
 * Default selector used by AdmisiaDownload
 */

const makeSelectAdmisiaDownload = () =>
  createSelector(selectAdmisiaDownloadDomain, substate => substate.toJS());

export default makeSelectAdmisiaDownload;
export {
  selectAdmisiaDownloadDomain,
  makeSelectRegistrationNo,
  makeSelectApplicantInfoList,
  makeSelectMessage,
  makeSelectLoader,
};
