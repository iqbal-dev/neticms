import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the onlineClassRoutine state domain
 */

const selectOnlineClassRoutineDomain = state =>
  state.get('onlineClassRoutine', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OnlineClassRoutine
 */

const makeSelectOnlineClassRoutine = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.toJS());

export default makeSelectOnlineClassRoutine;
export { selectOnlineClassRoutineDomain };
