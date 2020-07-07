import { fromJS } from 'immutable';
import adminDownloadCornerReducer from '../reducer';

describe('adminDownloadCornerReducer', () => {
  it('returns the initial state', () => {
    expect(adminDownloadCornerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
