import { fromJS } from 'immutable';
import sectionWiseResultReducer from '../reducer';

describe('sectionWiseResultReducer', () => {
  it('returns the initial state', () => {
    expect(sectionWiseResultReducer(undefined, {})).toEqual(fromJS({}));
  });
});
