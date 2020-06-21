import { fromJS } from 'immutable';
import studentInfoReducer from '../reducer';

describe('studentInfoReducer', () => {
  it('returns the initial state', () => {
    expect(studentInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
