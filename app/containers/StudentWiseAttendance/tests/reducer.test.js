import { fromJS } from 'immutable';
import studentWiseAttendanceReducer from '../reducer';

describe('studentWiseAttendanceReducer', () => {
  it('returns the initial state', () => {
    expect(studentWiseAttendanceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
