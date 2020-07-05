import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appHeader state domain
 */

const selectAppHeaderDomain = state => state.get('appHeader', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppHeader
 */

const makeSelectAppHeader = () =>
  createSelector(selectAppHeaderDomain, substate => substate.toJS());

export default makeSelectAppHeader;
export { selectAppHeaderDomain };
