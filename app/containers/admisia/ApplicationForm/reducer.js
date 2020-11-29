/*
 *
 * ApplicationForm reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_ON_CHANGE_APPLICANT_INFO,
  SET_ON_CHANGE_APPLICANT_NAME,
  SET_ON_CHANGE_GENDER,
  SET_ON_CHANGE_RELIGION,
  SET_ON_CHANGE_DOB,
  SET_ON_CHANGE_BIRTH_CERTIFICATE_NO,
  SET_ON_CHANGE_QUOTA,
  SET_ON_CHANGE_File_NAME,
  SET_ON_CHANGE_File_CONTENT,
  SET_ON_CHANGE_File_SAVE,
  SET_ON_CHANGE_MOBILE_NO,
  SET_ON_CHANGE_ADDRERSS,

  SET_ON_CHANGE_FATHER_NAME,
  SET_ON_CHANGE_FATHER_OCCUPATION,
  SET_ON_CHANGE_FATHER_NID_NO,
  SET_ON_CHANGE_MOTHER_NAME,
  SET_ON_CHANGE_MOTHER_OCCUPATION,
  SET_ON_CHANGE_MOTHER_NID_NO,

  SET_ON_CHANGE_INSTITUTE_NAME,
  SET_ON_CHANGE_INSTITUTE_TYPE,
  SET_ON_CHANGE_BOARD_NAME,
  SET_ON_CHANGE_CLASS_NAME,
  SET_ON_CHANGE_ROLL_NO,
  SET_ON_CHANGE_REGISTRATION_NO,
  SET_ON_CHANGE_EXAM_NAME,
  SET_ON_CHANGE_EXAM_GRADE,
  SET_ON_CHANGE_EXAM_GPA,
  SET_ON_CHANGE_PASSING_YEAR,

  SET_ON_SUBMIT_ADDITIONAL_INFO,
  SET_ON_SUBMIT_INSERT_APPLICANT_INFO,
  SET_APPLICANT_VIEW,
  SET_APPLICANT_INFO_DETAILS_LIST,
  SET_MESSAGE,
  SET_LOADER
} from './constants';

export const initialState = fromJS({
  applicantName: '',
  gender: '',
  religion: '',

  birthCertificateNo: '',
  quota: '',
  fileName: '',
  fileContent: '',
  fileSave: false,
  mobileNo: '',
  addressDetails: '',

  fatherName: "",
  fatherOccupation: "",
  fatherNidNo: "",
  motherName: "",
  motherOccupation: "",
  motherNidNo: "",

  instituteName: "",
  instituteType: '',
  boardName: "",
  className: "",
  rollNo: 0,
  registrationNo: '',
  examName: "",
  examGrade: "",
  examGpa: 0,
  passingYear: 0,

  arr: [
    "test", "test123"
  ],
  additionalInfos: [],
  applicantInfo: {},
  insertApplicantInfo: {},
  applicantView: {},
  applicantInfoList: [],
  message: '',
  loader: ''
});

function applicationFormReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case SET_ON_CHANGE_APPLICANT_INFO:
      return state.set('applicantInfo', action.applicantInfo);

    case SET_ON_CHANGE_APPLICANT_NAME:
      return state.set('applicantName', action.applicantName);

    case SET_ON_CHANGE_GENDER:
      return state.set('gender', action.gender);

    case SET_ON_CHANGE_RELIGION:
      return state.set('religion', action.religion);

    case SET_ON_CHANGE_DOB:
      return state.set('dob', action.dob);

    case SET_ON_CHANGE_BIRTH_CERTIFICATE_NO:
      return state.set('birthCertificateNo', action.birthCertificateNo);

    case SET_ON_CHANGE_QUOTA:
      return state.set('quota', action.quota);

    case SET_ON_CHANGE_File_NAME:
      return state.set('fileName', action.fileName);

    case SET_ON_CHANGE_File_CONTENT:
      return state.set('fileContent', action.fileContent);

    case SET_ON_CHANGE_File_SAVE:
      return state.set('fileSave', action.fileSave);

    case SET_ON_CHANGE_MOBILE_NO:
      return state.set('mobileNo', action.mobileNo);

    case SET_ON_CHANGE_ADDRERSS:
      return state.set('addressDetails', action.addressDetails);

    case SET_ON_CHANGE_FATHER_NAME:
      return state.set('fatherName', action.fatherName);

    case SET_ON_CHANGE_FATHER_OCCUPATION:
      return state.set('fatherOccupation', action.fatherOccupation);

    case SET_ON_CHANGE_FATHER_NID_NO:
      return state.set('fatherNidNo', action.fatherNidNo);

    case SET_ON_CHANGE_MOTHER_NAME:
      return state.set('motherName', action.motherName);

    case SET_ON_CHANGE_MOTHER_OCCUPATION:
      return state.set('motherOccupation', action.motherOccupation);

    case SET_ON_CHANGE_MOTHER_NID_NO:
      return state.set('motherNidNo', action.motherNidNo);

    case SET_ON_CHANGE_INSTITUTE_NAME:
      return state.set('instituteName', action.instituteName);

    case SET_ON_CHANGE_INSTITUTE_TYPE:
      return state.set('instituteType', action.instituteType);

    case SET_ON_CHANGE_BOARD_NAME:
      return state.set('boardName', action.boardName);

    case SET_ON_CHANGE_CLASS_NAME:
      return state.set('className', action.className);

    case SET_ON_CHANGE_ROLL_NO:
      return state.set('rollNo', action.rollNo);

    case SET_ON_CHANGE_REGISTRATION_NO:
      return state.set('registrationNo', action.registrationNo);

    case SET_ON_CHANGE_EXAM_NAME:
      return state.set('examName', action.examName);

    case SET_ON_CHANGE_EXAM_GRADE:
      return state.set('examGrade', action.examGrade);

    case SET_ON_CHANGE_EXAM_GPA:
      return state.set('examGpa', action.examGpa);

    case SET_ON_CHANGE_PASSING_YEAR:
      return state.set('passingYear', action.passingYear);

    case SET_ON_SUBMIT_ADDITIONAL_INFO:
      return state.set('additionalInfos', action.additionalInfo);

    case SET_ON_SUBMIT_INSERT_APPLICANT_INFO:
      return state.set('insertApplicantInfo', action.insertApplicantInfo);

    case SET_APPLICANT_VIEW:
      return state.set('applicantView', action.applicantView);

    case SET_APPLICANT_INFO_DETAILS_LIST:
      return state.set('applicantInfoList', action.applicantInfo);

    case SET_MESSAGE:
      return state.set('message', action.message);

    case SET_LOADER:
      return state.set('loader', action.loader);

    default:
      return state;
  }
}

// immutability helpers
// function insertItemImHelper(array, action) {
//   let newArray = array.slice()
//   newArray.splice(array.length, 0, action.additionalInfo)
//   return newArray
// }

export default applicationFormReducer;
