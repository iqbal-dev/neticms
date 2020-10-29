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

/**
 * Default selector used by AdmisiaDownload
 */

const makeSelectAdmisiaDownload = () =>
  createSelector(selectAdmisiaDownloadDomain, substate => substate.toJS());

export default makeSelectAdmisiaDownload;
export { selectAdmisiaDownloadDomain };
