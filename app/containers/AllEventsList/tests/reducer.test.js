import { fromJS } from 'immutable';
import allEventsListReducer from '../reducer';

describe('allEventsListReducer', () => {
  it('returns the initial state', () => {
    expect(allEventsListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
