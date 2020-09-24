import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topStudents state domain
 */

const selectTopStudentsDomain = state => state.get('topStudents', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopStudents
 */

const makeSelectTopStudents = () =>
  createSelector(selectTopStudentsDomain, substate => substate.toJS());

export default makeSelectTopStudents;
export { selectTopStudentsDomain };
