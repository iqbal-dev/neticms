import { fromJS } from 'immutable';
import topStudentsReducer from '../reducer';

describe('topStudentsReducer', () => {
  it('returns the initial state', () => {
    expect(topStudentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
