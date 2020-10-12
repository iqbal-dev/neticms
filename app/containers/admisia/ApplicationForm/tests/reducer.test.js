import { fromJS } from 'immutable';
import applicationFormReducer from '../reducer';

describe('applicationFormReducer', () => {
  it('returns the initial state', () => {
    expect(applicationFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
