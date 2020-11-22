import { fromJS } from 'immutable';
import applicationFormDownloadReducer from '../reducer';

describe('applicationFormDownloadReducer', () => {
  it('returns the initial state', () => {
    expect(applicationFormDownloadReducer(undefined, {})).toEqual(fromJS({}));
  });
});
