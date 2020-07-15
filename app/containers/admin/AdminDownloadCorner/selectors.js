import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDownloadCorner state domain
 */

const selectAdminDownloadCornerDomain = state =>
  state.get('adminDownloadCorner', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminDownloadCorner
 */

const makeSelectAdminDownloadCorner = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.toJS());

const makeSelectDownloadCornerList = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.get('downloadCornerList'));

const makeSelectSerialValue = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.get('serialValue'));

const makeSelectTitleValue = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.get('titleValue'));

const makeSelectDialogVisibility = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.get('dialogType'));

const makeSelectShowDialog = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.get('dialogVisible'));

const makeSelectUpdateRowData = () =>
  createSelector(selectAdminDownloadCornerDomain, substate => substate.get('rowData'));

export default makeSelectAdminDownloadCorner;
export { 
  selectAdminDownloadCornerDomain,
  makeSelectDownloadCornerList,
  makeSelectSerialValue,
  makeSelectTitleValue,

  makeSelectDialogVisibility,
  makeSelectShowDialog,
  makeSelectUpdateRowData
 };

// makeSelectSerialValue
