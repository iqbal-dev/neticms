import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the allEventsList state domain
 */

const selectAllEventsListDomain = state =>
  state.get('allEventsList', initialState);

/**
 * Other specific selectors
 */

const makeSelectAllEventListFetch = () =>
createSelector(selectAllEventsListDomain, substate => substate.get('allEventsList'));

/**
 * Default selector used by AllEventsList
 */

const makeSelectAllEventsList = () =>
  createSelector(selectAllEventsListDomain, substate => substate.toJS());

export default makeSelectAllEventsList;
export { selectAllEventsListDomain, makeSelectAllEventListFetch};
