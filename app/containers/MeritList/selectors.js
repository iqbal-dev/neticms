import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the meritList state domain
 */

const selectMeritListDomain = state => state.get('meritList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MeritList
 */

const makeSelectMeritList = () =>
  createSelector(selectMeritListDomain, substate => substate.toJS());

export default makeSelectMeritList;
export { selectMeritListDomain };
