import { fromJS } from 'immutable';
import seatInfoReducer from '../reducer';

describe('seatInfoReducer', () => {
  it('returns the initial state', () => {
    expect(seatInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
