import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the exampleDesign state domain
 */

const selectExampleDesignDomain = state =>
  state.get('exampleDesign', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExampleDesign
 */

const makeSelectExampleDesign = () =>
  createSelector(selectExampleDesignDomain, substate => substate.toJS());

export default makeSelectExampleDesign;
export { selectExampleDesignDomain };
