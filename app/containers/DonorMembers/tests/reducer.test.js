import { fromJS } from 'immutable';
import donorMembersReducer from '../reducer';

describe('donorMembersReducer', () => {
  it('returns the initial state', () => {
    expect(donorMembersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
