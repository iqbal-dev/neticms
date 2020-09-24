import { fromJS } from 'immutable';
import alumnusReducer from '../reducer';

describe('alumnusReducer', () => {
  it('returns the initial state', () => {
    expect(alumnusReducer(undefined, {})).toEqual(fromJS({}));
  });
});
