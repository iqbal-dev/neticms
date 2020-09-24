import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the awards state domain
 */

const selectAwardsDomain = state => state.get('awards', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Awards
 */

const makeSelectAwards = () =>
  createSelector(selectAwardsDomain, substate => substate.toJS());

export default makeSelectAwards;
export { selectAwardsDomain };
