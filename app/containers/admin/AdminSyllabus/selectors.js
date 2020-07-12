import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSyllabus state domain
 */

const selectAdminSyllabusDomain = state =>
  state.get('adminSyllabus', initialState);

/**
 * Other specific selectors
 */

const makeSelectAdminSyllabusList = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('syllabusList'));

const makeSelectClassList = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('classList'));

const makeSelectClassId = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('classId'));

const makeSelectGroupList = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('groupList'));

const makeSelectGroupId = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('groupId'));

const makeSelectUploadFile = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('file'));

const makeSelectRowData = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('rowData'));

const makeSelectDialogVisibleStatus = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.get('dialogVisible'));

/**
 * Default selector used by AdminSyllabus
 */

const makeSelectAdminSyllabus = () =>
  createSelector(selectAdminSyllabusDomain, substate => substate.toJS());

export default makeSelectAdminSyllabus;
export {
  selectAdminSyllabusDomain,
  makeSelectAdminSyllabusList,
  makeSelectClassList,
  makeSelectClassId,
  makeSelectGroupList,
  makeSelectGroupId,
  makeSelectUploadFile,
  makeSelectRowData,
  makeSelectDialogVisibleStatus
};
