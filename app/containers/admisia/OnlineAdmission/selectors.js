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

export default makeSelectOnlineAdmission;
export { selectOnlineAdmissionDomain };
