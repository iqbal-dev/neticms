import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the seatInfo state domain
 */

const selectSeatInfoDomain = state => state.get('seatInfo', initialState);

const makeSelectSeatInfoList = () =>
  createSelector(selectSeatInfoDomain, substate => substate.get('seatInfoList'));

/**
 * Other specific selectors
 */

/**
 * Default selector used by SeatInfo
 */

const makeSelectSeatInfo = () =>
  createSelector(selectSeatInfoDomain, substate => substate.toJS());

const makeSelectLoaderType = () =>
  createSelector(selectSeatInfoDomain, substate => substate.get('loaderType'));

export default makeSelectSeatInfo;
export { selectSeatInfoDomain, makeSelectSeatInfoList, makeSelectLoaderType };
