import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dressCode state domain
 */

const selectDressCodeDomain = state => state.get('dressCode', initialState);

/**
 * Other specific selectors
 */

const makeSelectDressCodeList = () =>
  createSelector(selectDressCodeDomain, substate => substate.get('initDressCodeList'));

const makeSelectMaleDressCodeList = () =>
  createSelector(selectDressCodeDomain, substate => substate.get('maleDressCodeList'));

const makeSelectFemaleDressCodeList = () =>
  createSelector(selectDressCodeDomain, substate => substate.get('femaleDressCodeList'));

const makeSelectCombinedDressCodeList = () =>
  createSelector(selectDressCodeDomain, substate => substate.get('combinedDressCodeList'));

const makeSelectTabPanelStatus = () =>
  createSelector(selectDressCodeDomain, substate => substate.get('activeTab'));

const makeSelectDressCodeLoaderType = () =>
  createSelector(selectDressCodeDomain, substate => substate.get('loaderType'));

/**
 * Default selector used by DressCode
 */

const makeSelectDressCode = () =>
  createSelector(selectDressCodeDomain, substate => substate.toJS());

export default makeSelectDressCode;
export {
  selectDressCodeDomain,
  makeSelectDressCodeList,
  makeSelectTabPanelStatus,
  makeSelectMaleDressCodeList,
  makeSelectFemaleDressCodeList,
  makeSelectCombinedDressCodeList,
  makeSelectDressCodeLoaderType,
};
