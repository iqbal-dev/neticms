import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the downloadCorner state domain
 */

const selectDownloadCornerDomain = state =>
  state.get('downloadCorner', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DownloadCorner
 */

const makeSelectDownloadCorner = () =>
  createSelector(selectDownloadCornerDomain, substate => substate.toJS());

export default makeSelectDownloadCorner;
export { selectDownloadCornerDomain };
