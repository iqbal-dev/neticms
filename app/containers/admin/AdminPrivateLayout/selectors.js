import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminPrivateLayout state domain
 */

const selectAdminPrivateLayoutDomain = state =>
  state.get('adminPrivateLayout', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminPrivateLayout
 */

const makeSelectAdminPrivateLayout = () =>
  createSelector(selectAdminPrivateLayoutDomain, substate => substate.toJS());

export default makeSelectAdminPrivateLayout;
export { selectAdminPrivateLayoutDomain };
