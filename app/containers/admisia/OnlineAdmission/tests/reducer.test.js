import { fromJS } from 'immutable';
import onlineAdmissionReducer from '../reducer';

describe('onlineAdmissionReducer', () => {
  it('returns the initial state', () => {
    expect(onlineAdmissionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
