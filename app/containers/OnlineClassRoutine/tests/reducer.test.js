import { fromJS } from 'immutable';
import onlineClassRoutineReducer from '../reducer';

describe('onlineClassRoutineReducer', () => {
  it('returns the initial state', () => {
    expect(onlineClassRoutineReducer(undefined, {})).toEqual(fromJS({}));
  });
});
