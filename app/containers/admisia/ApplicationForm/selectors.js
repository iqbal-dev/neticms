import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the applicationForm state domain
 */

const selectApplicationFormDomain = state =>
  state.get('applicationForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApplicationForm
 */

const makeSelectApplicationForm = () =>
  createSelector(selectApplicationFormDomain, substate => substate.toJS());


const makeSelectApplicantInfo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('applicantInfo'));

const makeSelectApplicantName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('applicantName'));

const makeSelectGender = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('gender'));

const makeSelectReligion = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('religion'));

const makeSelectDob = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('dob'));

const makeSelectBirthCertificateNo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('birthCertificateNo'));

const makeSelectQuota = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('quota'));

const makeSelectFileName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('fileName'));

const makeSelectFileContent = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('fileContent'));

const makeSelectFileSave = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('fileSave'));
  

const makeSelectMobileNo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('mobileNo'));

const makeSelectAddressDetails = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('addressDetails'));


const makeSelectFatherName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('fatherName'));

const makeSelectFatherOccupation = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('fatherOccupation'));

const makeSelectFatherNidNo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('fatherNidNo'));

const makeSelectMotherName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('motherName'));

const makeSelectMotherOccupation = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('motherOccupation'));

const makeSelectMotherNidNo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('motherNidNo'));


const makeSelectInstituteName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('instituteName'));

const makeSelectInstituteType = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('instituteType'));

const makeSelectBoardName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('boardName'));


const makeSelectClassName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('className'));

const makeSelectRollNo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('rollNo'));

const makeSelectRegistrationNo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('registrationNo'));

const makeSelectExamName = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('examName'));

const makeSelectExamGrade = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('examGrade'));

const makeSelectExamGpa = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('examGpa'));

const makeSelectPassingYear = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('passingYear'));

  


const makeSelectAdditionalInfo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('additionalInfos'));

const makeSelectInsertApplicantInfo = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('insertApplicantInfo'));

const makeSelectApplicantView = () =>
  createSelector(selectApplicationFormDomain, substate => substate.get('applicantView'));

  // makeSubmitInsertApplicantInfo



export default makeSelectApplicationForm;
export { 
  selectApplicationFormDomain,
  makeSelectApplicantInfo,
  makeSelectApplicantName,
  makeSelectGender,
  makeSelectReligion,
  makeSelectDob,
  makeSelectBirthCertificateNo,
  makeSelectQuota,
  makeSelectFileName,
  makeSelectFileContent,
  makeSelectFileSave,
  makeSelectMobileNo,
  makeSelectAddressDetails,

  makeSelectFatherName,
  makeSelectFatherOccupation,
  makeSelectFatherNidNo,
  makeSelectMotherName,
  makeSelectMotherOccupation,
  makeSelectMotherNidNo,

  makeSelectInstituteName,
  makeSelectInstituteType,
  makeSelectBoardName,
  makeSelectClassName,
  makeSelectRollNo,
  makeSelectRegistrationNo,
  makeSelectExamName,
  makeSelectExamGrade,
  makeSelectExamGpa,
  makeSelectPassingYear,


  makeSelectAdditionalInfo,
  makeSelectInsertApplicantInfo,
  makeSelectApplicantView

 };
