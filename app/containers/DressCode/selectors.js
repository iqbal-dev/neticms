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

const makeSelectTabPanelStatus = () =>
createSelector(selectDressCodeDomain, substate => substate.get('activeTab'));

/**
 * Default selector used by DressCode
 */

const makeSelectDressCode = () =>
  createSelector(selectDressCodeDomain, substate => substate.toJS());

export default makeSelectDressCode;
export { selectDressCodeDomain,
  makeSelectDressCodeList,
  makeSelectTabPanelStatus,
};
