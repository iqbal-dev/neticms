import { fromJS } from 'immutable';
import individualResultReducer from '../reducer';

describe('individualResultReducer', () => {
  it('returns the initial state', () => {
    expect(individualResultReducer(undefined, {})).toEqual(fromJS({}));
  });
});
