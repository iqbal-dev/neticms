import { fromJS } from 'immutable';
import teacherInformationReducer from '../reducer';

describe('teacherInformationReducer', () => {
  it('returns the initial state', () => {
    expect(teacherInformationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
