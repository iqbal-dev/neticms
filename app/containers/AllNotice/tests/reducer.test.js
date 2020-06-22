import { fromJS } from 'immutable';
import allNoticeReducer from '../reducer';

describe('allNoticeReducer', () => {
  it('returns the initial state', () => {
    expect(allNoticeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
