import { fromJS } from 'immutable';
import appHeaderReducer from '../reducer';

describe('appHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(appHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
