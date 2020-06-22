import { fromJS } from 'immutable';
import failListReducer from '../reducer';

describe('failListReducer', () => {
  it('returns the initial state', () => {
    expect(failListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
