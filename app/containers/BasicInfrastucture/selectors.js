import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the basicInfrastucture state domain
 */

const selectBasicInfrastuctureDomain = state =>
  state.get('basicInfrastucture', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BasicInfrastucture
 */

const makeSelectBasicInfrastucture = () =>
  createSelector(selectBasicInfrastuctureDomain, substate => substate.toJS());

const makeSelectInfrastructureList = () =>
  createSelector(selectBasicInfrastuctureDomain, substate =>
    substate.get('infrastructureList'),
);

export default makeSelectBasicInfrastucture;
export { 
  selectBasicInfrastuctureDomain,
  makeSelectInfrastructureList
};
