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


const makeSelectClassList = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('classList'));

const makeSelectExamTypeList = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examTypeList'));

const makeSelectExamSessionList = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examSessionList'));

const makeSelectClassId = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('classId'));

const makeSelectExamTypeId = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examTypeId'));

const makeSelectExamSessionId = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examSessionId'));//

const makeSelectExamRoutineListData = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examRoutineListData'));

const makeSelectDataTableLoader = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('dataTableLoader'));

const makeSelectClassLoader = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('classLoader'));

const makeSelectExamTypeLoader = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examTypeLoader'));

const makeSelectExamSessionLoader = () =>
  createSelector(selectExamRoutineDomain, substate => substate.get('examSessionLoader'));


export default makeSelectExamRoutine;
export { 
  selectExamRoutineDomain,
  makeSelectClassList,
  makeSelectExamTypeList,
  makeSelectExamSessionList,
  makeSelectClassId,
  makeSelectExamTypeId,
  makeSelectExamSessionId,
  makeSelectExamRoutineListData,
  makeSelectDataTableLoader,
  makeSelectClassLoader,
  makeSelectExamTypeLoader,
  makeSelectExamSessionLoader
 };
