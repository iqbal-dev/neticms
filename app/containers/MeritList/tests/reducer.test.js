import { fromJS } from 'immutable';
import meritListReducer from '../reducer';

describe('meritListReducer', () => {
  it('returns the initial state', () => {
    expect(meritListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
