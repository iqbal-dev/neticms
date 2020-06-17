import { fromJS } from 'immutable';
import dressCodeReducer from '../reducer';

describe('dressCodeReducer', () => {
  it('returns the initial state', () => {
    expect(dressCodeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
