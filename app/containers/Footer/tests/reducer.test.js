import { fromJS } from 'immutable';
import footerReducer from '../reducer';

describe('footerReducer', () => {
  it('returns the initial state', () => {
    expect(footerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
