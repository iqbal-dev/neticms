import { fromJS } from 'immutable';
import downloadCornerReducer from '../reducer';

describe('downloadCornerReducer', () => {
  it('returns the initial state', () => {
    expect(downloadCornerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
