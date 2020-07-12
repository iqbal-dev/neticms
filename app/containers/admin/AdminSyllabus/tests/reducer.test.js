import { fromJS } from 'immutable';
import adminSyllabusReducer from '../reducer';

describe('adminSyllabusReducer', () => {
  it('returns the initial state', () => {
    expect(adminSyllabusReducer(undefined, {})).toEqual(fromJS({}));
  });
});
