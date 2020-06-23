import { fromJS } from 'immutable';
import teacherAttendanceReducer from '../reducer';

describe('teacherAttendanceReducer', () => {
  it('returns the initial state', () => {
    expect(teacherAttendanceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
