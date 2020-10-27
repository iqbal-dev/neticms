import { fromJS } from 'immutable';
import trackApplicationReducer from '../reducer';

describe('trackApplicationReducer', () => {
  it('returns the initial state', () => {
    expect(trackApplicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
