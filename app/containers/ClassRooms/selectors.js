import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the classRooms state domain
 */

const selectClassRoomsDomain = state => state.get('classRooms', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClassRooms
 */

const makeSelectClassRooms = () =>
  createSelector(selectClassRoomsDomain, substate => substate.toJS());

export default makeSelectClassRooms;
export { selectClassRoomsDomain };
