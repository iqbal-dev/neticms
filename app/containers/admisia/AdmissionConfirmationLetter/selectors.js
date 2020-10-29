import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the admissionConfirmationLetter state domain
 */

const selectAdmissionConfirmationLetterDomain = state =>
  state.get('admissionConfirmationLetter', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdmissionConfirmationLetter
 */

const makeSelectAdmissionConfirmationLetter = () =>
  createSelector(selectAdmissionConfirmationLetterDomain, substate =>
    substate.toJS(),
  );

export default makeSelectAdmissionConfirmationLetter;
export { selectAdmissionConfirmationLetterDomain };
