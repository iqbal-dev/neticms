import { fromJS } from 'immutable';
import awardsReducer from '../reducer';

describe('awardsReducer', () => {
  it('returns the initial state', () => {
    expect(awardsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
