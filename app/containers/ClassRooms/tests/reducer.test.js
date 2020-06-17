import { fromJS } from 'immutable';
import classRoomsReducer from '../reducer';

describe('classRoomsReducer', () => {
  it('returns the initial state', () => {
    expect(classRoomsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
