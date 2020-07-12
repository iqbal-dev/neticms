import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDressInfo state domain
 */

const selectAdminDressInfoDomain = state =>
  state.get('adminDressInfo', initialState);

const makeSelectDressInfoListData = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('dressInfoList'));

  const makeSelectGenderInfoListData = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('genderInfoList'));

  const makeSelectGender = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('selectedGender'));

  const makeSelectClassRange = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('classRange'));

  const makeSelectDressCodeDetails = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('dressCodeDetails'));

  const makeSelectDressCodeImage = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('dressCodeImage'));

  const makeSelectModalVisibleStatus = () =>
  createSelector(selectAdminDressInfoDomain, substate =>
    substate.get('modalVisible'),
  );

  const makeSelectDatatableRowdata = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('rowData'));

  const makeSelectSerialNo = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.get('serialNo'));

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminDressInfo
 */

const makeSelectAdminDressInfo = () =>
  createSelector(selectAdminDressInfoDomain, substate => substate.toJS());

export default makeSelectAdminDressInfo;
export { selectAdminDressInfoDomain,
  makeSelectDressInfoListData,
  makeSelectGenderInfoListData,
  makeSelectGender,
  makeSelectClassRange,
  makeSelectDressCodeDetails,
  makeSelectDressCodeImage,
  makeSelectModalVisibleStatus,
  makeSelectDatatableRowdata,
  makeSelectSerialNo,

  

};
