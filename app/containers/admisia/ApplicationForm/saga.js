import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import { 
  BASE_URL_NETI_CMS, 
  insert_applicant_info,
  fetch_Applicant_Personal_View_By_RegistrationId,
 } from '../../../utils/serviceUrl';
import { SET_ON_SUBMIT_INSERT_APPLICANT_INFO } from './constants';
import { makeSelectInsertApplicantInfo } from './selectors';
import { setApplicantPersonalView } from './actions';


export function* submitApplicantInfo() {

  let insertApplicantInfo = yield select(makeSelectInsertApplicantInfo());
  console.log("INSERT OBJ", insertApplicantInfo);

  let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
  let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
  
  const requestURL = BASE_URL_NETI_CMS.concat(insert_applicant_info);
  // const requestURLforAdmissionYear = BASE_URL_NETI_CMS.concat(fetch_coreConfigListBy_cmsId).concat('?cmsId=').concat(cmsID);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insertApplicantInfo)
  };

  // yield put(setDataTableLoader(true));

  
  try {
    const response = yield call(request, requestURL, options);
    console.log('SUBMIT::::', response);
    getApplicantPersonalView(response.registrationId)
  } catch (error) { }
  
}

export function* getApplicantPersonalView(regId) {
  // const requestURL = BASE_URL_NETI_CMS.concat(insert_applicant_info);
  const requestURL = BASE_URL_NETI_CMS.concat(fetch_Applicant_Personal_View_By_RegistrationId).concat('?registrationId=').concat(regId);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  // yield put(setDataTableLoader(true));
  try {
    // const response = yield call(request, requestURL, options);

    let response = {
      "message": "Ok",
      "messageType": 1,
      "item": {
          "applicantPersonalViewResponse": {
              "applicantId": 19,
              "registrationId": "210000013",
              "applicantName": "Shahrear",
              "rollNo": 100013,
              "mobileNo": "01675886072",
              "gender": "Male",
              "religion": "Islam",
              "dob": "2020-10-26",
              "birthCertificateNo": "123456789",
              "fatherName": "Rulul Amin",
              "fatherNidNo": "123123123",
              "fatherOccupation": "Govt. Service Holder",
              "motherName": "Jobeda Khatun",
              "motherNidNo": "321321321",
              "motherOccupation": "Teacher",
              "addressDetails": "test details",
              "applicationDate": "2020-10-19T04:27:54.000+00:00",
              "statusUpdateDate": "2020-10-19T04:51:29.000+00:00",
              "applicantStatus": 5,
              "applicantFeeStatus": 0,
              "quota": "Departmental",
              "fileName": "4_210000013_applicantjpg",
              "fileContent": "",
              "academicYear": 2021,
              "className": "Five",
              "groupName": "Science",
              "applicationStartDate": "2020-10-17",
              "applicationEndDate": "2020-10-27",
              "totalFee": 120.0,
              "admissionExamStatus": 1,
              "autoApproveStatus": 0
          },
          "applicantPreviousExamViewResponses": [
              {
                  "previousExamId": 5,
                  "instituteType": "Primary School",
                  "instituteName": "inst 1",
                  "boardName": null,
                  "examName": "psc",
                  "rollNo": 123,
                  "registrationNo": "321",
                  "examGrade": "A+",
                  "examGpa": 5.0,
                  "passingYear": 2016,
                  "className": "c5"
              },
              {
                  "previousExamId": 6,
                  "instituteType": "High School",
                  "instituteName": "inst 2",
                  "boardName": null,
                  "examName": "jsc",
                  "rollNo": 888,
                  "registrationNo": "789",
                  "examGrade": "A",
                  "examGpa": 4.5,
                  "passingYear": 2019,
                  "className": "c8"
              }
          ]
      }
    }
    console.log('APPLICANT VIEW:::', response);
    // yield put(setApplicantPersonalView(response.item));

  } catch (error) { }
}

// Individual exports for testing
export default function* applicationFormSaga() {
  yield takeLatest(SET_ON_SUBMIT_INSERT_APPLICANT_INFO, submitApplicantInfo)
  yield getApplicantPersonalView(123)
}
