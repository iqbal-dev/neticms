/*
 *
 * BasicInfrastucture reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, INFRASTRUCTURE_LIST, SET_LOADER } from './constants';

export const initialState = fromJS({});

function basicInfrastuctureReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case INFRASTRUCTURE_LIST:
      return state.set('infrastructureList', action.infrastructureList)

    case SET_LOADER:
      return state.set('loaderType', action.loaderType);

    default:
      return state;
  }
}

export default basicInfrastuctureReducer;
