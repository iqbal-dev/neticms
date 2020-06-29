import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the failList state domain
 */

const selectFailListDomain = state => state.get('failList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FailList
 */

const makeSelectFailList = () =>
  createSelector(selectFailListDomain, substate => substate.toJS());

const makeSelectAcademicYearList = () =>
  createSelector(selectFailListDomain, substate => substate.get('yearList'));

const makeSelectSectionList = () =>
  createSelector(selectFailListDomain, substate => substate.get('sectionList'));

const makeSelectExamList = () =>
  createSelector(selectFailListDomain, substate => substate.get('examList'));

const makeSelectAcademicYear = () =>
  createSelector(selectFailListDomain, substate => substate.get('acYear'));

const makeSelectClassConfigId = () =>
  createSelector(selectFailListDomain, substate => substate.get('classConfigId'));

const makeSelectExamConfigId = () =>
  createSelector(selectFailListDomain, substate => substate.get('examConfigId'));

const makeSelectFailListData = () =>
  createSelector(selectFailListDomain, substate => substate.get('failListData'));

export default makeSelectFailList;
export {
  selectFailListDomain,
  makeSelectAcademicYearList,
  makeSelectSectionList,
  makeSelectExamList,

  makeSelectAcademicYear,
  makeSelectClassConfigId,
  makeSelectExamConfigId,
  makeSelectFailListData,
};
