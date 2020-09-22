import { fromJS } from 'immutable';
import classRoutineReducer from '../reducer';

describe('classRoutineReducer', () => {
  it('returns the initial state', () => {
    expect(classRoutineReducer(undefined, {})).toEqual(fromJS({}));
  });
});
