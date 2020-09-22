import { fromJS } from 'immutable';
import examRoutineReducer from '../reducer';

describe('examRoutineReducer', () => {
  it('returns the initial state', () => {
    expect(examRoutineReducer(undefined, {})).toEqual(fromJS({}));
  });
});
