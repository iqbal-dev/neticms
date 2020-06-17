import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appRoute state domain
 */

const selectAppRouteDomain = state => state.get('appRoute', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppRoute
 */

const makeSelectAppRoute = () =>
  createSelector(selectAppRouteDomain, substate => substate.toJS());

export default makeSelectAppRoute;
export { selectAppRouteDomain };
