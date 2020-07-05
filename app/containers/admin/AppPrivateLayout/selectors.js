import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appPrivateLayout state domain
 */

const selectAppPrivateLayoutDomain = state =>
  state.get('appPrivateLayout', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppPrivateLayout
 */

const makeSelectAppPrivateLayout = () =>
  createSelector(selectAppPrivateLayoutDomain, substate => substate.toJS());

export default makeSelectAppPrivateLayout;
export { selectAppPrivateLayoutDomain };
