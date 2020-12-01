/**
 *
 * ApplicationForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectApplicationForm, {
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
  makeSelectAdditionalInfo,
  makeSelectClassName,
  makeSelectRollNo,
  makeSelectRegistrationNo,
  makeSelectExamName,
  makeSelectExamGrade,
  makeSelectExamGpa,
  makeSelectPassingYear,
  makeSelectApplicantView,
  makeSelectApplicantInfoList,
  makeSelectMessage,
  makeSelectLoader,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeChangeApplicantInfo,
  makeChangeApplicantName,
  makeChangeGender,
  makeChangeReligion,
  makeChangeDob,
  makeChangeBirthCertificateNo,
  makeChangeQuota,
  makeChangeFileName,
  makeChangeFileContent,
  makeChangeFileSave,
  makeChangeMobileNo,
  makeChangeAddressDetails,

  makeChangeFatherName,
  makeChangeFatherOccupation,
  makeChangeFatherNidNo,
  makeChangeMotherName,
  makeChangeMotherOccupation,
  makeChangeMotherNidNo,

  makeChangeInstituteType,
  makeChangeInstituteName,
  makeChangeBoardName,
  makeChangeClassName,
  makeChangeRollNo,
  makeChangeRegistrationNo,
  makeChangeExamName,
  makeChangeExamGrade,
  makeChangeExamGpa,
  makeChangePassingYear,

  makeChangeSubmitAdditionalInfo,
  makeSubmitInsertApplicantInfo,
  setMessage

} from './actions';

import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import {
  CustomInput, FormGroup, Input, Label, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from 'reactstrap';
import staticImg from '../../../assets/img/demo-image.jpg';
import { get_DDMMM_YY_Format_WithComma, get_Only_Year } from '../../../utils/dateFormat';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { insert_applicant_info } from '../../../utils/serviceUrl';

// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import DatePicker from "react-modern-calendar-datepicker";

import { ImageCropper } from '../../../components/common/ImageCropper';
import { getFileContentType, getMaxFileSizeIsValid } from '../../../utils/FileHandler';
import { Link } from 'react-router-dom';
import succesImage from './succesImage.png';
import { centerTableLoader, inputFieldLoaderLarge } from '../../../utils/contentLoader';
// import { ProgressBar } from 'primereact/progressbar';
import { LinearProgress } from '@material-ui/core';

let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
let cmsID = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;

export class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admissionObj: props.location.admissionObj,
      insertUserObj: {
        "cmsId": cmsID,
        "academicYear": props.location.admissionObj && props.location.admissionObj.currentAcademicYear,
        "admisiaClassConfigId": props.location.admissionObj && props.location.admissionObj.classConfigId,

        "applicantName": "",
        "gender": "",
        "religion": "",
        "dob": "N/A",
        "birthCertificateNo": "",
        "quota": "",
        "fileContent": "",
        "fileName": "",
        "fileSave": false,
        "mobileNo": "",
        "addressDetails": "",

        "fatherName": "",
        "fatherOccupation": "",
        "fatherNidNo": "",
        "motherName": "",
        "motherOccupation": "",
        "motherNidNo": "",

        "additionalInfos": [],
      },
      uploadFile: {
        fileName: '',
        fileContent: '',
        fileSaveOrEditable: false
      },
      cropperVisible: false,
      cropperObject: {
        //main class parameter
        main: {
          viewport: { width: 270, height: 270 },
          boundary: { width: 350, height: 350 },
          showZoomer: true,
          enableOrientation: false,
        },
        //bind parameter
        bind: {
          url: '',
          orientation: 4
        }
      },
      pageFirst: true,
      pageSecond: false,
      pageThird: false,
      examInfoDialogVisible: false,
      deleteDialogVisible: false,
      isCheckAgreement: false,
      errors: {},
      additionalInfoId: "",
      mobileOperatorError: false,
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  componentDidMount() {
    if (this.props.getApplicantView.applicantPersonalViewResponse) {
      this.setState({ pageFirst: false, pageSecond: false, pageThird: true })
    }
  }

  onChangeMobileNo = (value) => {

    var filteredValue = value.replace(/\D/g, "");
    this.props.mobileNo(filteredValue);

    if (filteredValue.length > 2) {
      this.immediateValidOpCheck(filteredValue);
    } else {
      this.setState({ mobileOperatorError: false });
    }

  }

  immediateValidOpCheck = (value) => {

    var opCode = value.substring(0, 3);
    if (!["011", "015", "016", "018", "017", "013", "019", "014"].includes(opCode)) {
      console.log('invalid mobile operator');
      this.setState({ mobileOperatorError: true });
    } else {
      this.setState({ mobileOperatorError: false });
    }

  }

  handleError() {

    let formIsValid = true;
    let { errors } = this.state;

    if (!this.props.getApplicantName) {
      formIsValid = false;
      errors["applicantName"] = "Applicant Name can't left empty.";
    }

    if (!this.props.getGender) {
      formIsValid = false;
      errors["gender"] = "Gender can't left empty.";
    }

    if (!this.props.getReligion) {
      formIsValid = false;
      errors["religion"] = "Religion can't left empty.";
    }

    if (!this.props.getDob) {
      formIsValid = false;
      errors["dob"] = "Date can't left empty.";
    }

    // if (!this.props.getBirthCertificateNo) {
    //   formIsValid = false;
    //   errors["birthCertificateNo"] = "Birth Certificate No. can't left empty.";
    // }

    if (!this.props.getQuota) {
      formIsValid = false;
      errors["quota"] = "Quota can't left empty.";
    }

    if (!this.props.getFileContent) {
      formIsValid = false;
      errors["image"] = "Image can't left empty.";
    }

    if (!this.props.getMobileNo) {
      this.setState({ mobileOperatorError: false });
      formIsValid = false;
      errors["mobileNo"] = "Mobile No. can't left empty.";
    } else if (!this.validOperatorCode(this.props.getMobileNo)) {
      errors["mobileNo"] = " Valid BD phone no. is required.";
      formIsValid = false;
    }

    if (!this.props.getAddressDetails) {
      formIsValid = false;
      errors["addressDetails"] = "Address Details can't left empty.";
    }

    if (!this.props.getFatherName) {
      formIsValid = false;
      errors["fatherName"] = "Father's Name can't left empty.";
    }

    if (!this.props.getFatherOccupation) {
      formIsValid = false;
      errors["fatherOccupation"] = "Father's Occupation can't left empty.";
    }

    // if (!this.props.getFatherNidNo) {
    //   formIsValid = false;
    //   errors["fatherNidNo"] = "Father's NID can't left empty.";
    // }

    if (!this.props.getMotherName) {
      formIsValid = false;
      errors["motherName"] = "Mother's Name can't left empty.";
    }

    if (!this.props.getMotherOccupation) {
      formIsValid = false;
      errors["motherOccupation"] = "Mother's Occupation can't left empty.";
    }

    // if (!this.props.getMotherNidNo) {
    //   formIsValid = false;
    //   errors["motherNidNo"] = "Mother's NID can't left empty.";
    // }

    if (this.state.admissionObj && this.state.admissionObj.prevExamInfoRequiredStatus == 1 && !this.props.getAdditionalInfo.length) {
      formIsValid = false;
      errors["preExamInfo"] = "Previous Exam can't left empty.";
    }

    // this.props.getFatherName

    this.setState({ errors });
    return formIsValid;
  }

  validOperatorCode = () => {
    var opCode = this.props.getMobileNo.substring(0, 3);
    if (["011", "015", "016", "018", "017", "013", "019", "014"].includes(opCode) && this.props.getMobileNo.length === 11) { return true; }
  }

  showNextPage = () => {

    let { insertUserObj } = this.state

    if (this.handleError()) {

      if (!this.state.pageThird) {
        this.setState({ pageFirst: false, pageSecond: true, pageThird: false });
      }

      if (!this.state.pageFirst && this.state.pageSecond) {
        this.setState({ pageFirst: false, pageSecond: false, pageThird: true });

        insertUserObj.applicantName = this.props.getApplicantName
        insertUserObj.gender = this.props.getGender
        insertUserObj.religion = this.props.getReligion
        insertUserObj.dob = this.props.getDob
        insertUserObj.birthCertificateNo = this.props.getBirthCertificateNo
        insertUserObj.quota = this.props.getQuota
        insertUserObj.fileName = this.props.getFileName
        insertUserObj.fileContent = this.props.getFileContent
        insertUserObj.fileSave = true
        insertUserObj.mobileNo = this.props.getMobileNo
        insertUserObj.addressDetails = this.props.getAddressDetails

        insertUserObj.fatherName = this.props.getFatherName
        insertUserObj.fatherOccupation = this.props.getFatherOccupation
        insertUserObj.fatherNidNo = this.props.getFatherNidNo
        insertUserObj.motherName = this.props.getMotherName
        insertUserObj.motherOccupation = this.props.getMotherOccupation
        insertUserObj.motherNidNo = this.props.getMotherNidNo

        insertUserObj.additionalInfos = this.props.getAdditionalInfo

        this.setState({ insertUserObj })

        this.props.onSubmitInsertApplicantInfo(insertUserObj)
      }

      // this.props.setApplicantInfo(this.state.insertUserObj)

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  showPreviousPage = () => {
    this.setState({ pageFirst: true, pageSecond: false, pageThird: false });
  }

  handleAdditionalInfoError() {

    let formIsValid = true;
    let { errors } = this.state;

    if (!this.props.getInstituteName) {
      formIsValid = false;
      errors["instituteName"] = "Institute Name can't left empty.";
    }

    if (!this.props.getInstituteType) {
      formIsValid = false;
      errors["instituteType"] = "Institute Type can't left empty.";
    }

    if (!this.props.getBoardName) {
      formIsValid = false;
      errors["boardName"] = "Board Name can't left empty.";
    }

    if (!this.props.getClassdName) {
      formIsValid = false;
      errors["className"] = "Class Name can't left empty.";
    }

    if (!this.props.getRollNo) {
      formIsValid = false;
      errors["rollNo"] = "Roll No. can't left empty.";
    }

    // if (!this.props.getRegistrationNo) {
    //   formIsValid = false;
    //   errors["registrationNo"] = "Registration No. can't left empty.";
    // }

    if (!this.props.getExamName) {
      formIsValid = false;
      errors["examName"] = "Exam Name No. can't left empty.";
    }

    if (!this.props.getExamGrade) {
      formIsValid = false;
      errors["examGrade"] = "Exam Grade can't left empty.";
    }

    if (!this.props.getExamGpa) {
      formIsValid = false;
      errors["examGpa"] = "Exam GPA can't left empty.";
    }

    if (!this.props.getPassingYear) {
      formIsValid = false;
      errors["passingYear"] = "Passing Year can't left empty.";
    }

    this.setState({ errors });
    return formIsValid;
  }

  onSubmitAdditionalInfo = () => {

    let { insertUserObj, errors, additionalInfoId } = this.state;
    // console.log("this.props.submitAdditionalInfo", insertUserObj.additionalInfos.length);

    if (this.handleAdditionalInfoError()) {
      let additionalInfo = {
        // id: !insertUserObj.additionalInfos.length ? 0 : insertUserObj.additionalInfos.length,
        instituteName: this.props.getInstituteName,
        instituteType: this.props.getInstituteType,
        boardName: this.props.getBoardName,
        className: this.props.getClassdName,
        rollNo: this.props.getRollNo,
        registrationNo: this.props.getRegistrationNo,
        examName: this.props.getExamName,
        examGrade: this.props.getExamGrade,
        examGpa: this.props.getExamGpa,
        passingYear: this.props.getPassingYear,
      }

      errors["preExamInfo"] = ""

      if (additionalInfoId === "") {
        additionalInfo.id = !insertUserObj.additionalInfos.length ? 0 : insertUserObj.additionalInfos.length
        insertUserObj.additionalInfos.push(additionalInfo)
      }
      else if (additionalInfoId >= 0) {

        // console.log("insertUserObj.additionalInfos[additionalInfoId]", insertUserObj.additionalInfos[additionalInfoId]);
        additionalInfo.id = additionalInfoId
        insertUserObj.additionalInfos[additionalInfoId] = additionalInfo

      }

      this.setState({ insertUserObj });
      this.props.submitAdditionalInfo(insertUserObj.additionalInfos);
      this.setState({ examInfoDialogVisible: false });

    }

  }

  onDeleteAdditionalInfo = (id) => {
    let { insertUserObj } = this.state;
    let { getAdditionalInfo } = this.props;

    let filteredElement = getAdditionalInfo.filter(item => item.id !== id)
    // console.log("filteredElement", filteredElement)
    insertUserObj.additionalInfos = filteredElement;

    this.props.submitAdditionalInfo(filteredElement);
    this.setState({ deleteDialogVisible: false, insertUserObj });
    this.resetApplicantPreviousExamData();
  }

  onEditAdditionalInfo = (id) => {

    let { insertUserObj, examInfoDialogVisible, additionalInfoId } = this.state
    let { getAdditionalInfo } = this.props;
    // insertUserObj.additionalInfos = this.props.getAdditionalInfo
    this.setState({ examInfoDialogVisible: true });

    let filteredElement = getAdditionalInfo.filter(item => item.id == id)
    // console.log("EDITfilteredElement", filteredElement);

    additionalInfoId = filteredElement[0].id
    this.setState({ additionalInfoId })
    this.props.instituteName(filteredElement[0].instituteName)
    this.props.instituteType(filteredElement[0].instituteType)
    this.props.boardName(filteredElement[0].boardName)
    this.props.className(filteredElement[0].className)
    this.props.rollNo(filteredElement[0].rollNo)
    this.props.registrationNo(filteredElement[0].registrationNo)
    this.props.examName(filteredElement[0].examName)
    this.props.examGrade(filteredElement[0].examGrade)
    this.props.examGpa(filteredElement[0].examGpa)
    this.props.passingYear(filteredElement[0].passingYear)

    // let newElement = getAdditionalInfo.filter(item => item.id !== id)
    // this.props.submitAdditionalInfo(newElement);
  }

  onLoadPic = (e) => {

    // console.log('fileType e', event);
    let { errors, cropperObject } = this.state;
    // this.emptyErrorMessage();

    let fileType = getFileContentType(event.target.files[0].name);
    let supportedExtention = ['data:image/jpeg;base64,', 'data:image/jpg;base64,', 'data:image/png;base64,'];

    // console.log('fileType', fileType, " | ", supportedExtention.includes(fileType));

    if (supportedExtention.includes(fileType)) {

      var reader = new FileReader();
      let photo = event.target.files[0];
      const scope = this
      reader.readAsDataURL(photo);
      reader.onload = () => {
        let content = reader.result;
        var keyw = 'data:' + photo.type + ';base64,'; //link will be same from the word webapps in URL
        var urlStr = content.substring(content.indexOf(keyw) + keyw.length);
        let album = {
          fileContent: urlStr,
          fileName: photo.name,
          fileSaveOrEditable: true
        };
        scope.setState({ uploadFile: album });
        scope.props.fileName(album.fileName)
        // scope.props.fileContent(album.fileContent)
        // scope.props.fileSave(album.fileSaveOrEditable)
      }

      // console.log(' photo.objectURL',  URL.createObjectURL(photo));
      errors["image"] = '';
      cropperObject.bind.url = URL.createObjectURL(photo);
      this.setState({ errors, cropperObject, cropperVisible: true });

    }
    else {
      errors["image"] = "File format not supported";
      this.setState({ errors });
    }

  }

  getCroppedResult = (imageObj) => {

    let { uploadFile, errors } = this.state;

    let maxSize = getMaxFileSizeIsValid(imageObj.photoBlob.size, 500000);
    if (maxSize) {
      uploadFile.fileContent = imageObj.contentPic;
      // this.props.fileName(imageObj.fileName)
      this.props.fileContent(imageObj.contentPic)
      this.props.fileSave(true)
      errors["image"] = '';
      this.setState({ errors: errors });
    } else {
      errors["image"] = "Image size can't be more than 500 KB";
      this.setState({ errors });
      this.removeCropSection();
    }

    this.hideImageCropper();
    this.setState({ uploadFile });
  }

  removeCropSection = () => {

    let { uploadFile } = this.state;
    uploadFile.fileName = '';
    uploadFile.fileContent = '';
    uploadFile.fileSaveOrEditable = false;

    this.setState({ sliderCropperVisible: false, cropperVisible: false, uploadFile });
  }

  hideImageCropper = () => {
    this.setState({ cropperVisible: false });
  }

  checkAgreement = () => {
    this.setState({ isCheckAgreement: !this.state.isCheckAgreement });
  }

  resetApplicationFormData = () => {
    this.props.applicantName('');
    this.props.gender('');
    this.props.religion('');
    this.props.dob('');
    this.props.birthCertificateNo('');
    this.props.quota('');

    this.props.fileName('');
    this.props.fileContent('');
    this.props.fileSave(false);

    this.props.mobileNo('');
    this.props.addressDetails('');

    this.props.fatherName('');
    this.props.fatherOccupation('');
    this.props.fatherNidNo('');
    this.props.motherName('');
    this.props.motherOccupation('');
    this.props.motherNidNo('');

    this.props.instituteName('');
    this.props.instituteType('');
    this.props.boardNam('');
    this.props.className('');
    this.props.rollNo('');
    this.props.registrationNo('');
    this.props.examName('');
    this.props.examGrade('');
    this.props.examGpa('');
    this.props.passingYear('');
    this.props.setMessage('');
  }

  resetApplicantPreviousExamData = () => {
    this.props.instituteName('');
    this.props.instituteType('');
    this.props.boardName('');
    this.props.className('');
    this.props.rollNo('');
    this.props.registrationNo('');
    this.props.examName('');
    this.props.examGrade('');
    this.props.examGpa('');
    this.props.passingYear('');
  }

  render() {

    let { admissionObj, errors } = this.state;
    let { getAdditionalInfo, getApplicantView } = this.props;

    // console.log("main-getAdditionalInfo", getAdditionalInfo);
    // console.log("getApplicantView", getApplicantView);

    console.log(" this.props.loader", this.props.loader);

    const examInfoDialog = () => {
      this.resetApplicantPreviousExamData();
      this.setState({ examInfoDialogVisible: !this.state.examInfoDialogVisible, additionalInfoId: '' });
    };

    const deleteDialog = (id) => {
      this.setState({ deleteDialogVisible: !this.state.deleteDialogVisible, deletePreExamId: id });
    }

    const maleOccupations = [
      'Doctor', 'Engineer', 'Civil Engineer', 'Scientist', 'Lawyer', 'Businessman', 'Teacher',
      'BGB', 'Army', 'Police', 'Govt. Service Holder', 'Pvt. Service Holder', 'Social Worker',
      'Farmer', 'Shopkeeper', 'Technician', 'Others'
    ]

    const femaleOccupations = [
      'Doctor', 'Engineer', 'Civil Engineer', 'Scientist', 'Lawyer', 'Businessman', 'Teacher', 'Housewife',
      'BGB', 'Army', 'Police', 'Govt. Service Holder', 'Pvt. Service Holder', 'Social Worker',
      'Shopkeeper', 'Technician', 'Others'
    ]

    let date = new Date();
    let year = date.getFullYear();
    let passingYear = [];
    for (let i = 0; i < 10; i++) {
      passingYear.push(year - i)
    }

    // console.log('state.additionalInfoId', this.state.insertUserObj.additionalInfos);
    // console.log('getApplicantView.applicantPersonalViewResponse', getApplicantView);

    return (
      <div class="admisia">
        <AppLayout>
          <Helmet>
            <title>ApplicationForm</title>
            <meta name="description" content="Description of ApplicationForm" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Apply"
            menuStepFirst="Online Admission"
            menuStepSenond="Addmission"
            menuStepThird="Application Form"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">

                {this.props.message.messageType == 1 ? <Alert color="success">
                  {this.props.message.message}
                </Alert> : this.props.message.messageType == 0 ? <Alert color="danger">
                  {this.props.message.message}
                </Alert> : ''}

                {this.props.loader === "RegLoaderOn" || this.props.loader === "RNLoaderOn" ? <div className="m-b-10"> <LinearProgress style={{ height: '8px' }} /> </div> : ''}

                <div className="row m-0 text-center bg-smoke-white section-top-page">
                  <div className="col-xl-4 py-5 text-center one active">
                    <div className='page'>1</div>
                    <div>Information</div>
                  </div>
                  <div className={this.state.pageSecond || this.state.pageThird ? "col-xl-4 py-5 two active" : "col-xl-4 py-5 two "} >
                    <div className='page'>2</div>
                    <div>Review</div>
                  </div>
                  <div className={this.state.pageThird ? "col-xl-4 py-5 three active" : "col-xl-4 py-5 three "}>
                    <div className='page'>3</div>
                    <div>Completed</div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className={!this.state.pageFirst ? "m-t-20" : ""}>
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            {this.state.pageFirst ?
                              <th>Academic Year: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.academicYear) || (admissionObj && admissionObj.currentAcademicYear)}</th>
                              : <th>Application Information</th>}

                            {this.state.pageFirst ?
                              <th className="text-right"><span>Application End Date : {get_DDMMM_YY_Format_WithComma((getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicationEndDate) || (admissionObj && admissionObj.applicationEndDate))}</span></th>
                              : <th></th>}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      {/* <Label for="class-group" className="text-primary-light"><small>CLASS & GROUP </small></Label> */}
                                      <Label for="class-group" className="admisia-level">CLASS & GROUP</Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        value={(admissionObj && admissionObj.className) + " ( " + (admissionObj && admissionObj.groupName) + " )"}
                                        readOnly
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4"></div>
                                  <div className="col-xl-4 text-right my-auto text-primary">
                                    <small>Application Fee -</small> {admissionObj && admissionObj.totalFee} TK (BDT)
                                  </div>

                                </div>
                              </td>
                            </tr>

                            : this.state.pageSecond || this.state.pageThird ?
                              <tr>
                                <td>
                                  <div className="row">
                                    <div class="col-xl-12">
                                      <div class=" student-details-info">
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Class</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.className) || (admissionObj && admissionObj.className)}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Group</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.groupName) || (admissionObj && admissionObj.groupName)}</div>
                                        {this.state.pageThird ?
                                          <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Roll No.</label>:
                                           {this.props.loader === "RegLoaderOn" || this.props.loader === "RNLoaderOn" ? inputFieldLoaderLarge() : <span className="text-orange text-bold margin-l-4 font-s-20">{this.props.applicantInfoList && this.props.applicantInfoList.rollNo}</span>}</div>
                                          : null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div className="row">
                                    <div class="col-xl-12">
                                      <div class="student-details-info ml-auto">
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Academic Year</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.academicYear) || (admissionObj && admissionObj.currentAcademicYear)}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application End Date</label>: {get_DDMMM_YY_Format_WithComma((getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicationEndDate) || (admissionObj && admissionObj.applicationEndDate))}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.totalFee) || (admissionObj && admissionObj.totalFee)} TK</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              : null

                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                {this.state.pageFirst ?
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="my-3">    {/*page-inner-title*/}
                        <h2 className="d-flex justify-content-center">
                          <span className="text-orange text-bold "> Application Form - {admissionObj && admissionObj.currentAcademicYear}</span>
                        </h2>
                        {/* <div className="custom-title-border-left"></div> */}
                      </div>
                    </div>
                  </div>
                  : ''}

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th colSpan="3">Personal Information</th>
                            {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">STUDENT NAME <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Student Name"
                                        value={this.props.getApplicantName}
                                        onChange={(e) => { this.props.applicantName(e); this.state.errors["applicantName"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['applicantName']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown mb-3">
                                      <Label for="class-group" className="admisia-level">GENDER <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select Gender"
                                        value={this.props.getGender}
                                        onChange={(e) => { this.props.gender(e); this.state.errors["gender"] = '' }}
                                      >
                                        <option hidden value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                      </Input>
                                      <span className='error-message'>{errors['gender']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="admisia-level">RELIGION <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select Religion"
                                        value={this.props.getReligion}
                                        onChange={(e) => { this.props.religion(e); this.state.errors["religion"] = '' }}
                                      >
                                        <option hidden value="">Select Religion</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Hinduism">Hinduism</option>
                                        <option value="Buddhism">Buddhism</option>
                                        <option value="Christianity">Christianity</option>
                                        <option value="Others">Others</option>
                                      </Input>
                                      <span className='error-message'>{errors['religion']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-datepicker">
                                      <Label for="class-group" className="admisia-level">DATE OF BIRTH <span className="required">*</span></Label>

                                      {/* <br />
                                      <DatePicker

                                        value={this.props.getDob}
                                        onChange={(e) => { this.props.dob(e); this.state.errors["dob"] = '' }}
                                        inputPlaceholder="Select Date of Birth"
                                        shouldHighlightWeekends
                                        className="form-control dayPicker-custom-input bg-white border-0 rounded-0"
                                      /> */}

                                      <DatePicker
                                        placeholderText='Select Date'
                                        dateFormat="dd/MM/yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        isClearable
                                        fixedHeight
                                        maxDate={new Date()}
                                        selected={this.props.getDob}
                                        onChange={(e) => { this.props.dob(e); this.state.errors["dob"] = '' }}
                                        className="dayPicker-custom-input bg-white border-0 rounded-0"
                                        name='date'
                                        autoComplete="off"
                                      />
                                      <span className='error-message'>{errors['dob']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">BIRTH REG. NO. </Label><span className='f-right'> (optional)</span>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="number"
                                        min={0} type="number" step="1"
                                        name="class-group"
                                        placeholder="Enter Birth Reg. No."
                                        value={this.props.getBirthCertificateNo}
                                        onChange={(e) => { this.props.birthCertificateNo(e); }}
                                      // this.state.errors["birthCertificateNo"] = ''
                                      >
                                      </Input>
                                      {/* <span className='error-message'>{errors['birthCertificateNo']}</span> */}
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="admisia-level">QUOTA <span className="required">*</span> </Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select Your Quota"
                                        value={this.props.getQuota}
                                        onChange={(e) => { this.props.quota(e); this.state.errors["quota"] = ''; }}

                                      >
                                        <option hidden value="">Select Your Quota</option>
                                        <option value="BGB">BGB</option>
                                        <option value="Army">Army</option>
                                        <option value="Police">Police</option>
                                        <option value="Freedom Fighter">Freedom Fighter</option>
                                        <option value="Physically Handicapped">Physically Handicapped</option>
                                        <option value="Govt. Employee">Govt. Employee</option>
                                        <option value="Departmental">Departmental</option>
                                        <option value="Woman">Woman</option>
                                        <option value="Tribes">Tribes</option>
                                        <option value="Sibling">Sibling</option>
                                        <option value="Not Applicable">Not Applicable</option>
                                      </Input>
                                      <span className='error-message'>{errors['quota']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-upload">
                                      <Label for="class-group" className="admisia-level">PHOTO <span className="required">*</span></Label>
                                      <CustomInput
                                        label="Choose a photo"
                                        className=" bg-white border-0 rounded-0"
                                        type="file"
                                        id="exampleCustomFileBrowser"
                                        name="customFile"
                                        accept="image/*"
                                        onChange={e => this.onLoadPic(e)}
                                      />
                                      <span className='error-message'>{errors['image']}</span>
                                    </FormGroup>
                                    {
                                      this.state.uploadFile && this.state.uploadFile.fileContent && this.state.cropperVisible ?
                                        <ImageCropper
                                          cropperObject={this.state.cropperObject}
                                          getCroppedResult={this.getCroppedResult}
                                          removeCropSection={this.removeCropSection}
                                        />
                                        : ''
                                    }
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">GUARDIAN MOBILE NO. <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        maxLength="11"
                                        // maxSize=''
                                        // type="number"
                                        name="class-group"
                                        placeholder="Enter Mobile No."
                                        value={this.props.getMobileNo}
                                        // onChange={(e) => { this.props.mobileNo(e); this.state.errors["mobileNo"] = '' }}
                                        onChange={(e) => { this.onChangeMobileNo(e.target.value); this.state.errors["mobileNo"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['mobileNo']}</span>
                                      <span className='error-message'>{this.state.mobileOperatorError ? "Valid BD phone no. is required" : ""}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 d-flex align-items-center">
                                    <small className="text-orange">
                                      ***This number will be needed for further <br />
                                      communication. So, Please enter a valid contact no.***
                                    </small>
                                  </div>

                                  <div className="col-xl-8">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">ADDRESS <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="textarea"
                                        name="class-group"
                                        placeholder="Enter Address"
                                        style={{ height: "150px" }}
                                        value={this.props.getAddressDetails}
                                        onChange={(e) => { this.props.addressDetails(e); this.state.errors["addressDetails"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['addressDetails']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 d-flex align-items-center">
                                    {
                                      this.props.getFileContent ?
                                        <img src={"data:image/jpg;base64," + this.props.getFileContent} height="120px" /> : null
                                    }

                                  </div>

                                </div>
                              </td>
                              {/* <td>Test</td> */}
                            </tr>

                            : this.state.pageSecond || this.state.pageThird ?

                              <tr>
                                <td style={{ width: "232px" }} className="p-4">
                                  {/* { "data:image/jpg;base64," + this.props.getFileContent } */}

                                  {this.props.getFileContent ?
                                    <img src={"data:image/jpg;base64," + this.props.getFileContent} style={{ width: "232px" }} />
                                    : <img src={staticImg} style={{ width: "232px" }} />
                                  }

                                </td>
                                <td className="p-4">
                                  <div className="row">
                                    <div class="col-xl-12">
                                      <div class=" student-details-info">
                                        <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Student Name</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicantName) || this.props.getApplicantName}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.gender) || this.props.getGender}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.religion) || this.props.getReligion}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: {get_DDMMM_YY_Format_WithComma((getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.dob) || this.props.getDob)}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Birth Registration No.</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.birthCertificateNo) || this.props.getBirthCertificateNo}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Quota</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.quota) || this.props.getQuota}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.mobileNo) || this.props.getMobileNo}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.addressDetails) || this.props.getAddressDetails}</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              : null
                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped responsive className="application-form-table">
                        <thead>
                          <tr>
                            <th>Parents Information</th>
                            {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">FATHER'S NAME <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Father's Name"
                                        value={this.props.getFatherName}
                                        onChange={(e) => { this.props.fatherName(e); this.state.errors["fatherName"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['fatherName']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="admisia-level">FATHER'S OCCUPATION <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                        value={this.props.getFatherOccupation}
                                        onChange={(e) => { this.props.fatherOccupation(e); this.state.errors["fatherOccupation"] = '' }}
                                      >
                                        <option hidden value="">Select Father's Occupation</option>
                                        {maleOccupations.map(item =>
                                          <option value={item}> {item} </option>
                                        )}
                                      </Input>
                                      <span className='error-message'>{errors['fatherOccupation']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">FATHER'S NID</Label><span className='f-right'> (optional)</span>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="number"
                                        min={0} type="number" step="1"
                                        name="class-group"
                                        placeholder="Enter Father's NID (if any)"
                                        value={this.props.getFatherNidNo}
                                        onChange={(e) => { this.props.fatherNidNo(e); }}
                                      // this.state.errors["fatherNidNo"] = ''
                                      >
                                      </Input>
                                      {/* <span className='error-message'>{errors['fatherNidNo']}</span> */}
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">MOTHER'S NAME <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mother's Name"
                                        value={this.props.getMotherName}
                                        onChange={(e) => { this.props.motherName(e); this.state.errors["motherName"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['motherName']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="admisia-level">MOTHER'S OCCUPATION <span className="required">*</span></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        value={this.props.getMotherOccupation}
                                        onChange={(e) => { this.props.motherOccupation(e); this.state.errors["motherOccupation"] = '' }}
                                      >
                                        <option hidden value="">Select Mother's Occupation</option>
                                        {femaleOccupations.map(item =>
                                          <option value={item}> {item} </option>
                                        )}
                                      </Input>
                                      <span className='error-message'>{errors['motherOccupation']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="admisia-level">MOTHER'S NID</Label><span className='f-right'> (optional)</span>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text" type="number"
                                        min={0} type="number" step="1"
                                        name="class-group"
                                        placeholder="Enter Mother's NID (if any)"
                                        value={this.props.getMotherNidNo}
                                        onChange={(e) => { this.props.motherNidNo(e); }}
                                      >
                                      </Input>
                                      {/* <span className='error-message'>{errors['motherNidNo']}</span> */}
                                    </FormGroup>
                                  </div>

                                </div>
                              </td>
                            </tr>

                            : this.state.pageSecond || this.state.pageThird ?

                              <tr>
                                <td className="p-4">
                                  <div className="row">
                                    <div class="col-xl-12">
                                      <div class=" student-details-info">
                                        <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Father's Name</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.fatherName) || this.props.getFatherName}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Occupation</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.fatherOccupation) || this.props.getFatherOccupation}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's NID</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.fatherNidNo) || this.props.getFatherNidNo}</div>
                                        <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Mother's Name</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.motherName) || this.props.getMotherName}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Occupation</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.motherOccupation) || this.props.getMotherOccupation}</div>
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's NID</label>: {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.motherNidNo) || this.props.getMotherNidNo}</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              : null
                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                {admissionObj && admissionObj.prevExamInfoRequiredStatus == 1 ?
                  <div className="row mt-1">
                    <div className="col-xl-12">
                      <div className="">
                        <Table striped responsive className="application-form-table">
                          <thead>
                            <tr>
                              <th>Previous Exam Information</th>
                              {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  {this.state.pageFirst ?
                                    <React.Fragment>
                                      <div className="col-xl-12">
                                        <FormGroup className="mb-0">
                                          <Button
                                            className="btn all-border-radious no-border explore-btn border-0"
                                            onClick={examInfoDialog}
                                          >
                                            <i class="fas fa-plus" ></i> ADD INFO
                                        </Button>
                                        </FormGroup>
                                        <span className='error-message'>{errors['preExamInfo']}</span>
                                      </div>
                                    </React.Fragment>
                                    : null
                                  }

                                  <div className="col-xl-12 mt-3">
                                    <Table striped className="pre-exam-info-table">
                                      <thead>
                                        <tr>
                                          <th>INSTITUTE NAME</th>
                                          <th>INST. TYPE</th>
                                          <th>BOARD</th>
                                          <th>CLASS</th>
                                          <th>ROLL NO.</th>
                                          <th>REG. NO.</th>
                                          <th>EXAM</th>
                                          <th>GRADE </th>
                                          <th>GPA</th>
                                          <th>PASSING YEAR</th>
                                          {this.state.pageThird || this.state.pageSecond ? null : <th>Action</th>}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPreviousExamViewResponses) ?
                                          getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPreviousExamViewResponses.map((item, index) =>
                                            <tr>
                                              <td>{item.instituteName}</td>
                                              <td>{item.instituteType}</td>
                                              <td>{item.boardName}</td>
                                              <td>{item.className}</td>
                                              <td>{item.rollNo}</td>
                                              <td>{item.registrationNo}</td>
                                              <td>{item.examName}</td>
                                              <td>{item.examGrade}</td>
                                              <td>{item.examGpa}</td>
                                              <td>{item.passingYear}</td>

                                              {this.state.pageThird || this.state.pageSecond ? null :
                                                <td>
                                                  <div className="d-flex">
                                                    <Button className="btn btn-info mr-2" onClick={() => this.onEditAdditionalInfo(item.id)} /*onClick={ onEditAdditionalInfo }*/>
                                                      <i className="fas fa-pencil"></i>
                                                    </Button>
                                                    <Button className="btn btn-danger" onClick={() => deleteDialog(item.id)}>
                                                      <i className="fas fa-times"></i>
                                                    </Button>
                                                  </div>

                                                </td>
                                              }
                                            </tr>
                                          )
                                          :
                                          getAdditionalInfo && getAdditionalInfo.map((item, index) =>
                                            <tr>
                                              <td>{item.instituteName}</td>
                                              <td>{item.instituteType}</td>
                                              <td>{item.boardName}</td>
                                              <td>{item.className}</td>
                                              <td>{item.rollNo}</td>
                                              <td>{item.registrationNo}</td>
                                              <td>{item.examName}</td>
                                              <td>{item.examGrade}</td>
                                              <td>{item.examGpa}</td>
                                              <td>{item.passingYear}</td>

                                              {this.state.pageThird || this.state.pageSecond ? null :
                                                <td>
                                                  <div className="d-flex">
                                                    <Button className="btn btn-info mr-2" onClick={() => this.onEditAdditionalInfo(item.id)} /*onClick={ onEditAdditionalInfo }*/>
                                                      <i className="fas fa-pencil"></i>
                                                    </Button>
                                                    <Button className="btn btn-danger" onClick={() => deleteDialog(item.id)}>
                                                      <i className="fas fa-times"></i>
                                                    </Button>
                                                  </div>

                                                </td>
                                              }
                                            </tr>
                                          )
                                        }

                                      </tbody>
                                    </Table>
                                  </div>

                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                  : null
                }

                <div className="row mt-1 p-4">
                  <div className="col-xl-12 mb-2"><b>Agreement *</b></div>
                  <div className="col-xl-12 f-14">
                    {this.state.pageFirst ?
                      <span className="mr-2">
                        <Input
                          type="checkbox"
                          style={{ position: "relative", marginLeft: "0px" }}
                          onChange={this.checkAgreement}
                          checked={this.state.isCheckAgreement}
                        />
                      </span>
                      : null
                    }
                    I declare that the above mention information are correct. If any information provide by me is found false.<br />
                    The institute reserves the right to cancel my admission. I shall be obliged and obey all the rules & regulations of the institute.
                  </div>
                </div>

                {this.state.pageThird ?
                  <React.Fragment>

                    <div className="row mt-1">
                      <div className="col-xl-12">
                        <div className="">
                          <Table striped className="application-form-table">
                            <thead>
                              <tr>
                                <th>Success Message</th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr>
                                {this.props.loader === "RegLoaderOn" ? centerTableLoader() :
                                  <td colSpan="12" className="p-0 success-wrapper">

                                    <div className="col-xl-12 success-top-section">

                                      <img className="successImage" src={succesImage} width="100%" height="90" />
                                      <div className="col-xl-12 success-level text-orange">
                                        <h2 className="mb-0" style={{ marginTop: '12px' }}><b>Congratulation !!</b></h2>
                                        Application Submitted Successfully.
                                    </div>

                                    </div>

                                    <div className="col-xl-12 success-details font-w-401">
                                      Your Registration No.  <span className="text-orange" style={{ fontSize: 'x-large' }}> <strong>{this.props.applicantInfoList.registrationId}</strong></span>, Please keep this number to pay the application fee {admissionObj.totalFee}.00/= taka.
                                      <br />
                                      <p className="m-t-8 font-w-401 ">
                                        <strong> N.B: </strong>  Please preserve your "Registration No." You will need Registration No. to complete payment procedure, to download Admit Card and<br />also for further inquiries. <br />
                                      </p>
                                    </div>

                                    <div className="col-xl-12 success-bottom-section ">
                                      <img className="successImage" src={succesImage} width="100%" height="90" />
                                    </div>

                                    {/* <div className="col-xl-12">
                                    <h4 className="mb-3"><u><b>Follow The Steps</b></u></h4>
                                    <small>
                                      01. Go to Your Bkash Mobile app/dial code <br />
                                      02. Choose ''Pay bill'' option <br />
                                      03. Select Admisia option <br />
                                      04. Enter the student registration no. <br />
                                      05. After enter student registration you see the fees that you would be pay <br />
                                      06. Now enter your Bkash mobile menu PIN to conform <br /><br />

                                      <strong> N.B: </strong>  Please preserve your "Registration No." You will need Registration No. to complete payment procedure, to download Admit and also further inquiries. <br />
                                    </small>
                                  </div> */}

                                  </td>
                                }
                              </tr>

                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 text-right d-flex justify-content-end mt-4">
                      <FormGroup >
                        <Link
                          className="btn all-border-radious no-border explore-btn mx-2 "
                          to={{ pathname: '/institute/admisia/application_form_download' }}
                          target="_blank"
                        >
                          Go for Download <i class="fas fa-angle-right" ></i>
                        </Link>

                        {/* <Button
                          className="btn all-border-radious no-border explore-btn border-0 px-5"
                        // onClick={this.showPreviousPage}
                        >
                          DOWNLOAD
                          </Button> */}
                      </FormGroup>

                      <FormGroup>

                        <Link
                          className="btn all-border-radious no-border explore-btn mx-2 "
                          to={{ pathname: `/institute/admisia/online_admission`, }}
                          onClick={this.resetApplicationFormData}
                        >
                          Finished <i class="fas fa-angle-right" ></i>
                        </Link>

                        {/* <Button
                          className="btn all-border-radious no-border explore-btn border-0 px-5"
                          onClick={this.showNextPage}
                        >
                          FINISHED
                          </Button> */}

                      </FormGroup>
                    </div>

                  </React.Fragment>

                  :
                  <div className="col-xl-12 text-right d-flex justify-content-end">
                    {this.state.pageSecond ?
                      <FormGroup >
                        <Button
                          className="btn all-border-radious no-border explore-btn border-0 mx-2 px-5"
                          onClick={this.showPreviousPage}
                        >
                          <i class="fas fa-angle-left" ></i> Update
                          </Button>

                        <Button
                          className="btn all-border-radious no-border explore-btn border-0 px-5"
                          onClick={this.showNextPage}
                        // disabled={admissionObj && admissionObj.prevExamInfoRequiredStatus == 1 && this.state.insertUserObj && this.state.insertUserObj.additionalInfos.length < 1 ? true : false}
                        >
                          Confirm  <i class="fas fa-angle-right" ></i>
                        </Button>

                      </FormGroup>
                      : <FormGroup>

                        <Link
                          className="btn all-border-radious no-border explore-btn mx-2 "
                          to={{ pathname: `/institute/admisia/online_admission`, }}
                          onClick={this.resetApplicationFormData}
                        >
                          <i class="fas fa-angle-left" ></i> Exit
                        </Link>

                        {/* <Button
                        className="btn all-border-radious no-border explore-btn border-0 mx-2  px-5"
                        onClick={this.showNextPage}
                        disabled={!this.state.isCheckAgreement}
                      >
                        <i class="fas fa-angle-left" ></i> Exit
                      </Button> */}

                        <Button
                          className="btn all-border-radious no-border explore-btn border-0 px-5"
                          onClick={this.showNextPage}
                          disabled={!this.state.isCheckAgreement}
                        >
                          Save <i class="fas fa-angle-right" ></i>
                        </Button>
                      </FormGroup>
                    }

                  </div>

                }
                <div className="container">
                  <div className="row">
                    <div className="offset-xl-1 col-xl-10">
                      <div className="custom-title-border-center"></div>
                    </div>
                  </div>
                </div>

                <Modal isOpen={this.state.examInfoDialogVisible} toggle={examInfoDialog}>

                  <ModalHeader toggle={examInfoDialog} className="bg-primary-color-dark text-white">
                    {this.state.additionalInfoId === "" ?
                      'Add' : 'Update'} Previous Exam Info
                    </ModalHeader>

                  <ModalBody className="bg-light">
                    <div className="row">
                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="admisia-level">INSTITUTE NAME <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Institute Name"
                            value={this.props.getInstituteName}
                            onChange={(e) => { this.props.instituteName(e.target.value); this.state.errors["instituteName"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['instituteName']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="admisia-level">INSTITUTE TYPE <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            placeholder="Select Institute Type"
                            value={this.props.getInstituteType}
                            onChange={(e) => { this.props.instituteType(e.target.value); this.state.errors["instituteType"] = '' }}
                          >
                            <option hidden value="">Select Institute Type</option>
                            <option value="Kinder Garden">Kinder Garden</option>
                            <option value="Primary School">Primary School</option>
                            <option value="High School">High School</option>
                            <option value="College">College</option>
                            <option value="School & College">School & College</option>
                            <option value="Technical Institute">Technical Institute</option>
                            <option value="English Medium">English Medium</option>
                            <option value="Madrasa">Madrasa</option>
                            <option value="Others">Others</option>
                          </Input>
                          <span className='error-message'>{errors['instituteType']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="admisia-level">BOARD <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            value={this.props.getBoardName}
                            onChange={(e) => { this.props.boardName(e.target.value); this.state.errors["boardName"] = '' }}
                          >
                            <option hidden value="">Select Board</option>
                            <option value="Dhaka Board">Dhaka Board</option>
                            <option value="Chittagong Board">Chittagong Board</option>
                            <option value="Barishal Board">Barishal Board</option>
                            <option value="Comilla Board">Comilla Board</option>
                            <option value="Dinajpur Board">Dinajpur Board</option>
                            <option value="Jessore Board">Jessore Board</option>
                            <option value="Rajshahi Board">Rajshahi Board</option>
                            <option value="Sylhet Board">Sylhet Board</option>
                            <option value="Madrashah Board">Madrashah Board</option>
                            <option value="Technical Board">Technical Board</option>
                            <option value="English Medium">English Medium</option>
                            <option value="Others">Others</option>
                          </Input>
                          <span className='error-message'>{errors['boardName']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="admisia-level">CLASS <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Class Name"
                            value={this.props.getClassdName}
                            onChange={(e) => { this.props.className(e.target.value); this.state.errors["className"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['className']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="admisia-level">ROLL NO. <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="number"
                            min={0} type="number" step="1"
                            name="class-group"
                            placeholder="Enter Roll No."
                            value={this.props.getRollNo}
                            onChange={(e) => { this.props.rollNo(e.target.value); this.state.errors["rollNo"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['rollNo']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="admisia-level">REGISTRATION NO.</Label><span className='f-right'> (optional)</span>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="number"
                            min={0} type="number" step="1"
                            name="class-group"
                            placeholder="Enter Reg. No."
                            value={this.props.getRegistrationNo}
                            onChange={(e) => { this.props.registrationNo(e.target.value); this.state.errors["registrationNo"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['registrationNo']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="admisia-level">EXAM <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Exam Name"
                            value={this.props.getExamName}
                            onChange={(e) => { this.props.examName(e.target.value); this.state.errors["examName"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['examName']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="admisia-level">GRADE <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            value={this.props.getExamGrade}
                            onChange={(e) => { this.props.examGrade(e.target.value); this.state.errors["examGrade"] = '' }}
                          >
                            <option hidden value="">Select Grade</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                            <option value="Others">Others</option>
                          </Input>
                          <span className='error-message'>{errors['examGrade']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="admisia-level">GPA <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter GPA"
                            value={this.props.getExamGpa}
                            onChange={(e) => { this.props.examGpa(e.target.value); this.state.errors["examGpa"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['examGpa']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="admisia-level">PASSING YEAR <span className="required">*</span></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            value={this.props.getPassingYear}
                            onChange={(e) => { this.props.passingYear(e.target.value); this.state.errors["passingYear"] = '' }}
                          >
                            <option hidden value="">Select Passing Year</option>

                            {passingYear.map(item =>
                              <option value={item}>{item}</option>
                            )}

                          </Input>
                          <span className='error-message'>{errors['passingYear']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 text-right my-3">
                        <Button className="btn all-border-radious no-border explore-btn border-0 px-5" onClick={this.onSubmitAdditionalInfo}>
                          {this.state.additionalInfoId === "" ?
                            'Save' : 'Update'}
                        </Button>
                      </div>

                    </div>
                  </ModalBody>
                  {/* <ModalFooter>
                    <Button color="primary" onClick={examInfoDialog}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={examInfoDialog}>Cancel</Button>
                  </ModalFooter> */}
                </Modal>

                <Modal isOpen={this.state.deleteDialogVisible} toggle={deleteDialog}>
                  <ModalHeader toggle={deleteDialog} className="bg-primary-color-dark text-white">Delete Confirmation</ModalHeader>
                  <ModalBody className="bg-light p-5">
                    <div className="row text-center">
                      <div className="col-12">
                        <label className="admisia-level">  Are you sure you want to permanently delete <br /> your previous exam info?</label>
                      </div>

                      <div className="col-12 mt-4">
                        <Button className="btn all-border-radious no-border explore-btn border-0 mx-2 px-5" onClick={() => this.onDeleteAdditionalInfo(this.state.deletePreExamId)}>Yes</Button>
                        <Button className="btn all-border-radious no-border explore-btn border-0 mx-2 px-5" onClick={() => deleteDialog()}>No</Button>
                      </div>
                    </div>
                  </ModalBody>
                </Modal>

              </div>

            </div>
          </section>

        </AppLayout>
      </div>
    );
  }
}

ApplicationForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationForm: makeSelectApplicationForm(),
  getApplicantInfo: makeSelectApplicantInfo(),
  getApplicantName: makeSelectApplicantName(),
  getGender: makeSelectGender(),
  getReligion: makeSelectReligion(),
  getDob: makeSelectDob(),
  getBirthCertificateNo: makeSelectBirthCertificateNo(),
  getQuota: makeSelectQuota(),

  getFileName: makeSelectFileName(),
  getFileContent: makeSelectFileContent(),
  getFileSave: makeSelectFileSave(),

  getMobileNo: makeSelectMobileNo(),
  getAddressDetails: makeSelectAddressDetails(),

  getFatherName: makeSelectFatherName(),
  getFatherOccupation: makeSelectFatherOccupation(),
  getFatherNidNo: makeSelectFatherNidNo(),
  getMotherName: makeSelectMotherName(),
  getMotherOccupation: makeSelectMotherOccupation(),
  getMotherNidNo: makeSelectMotherNidNo(),

  getInstituteName: makeSelectInstituteName(),
  getInstituteType: makeSelectInstituteType(),
  getBoardName: makeSelectBoardName(),

  getClassdName: makeSelectClassName(),
  getRollNo: makeSelectRollNo(),
  getRegistrationNo: makeSelectRegistrationNo(),
  getExamName: makeSelectExamName(),
  getExamGrade: makeSelectExamGrade(),
  getExamGpa: makeSelectExamGpa(),
  getPassingYear: makeSelectPassingYear(),

  getAdditionalInfo: makeSelectAdditionalInfo(),

  getApplicantView: makeSelectApplicantView(),
  applicantInfoList: makeSelectApplicantInfoList(),
  message: makeSelectMessage(),
  loader: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // setApplicantInfo: (applicantInfo) => { dispatch(makeChangeApplicantInfo(applicantInfo)) },birthCertificateNo
    applicantName: (e) => { dispatch(makeChangeApplicantName(e.target.value)) },
    gender: (e) => { dispatch(makeChangeGender(e.target.value)) },
    religion: (e) => { dispatch(makeChangeReligion(e.target.value)) },
    dob: (e) => { dispatch(makeChangeDob(e)) },
    birthCertificateNo: (e) => { dispatch(makeChangeBirthCertificateNo(e.target.value)) },
    quota: (e) => { dispatch(makeChangeQuota(e.target.value)) },

    fileName: (name) => { dispatch(makeChangeFileName(name)) },
    fileContent: (content) => { dispatch(makeChangeFileContent(content)) },
    fileSave: (fileSave) => { dispatch(makeChangeFileSave(fileSave)) },

    mobileNo: (value) => { dispatch(makeChangeMobileNo(value)) },
    addressDetails: (e) => { dispatch(makeChangeAddressDetails(e.target.value)) },

    fatherName: (e) => { dispatch(makeChangeFatherName(e.target.value)) },
    fatherOccupation: (e) => { dispatch(makeChangeFatherOccupation(e.target.value)) },
    fatherNidNo: (e) => { dispatch(makeChangeFatherNidNo(e.target.value)) },
    motherName: (e) => { dispatch(makeChangeMotherName(e.target.value)) },
    motherOccupation: (e) => { dispatch(makeChangeMotherOccupation(e.target.value)) },
    motherNidNo: (e) => { dispatch(makeChangeMotherNidNo(e.target.value)) },

    instituteName: (value) => { dispatch(makeChangeInstituteName(value)) },
    instituteType: (value) => { dispatch(makeChangeInstituteType(value)) },
    boardName: (value) => { dispatch(makeChangeBoardName(value)) },
    className: (value) => { dispatch(makeChangeClassName(value)) },
    rollNo: (value) => { dispatch(makeChangeRollNo(value)) },
    registrationNo: (value) => { dispatch(makeChangeRegistrationNo(value)) },
    examName: (value) => { dispatch(makeChangeExamName(value)) },
    examGrade: (value) => { dispatch(makeChangeExamGrade(value)) },
    examGpa: (value) => { dispatch(makeChangeExamGpa(value)) },
    passingYear: (value) => { dispatch(makeChangePassingYear(value)) },
    setMessage: () => { dispatch(setMessage('')) },

    submitAdditionalInfo: (additionalInfo) => { dispatch(makeChangeSubmitAdditionalInfo(additionalInfo)) },
    onSubmitInsertApplicantInfo: (applicationInfo) => { dispatch(makeSubmitInsertApplicantInfo(applicationInfo)) },

    // onSubmitApplicantInfo

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'applicationForm', reducer });
const withSaga = injectSaga({ key: 'applicationForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApplicationForm);
