import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the applicationFormDownload state domain
 */

const selectApplicationFormDownloadDomain = state =>
  state.get('applicationFormDownload', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApplicationFormDownload
 */

const makeSelectApplicationFormDownload = () =>
  createSelector(selectApplicationFormDownloadDomain, substate =>
    substate.toJS(),
  );

export default makeSelectApplicationFormDownload;
export { selectApplicationFormDownloadDomain };
