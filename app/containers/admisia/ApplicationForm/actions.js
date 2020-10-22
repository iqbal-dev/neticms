/*
 *
 * ApplicationForm actions
 *
 */

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
  SET_APPLICANT_VIEW
 } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function makeChangeApplicantName(applicantName) {
  return {
    type: SET_ON_CHANGE_APPLICANT_NAME,
    applicantName
  };
}

export function makeChangeGender(gender) {
  return {
    type: SET_ON_CHANGE_GENDER,
    gender
  };
}

export function makeChangeReligion(religion) {
  return {
    type: SET_ON_CHANGE_RELIGION,
    religion
  };
}

export function makeChangeDob(dob) {
  return {
    type: SET_ON_CHANGE_DOB,
    dob
  };
}

export function makeChangeBirthCertificateNo(birthCertificateNo) {
  return {
    type: SET_ON_CHANGE_BIRTH_CERTIFICATE_NO,
    birthCertificateNo
  };
}

export function makeChangeQuota(quota) {
  return {
    type: SET_ON_CHANGE_QUOTA,
    quota
  };
}

export function makeChangeFileName(fileName) {
  return {
    type: SET_ON_CHANGE_File_NAME,
    fileName
  };
}

export function makeChangeFileContent(fileContent) {
  return {
    type: SET_ON_CHANGE_File_CONTENT,
    fileContent
  };
}

export function makeChangeFileSave(fileSave) {
  console.log("fileSave", fileSave);
  return {
    type: SET_ON_CHANGE_File_SAVE,
    fileSave
  };
}

export function makeChangeMobileNo(mobileNo) {
  return {
    type: SET_ON_CHANGE_MOBILE_NO,
    mobileNo
  };
}

export function makeChangeAddressDetails(addressDetails) {
  return {
    type: SET_ON_CHANGE_ADDRERSS,
    addressDetails
  };
}



export function makeChangeFatherName(fatherName) {
  return {
    type: SET_ON_CHANGE_FATHER_NAME,
    fatherName
  };
}

export function makeChangeFatherOccupation(fatherOccupation) {
  return {
    type: SET_ON_CHANGE_FATHER_OCCUPATION,
    fatherOccupation
  };
}

export function makeChangeFatherNidNo(fatherNidNo) {
  return {
    type: SET_ON_CHANGE_FATHER_NID_NO,
    fatherNidNo
  };
}

export function makeChangeMotherName(motherName) {
  return {
    type: SET_ON_CHANGE_MOTHER_NAME,
    motherName
  };
}

export function makeChangeMotherOccupation(motherOccupation) {
  return {
    type: SET_ON_CHANGE_MOTHER_OCCUPATION,
    motherOccupation
  };
}

export function makeChangeMotherNidNo(motherNidNo) {
  return {
    type: SET_ON_CHANGE_MOTHER_NID_NO,
    motherNidNo
  };
}


export function makeChangeInstituteName(instituteName) {
  return {
    type: SET_ON_CHANGE_INSTITUTE_NAME,
    instituteName
  };
}

export function makeChangeInstituteType(instituteType) {
  return {
    type: SET_ON_CHANGE_INSTITUTE_TYPE,
    instituteType
  };
}

export function makeChangeBoardName(boardName) {
  return {
    type: SET_ON_CHANGE_BOARD_NAME,
    boardName
  };
}

export function makeChangeClassName(className) {
  return {
    type: SET_ON_CHANGE_CLASS_NAME,
    className
  };
}

export function makeChangeRollNo(rollNo) {
  return {
    type: SET_ON_CHANGE_ROLL_NO,
    rollNo
  };
}

export function makeChangeRegistrationNo(registrationNo) {
  return {
    type: SET_ON_CHANGE_REGISTRATION_NO,
    registrationNo
  };
}

export function makeChangeExamName(examName) {
  return {
    type: SET_ON_CHANGE_EXAM_NAME,
    examName
  };
}

export function makeChangeExamGrade(examGrade) {
  return {
    type: SET_ON_CHANGE_EXAM_GRADE,
    examGrade
  };
}

export function makeChangeExamGpa(examGpa) {
  return {
    type: SET_ON_CHANGE_EXAM_GPA,
    examGpa
  };
}

export function makeChangePassingYear(passingYear) {
  return {
    type: SET_ON_CHANGE_PASSING_YEAR,
    passingYear
  };
}

export function makeChangeSubmitAdditionalInfo(additionalInfo) {
  // console.log("additionalInfo", additionalInfo);
  return {
    type: SET_ON_SUBMIT_ADDITIONAL_INFO,
    additionalInfo
  };
}

export function makeSubmitInsertApplicantInfo(insertApplicantInfo) {
  console.log("insertApplicantInfo", insertApplicantInfo);
  return {
    type: SET_ON_SUBMIT_INSERT_APPLICANT_INFO,
    insertApplicantInfo
  };
}



export function makeChangeApplicantInfo(applicantInfo) {
  console.log("applicantInfo", applicantInfo);
  return {
    type: SET_ON_CHANGE_APPLICANT_INFO,
    applicantInfo
  };
}

export function setApplicantPersonalView(applicantView) {
  console.log("applicantView", applicantView);
  return {
    type: SET_APPLICANT_VIEW,
    applicantView
  };
}

  // setApplicantPersonalView
