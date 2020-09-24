import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the alumnus state domain
 */

const selectAlumnusDomain = state => state.get('alumnus', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Alumnus
 */

const makeSelectAlumnus = () =>
  createSelector(selectAlumnusDomain, substate => substate.toJS());

export default makeSelectAlumnus;
export { selectAlumnusDomain };
