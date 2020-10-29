import { fromJS } from 'immutable';
import admissionConfirmationLetterReducer from '../reducer';

describe('admissionConfirmationLetterReducer', () => {
  it('returns the initial state', () => {
    expect(admissionConfirmationLetterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
