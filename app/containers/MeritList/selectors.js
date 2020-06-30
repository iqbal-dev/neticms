import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the meritList state domain
 */

const selectMeritListDomain = state => state.get('meritList', initialState);

/**
 * Other specific selectors
 */

const makeSelectAcademicYear = () =>
  createSelector(selectMeritListDomain, substate => substate.get('academicYear'));

const makeSelectExamList = () =>
  createSelector(selectMeritListDomain, substate => substate.get('examList'));

const makeSelecAcademicYearList = () =>
  createSelector(selectMeritListDomain, substate => substate.get('academicYearList'));
/**
 * Default selector used by MeritList
 */

const makeSelectMeritList = () =>
  createSelector(selectMeritListDomain, substate => substate.toJS());

export default makeSelectMeritList;
export {
   selectMeritListDomain,
  makeSelectAcademicYear,
  makeSelectExamList,
  makeSelecAcademicYearList
 };
