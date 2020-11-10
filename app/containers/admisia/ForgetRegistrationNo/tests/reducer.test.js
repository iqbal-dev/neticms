import { fromJS } from 'immutable';
import forgetRegistrationNoReducer from '../reducer';

describe('forgetRegistrationNoReducer', () => {
  it('returns the initial state', () => {
    expect(forgetRegistrationNoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
