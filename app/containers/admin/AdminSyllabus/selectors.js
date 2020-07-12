import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSyllabus state domain
 */

const selectAdminSyllabusDomain = state =>
  state.get('adminSyllabus', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminSyllabus
 */

const makeSelectAdminSyllabus = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.toJS());

export default makeSelectAdminSyllabus;
export { selectAdminSyllabusDomain };
