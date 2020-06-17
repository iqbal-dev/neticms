import { fromJS } from 'immutable';
import syllabusInfoReducer from '../reducer';

describe('syllabusInfoReducer', () => {
  it('returns the initial state', () => {
    expect(syllabusInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
