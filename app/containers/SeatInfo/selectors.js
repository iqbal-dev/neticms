import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the seatInfo state domain
 */

const selectSeatInfoDomain = state => state.get('seatInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SeatInfo
 */

const makeSelectSeatInfo = () =>
  createSelector(selectSeatInfoDomain, substate => substate.toJS());

export default makeSelectSeatInfo;
export { selectSeatInfoDomain };
