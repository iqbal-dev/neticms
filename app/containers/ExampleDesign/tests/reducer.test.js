import { fromJS } from 'immutable';
import exampleDesignReducer from '../reducer';

describe('exampleDesignReducer', () => {
  it('returns the initial state', () => {
    expect(exampleDesignReducer(undefined, {})).toEqual(fromJS({}));
  });
});
