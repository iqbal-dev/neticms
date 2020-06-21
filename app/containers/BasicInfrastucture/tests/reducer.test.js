import { fromJS } from 'immutable';
import basicInfrastuctureReducer from '../reducer';

describe('basicInfrastuctureReducer', () => {
  it('returns the initial state', () => {
    expect(basicInfrastuctureReducer(undefined, {})).toEqual(fromJS({}));
  });
});
