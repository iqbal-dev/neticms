import { fromJS } from 'immutable';
import admisiaDownloadReducer from '../reducer';

describe('admisiaDownloadReducer', () => {
  it('returns the initial state', () => {
    expect(admisiaDownloadReducer(undefined, {})).toEqual(fromJS({}));
  });
});
