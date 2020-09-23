import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the onlineClassRoutine state domain
 */

const selectOnlineClassRoutineDomain = state =>
  state.get('onlineClassRoutine', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OnlineClassRoutine
 */

const makeSelectClassList = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('classConfigList'));

const makeSelectClassId = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('classConfigId'));

const makeSelectGroupList = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('groupList'));

const makeSelectGroupId = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('groupId'));

const makeSelectDate = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('date'));

const makeSelectOnlineClassRoutineList = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('onlineClassRoutineList'));

const makeSelectLoader = () =>
  createSelector(selectOnlineClassRoutineDomain, substate => substate.get('loader'));

export {
  selectOnlineClassRoutineDomain,
  makeSelectClassList,
  makeSelectClassId,
  makeSelectGroupList,
  makeSelectGroupId,
  makeSelectDate,
  makeSelectOnlineClassRoutineList,
  makeSelectLoader,
};
