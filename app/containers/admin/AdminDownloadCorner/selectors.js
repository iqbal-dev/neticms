import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDownloadCorner state domain
 */

const selectAdminDownloadCornerDomain = state =>
  state.get('adminDownloadCorner', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminDownloadCorner
 */

const makeSelectAdminDownloadCorner = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.toJS());

export default makeSelectAdminDownloadCorner;
export { selectAdminDownloadCornerDomain };
