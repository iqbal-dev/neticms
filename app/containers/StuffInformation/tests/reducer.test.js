import { fromJS } from 'immutable';
import stuffInformationReducer from '../reducer';

describe('stuffInformationReducer', () => {
  it('returns the initial state', () => {
    expect(stuffInformationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
