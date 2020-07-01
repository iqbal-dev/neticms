import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the meritList state domain
 */

const selectMeritListDomain = state => state.get('meritList', initialState);

/**
 * Other specific selectors
 */

const makeSelecAcademicYearList = () =>
createSelector(selectMeritListDomain, substate => substate.get('academicYearList'));

const makeSelectSectionList = () =>
createSelector(selectMeritListDomain, substate => substate.get('sectionList'));

const makeSelectAcademicYear = () =>
  createSelector(selectMeritListDomain, substate => substate.get('academicYear'));

const makeSelectClassConfigId = () =>
  createSelector(selectMeritListDomain, substate => substate.get('classConfigId'));

const makeSelectExamConfigId = () =>
  createSelector(selectMeritListDomain, substate => substate.get('examConfigId'));

const makeSelectExamList = () =>
  createSelector(selectMeritListDomain, substate => substate.get('examList'));

  const makeSelectMeritListData = () =>
  createSelector(selectMeritListDomain, substate => substate.get('meritListData'));


/**
 * Default selector used by MeritList
 */

const makeSelectMeritList = () =>
  createSelector(selectMeritListDomain, substate => substate.toJS());

export default makeSelectMeritList;
export {
  makeSelecAcademicYearList,
  makeSelectSectionList,
  selectMeritListDomain,
  makeSelectAcademicYear,
  makeSelectExamList,
  makeSelectClassConfigId,
  makeSelectExamConfigId,
  makeSelectMeritListData
 };
