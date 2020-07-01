import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentInfo state domain
 */

const selectStudentInfoDomain = state => state.get('studentInfo', initialState);

/**
 * Other specific selectors
 */

const makeSelectClassNameDropDownINfo = () =>
  createSelector(selectStudentInfoDomain, substate => substate.get('classNamesDropdown'));

const makeSelectClassNameSelected = () =>
  createSelector(selectStudentInfoDomain, substate => substate.get('classNameSelected'));

/**
 * Default selector used by StudentInfo
 */

const makeSelectStudentInfo = () =>
  createSelector(selectStudentInfoDomain, substate => substate.toJS());

export default makeSelectStudentInfo;
export { selectStudentInfoDomain, makeSelectClassNameDropDownINfo, makeSelectClassNameSelected };
