import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentInfo state domain
 */

const selectStudentInfoDomain = state => state.get('studentInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentInfo
 */

const makeSelectStudentInfo = () =>
  createSelector(selectStudentInfoDomain, substate => substate.toJS());

export default makeSelectStudentInfo;
export { selectStudentInfoDomain };
