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

/**
 * Default selector used by TrackApplication
 */

const makeSelectTrackApplication = () =>
  createSelector(selectTrackApplicationDomain, substate => substate.toJS());

export default makeSelectTrackApplication;
export { selectTrackApplicationDomain };
