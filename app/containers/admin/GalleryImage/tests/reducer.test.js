import { fromJS } from 'immutable';
import galleryImageReducer from '../reducer';

describe('galleryImageReducer', () => {
  it('returns the initial state', () => {
    expect(galleryImageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
