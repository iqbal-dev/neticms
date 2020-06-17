import { fromJS } from 'immutable';
import sectionWiseAttendanceReducer from '../reducer';

describe('sectionWiseAttendanceReducer', () => {
  it('returns the initial state', () => {
    expect(sectionWiseAttendanceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
