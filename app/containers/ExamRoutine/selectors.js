import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the examRoutine state domain
 */

const selectExamRoutineDomain = state => state.get('examRoutine', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExamRoutine
 */

const makeSelectExamRoutine = () =>
  createSelector(selectExamRoutineDomain, substate => substate.toJS());

export default makeSelectExamRoutine;
export { selectExamRoutineDomain };
