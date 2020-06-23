import { fromJS } from 'immutable';
import findPayslipReducer from '../reducer';

describe('findPayslipReducer', () => {
  it('returns the initial state', () => {
    expect(findPayslipReducer(undefined, {})).toEqual(fromJS({}));
  });
});
