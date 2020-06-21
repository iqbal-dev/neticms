import { fromJS } from 'immutable';
import eventGalleryReducer from '../reducer';

describe('eventGalleryReducer', () => {
  it('returns the initial state', () => {
    expect(eventGalleryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
