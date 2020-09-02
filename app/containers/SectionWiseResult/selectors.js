import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionWiseResult state domain
 */

const selectSectionWiseResultDomain = state =>
  state.get('sectionWiseResult', initialState);

/**
 * Other specific selectors
 */

const makeSelecAcademicYearList = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('academicYearList'));

const makeSelectSectionList = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('sectionList'));

const makeSelectAcademicYear = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('academicYear'));

const makeSelectClassConfigId = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('classConfigId'));

const makeSelectExamConfigId = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('examConfigId'));

const makeSelectExamList = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('examList'));

const makeSelectSectionWiseResultListData = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('sectionWiseResultData'));

const makeSelectSectionWiseResultLoaderType = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.get('loaderType'));

/**
 * Default selector used by SectionWiseResult
 */

const makeSelectSectionWiseResult = () =>
  createSelector(selectSectionWiseResultDomain, substate => substate.toJS());

export default makeSelectSectionWiseResult;
export {
  selectSectionWiseResultDomain,
  makeSelecAcademicYearList,
  makeSelectSectionList,
  makeSelectAcademicYear,
  makeSelectExamList,
  makeSelectClassConfigId,
  makeSelectExamConfigId,
  makeSelectSectionWiseResultListData,
  makeSelectSectionWiseResultLoaderType
};
