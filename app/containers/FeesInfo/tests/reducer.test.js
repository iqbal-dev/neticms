import { fromJS } from 'immutable';
import feesInfoReducer from '../reducer';

describe('feesInfoReducer', () => {
  it('returns the initial state', () => {
    expect(feesInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
