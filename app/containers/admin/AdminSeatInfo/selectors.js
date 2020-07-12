import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSeatInfo state domain
 */

const selectAdminSeatInfoDomain = state =>
  state.get('adminSeatInfo', initialState);

  // List Data
const makeSelectClassList = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('classList'));

const makeSelectGroupList = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('groupList'));

const makeSelectSeatInfoList = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('seatInfoList'));



const makeSelectSerialValue = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('serialValue'));

const makeSelectClassValue = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('classValue'));

const makeSelectGroupValue = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('groupValue'));

const makeSelectSeatValue = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('seatValue'));

const makeSelectSubmitFormData = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('submitFormData'));


const makeSelectDialogVisibility = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('dialogType'));

const makeSelectShowDialog = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('dialogVisible'));

const makeSelectUpdateRowData = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.get('rowData'));



  // makeSelectClassList
/**
 * Default selector used by AdminSeatInfo
 */

const makeSelectAdminSeatInfo = () =>
  createSelector(selectAdminSeatInfoDomain, substate => substate.toJS());

export default makeSelectAdminSeatInfo;
export { 
  selectAdminSeatInfoDomain,
  // List Data
  makeSelectClassList,
  makeSelectGroupList,
  makeSelectSeatInfoList,

  makeSelectSerialValue,
  makeSelectClassValue,
  makeSelectGroupValue,
  makeSelectSeatValue,

  makeSelectSubmitFormData,

  makeSelectDialogVisibility,
  makeSelectShowDialog,
  makeSelectUpdateRowData
 };
