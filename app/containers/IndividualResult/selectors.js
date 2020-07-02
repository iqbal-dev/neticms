import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the individualResult state domain
 */

const selectIndividualResultDomain = state =>
  state.get('individualResult', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by IndividualResult
 */

const makeSelectIndividualResult = () =>
  createSelector(selectIndividualResultDomain, substate => substate.toJS());

const makeSelectStudentID = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('stdID'));

const makeSelectAcademicYearList = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('yearList'));

const makeSelectAcademicYear = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('acYear'));


const makeSelectStudentMobile = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('stdMobile'));

const makeSelectExamList = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('examList'));

const makeSelectExamConfigId = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('examConfigId'));

const makeSelectIndividualResultData = () =>
  createSelector(selectIndividualResultDomain, substate => substate.get('resultData'));




export default makeSelectIndividualResult;
export { 
  selectIndividualResultDomain,
  makeSelectStudentID,
  makeSelectAcademicYearList,
  makeSelectAcademicYear,
  makeSelectStudentMobile,
  makeSelectExamList,
  makeSelectExamConfigId,
  makeSelectIndividualResultData
 };
