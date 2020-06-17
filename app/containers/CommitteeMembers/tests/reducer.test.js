import { fromJS } from 'immutable';
import committeeMembersReducer from '../reducer';

describe('committeeMembersReducer', () => {
  it('returns the initial state', () => {
    expect(committeeMembersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
