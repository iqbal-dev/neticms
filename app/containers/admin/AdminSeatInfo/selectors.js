import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSeatInfo state domain
 */

const selectAdminSeatInfoDomain = state =>
  state.get('adminSeatInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminSeatInfo
 */

const makeSelectAdminSeatInfo = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.toJS());

export default makeSelectAdminSeatInfo;
export { selectAdminSeatInfoDomain };
