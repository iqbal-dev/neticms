import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the allNotice state domain
 */

const selectAllNoticeDomain = state => state.get('allNotice', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AllNotice
 */

const makeSelectAllNotice = () =>
  createSelector(selectAllNoticeDomain, substate => substate.toJS());

export default makeSelectAllNotice;
export { selectAllNoticeDomain };
