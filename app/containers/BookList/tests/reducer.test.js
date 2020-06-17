import { fromJS } from 'immutable';
import bookListReducer from '../reducer';

describe('bookListReducer', () => {
  it('returns the initial state', () => {
    expect(bookListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
