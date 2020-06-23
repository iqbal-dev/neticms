import { fromJS } from 'immutable';
import welcomeSpeechReducer from '../reducer';

describe('welcomeSpeechReducer', () => {
  it('returns the initial state', () => {
    expect(welcomeSpeechReducer(undefined, {})).toEqual(fromJS({}));
  });
});
