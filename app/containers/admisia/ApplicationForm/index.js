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
  makeSelectReligion ,
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
  makeSelectApplicantView
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { CustomInput, FormGroup, Input, Label, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import staticImg from '../../../assets/img/demo-image.jpg';
import { get_DDMMM_YY_Format_WithComma, get_Only_Year } from '../../../utils/dateFormat';
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
  makeSubmitInsertApplicantInfo

 } from './actions';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { insert_applicant_info } from '../../../utils/serviceUrl';

import { ImageCropper } from '../../../components/common/ImageCropper';
import { getFileContentType, getMaxFileSizeIsValid } from '../../../utils/FileHandler';

/* eslint-disable react/prefer-stateless-function */
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
      isCheckAgreement: false,
      errors: {},
      additionalInfoId: ""
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  componentDidMount(){
    if(this.props.getApplicantView.applicantPersonalViewResponse){
      this.setState({ pageFirst: false, pageSecond: false, pageThird: true})
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

    if (!this.props.getBirthCertificateNo) {
      formIsValid = false;
      errors["birthCertificateNo"] = "Birth Certificate No. can't left empty.";
    }

    if (!this.props.getQuota) {
      formIsValid = false;
      errors["quota"] = "Quota can't left empty.";
    }

    if (!this.props.getFileContent) {
      formIsValid = false;
      errors["image"] = "Image can't left empty.";
    }

    if (!this.props.getMobileNo) {
      formIsValid = false;
      errors["mobileNo"] = "Mobile No. can't left empty.";
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

    if (!this.props.getFatherNidNo) {
      formIsValid = false;
      errors["fatherNidNo"] = "Father's NID can't left empty.";
    }

    if (!this.props.getMotherName) {
      formIsValid = false;
      errors["motherName"] = "Mother's Name can't left empty.";
    }

    if (!this.props.getMotherOccupation) {
      formIsValid = false;
      errors["motherOccupation"] = "Mother's Occupation can't left empty.";
    }

    if (!this.props.getMotherNidNo) {
      formIsValid = false;
      errors["motherNidNo"] = "Mother's NID can't left empty.";
    }

    if (this.state.admissionObj && this.state.admissionObj.prevExamInfoRequiredStatus == 1 && !this.props.getAdditionalInfo.length) {
      formIsValid = false;
      errors["preExamInfo"] = "Previous Exam can't left empty.";
    }

    // this.props.getFatherName

    this.setState({ errors });
    return formIsValid;
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

    if (!this.props.getRegistrationNo) {
      formIsValid = false;
      errors["registrationNo"] = "Registration No. can't left empty.";
    }

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
    let { insertUserObj, errors, additionalInfoId } = this.state
    console.log("this.props.submitAdditionalInfo", insertUserObj.additionalInfos.length);

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

      if(additionalInfoId === ""){
        additionalInfo.id = !insertUserObj.additionalInfos.length ? 0 : insertUserObj.additionalInfos.length
        insertUserObj.additionalInfos.push(additionalInfo)
      }
      else if( additionalInfoId >= 0 ){
        console.log("insertUserObj.additionalInfos[additionalInfoId]", insertUserObj.additionalInfos[additionalInfoId]);

        additionalInfo.id = additionalInfoId
        insertUserObj.additionalInfos[additionalInfoId] = additionalInfo
        
      }
      
      this.setState({ insertUserObj })

      this.props.submitAdditionalInfo(insertUserObj.additionalInfos);
      this.setState({ examInfoDialogVisible: false });

    }

  }

  onDeleteAdditionalInfo = (id) => {
    let { insertUserObj } = this.state
    let { getAdditionalInfo } = this.props
    // insertUserObj.additionalInfos = this.props.getAdditionalInfo

    let filteredElement = getAdditionalInfo.filter(item => item.id !== id)
    console.log("filteredElement", filteredElement)

    this.props.submitAdditionalInfo(filteredElement);
  }

  onEditAdditionalInfo = (id) => {
    let { insertUserObj, examInfoDialogVisible, additionalInfoId } = this.state
    let { getAdditionalInfo } = this.props
    // insertUserObj.additionalInfos = this.props.getAdditionalInfo
    this.setState({ examInfoDialogVisible: true })

    let filteredElement = getAdditionalInfo.filter(item => item.id == id)
    console.log("EDITfilteredElement", filteredElement)

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
    console.log('fileType e', event);
    let { errors, cropperObject } = this.state;
    // this.emptyErrorMessage();

    let fileType = getFileContentType(event.target.files[0].name);
    let supportedExtention = ['data:image/jpeg;base64,', 'data:image/jpg;base64,', 'data:image/png;base64,'];

    console.log('fileType', fileType, " | ", supportedExtention.includes(fileType));

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

  checkAgreement = () =>{
    this.setState({ isCheckAgreement: !this.state.isCheckAgreement });
  }
  

  render() {
    let { admissionObj, errors } = this.state
    let { applicantInfo, getApplicantInfo, getApplicantName, getBirthCertificateNo, getAdditionalInfo, getApplicantView } = this.props

    console.log("getApplicantView", getApplicantView);

    const examInfoDialog = () => {
      this.setState({ examInfoDialogVisible: !this.state.examInfoDialogVisible, additionalInfoId: '' });
      this.props.instituteName("")
      this.props.instituteType("")
      this.props.boardName("")
      this.props.className("")
      this.props.rollNo("")
      this.props.registrationNo("")
      this.props.examName("")
      this.props.examGrade("")
      this.props.examGpa("")
      this.props.passingYear("")
    };

    const occupations = [
      'Doctor', 'Engineer', 'Civil Engineer', 'Scientist', 'Lawyer', 'Businessman', 'Teacher', 'Housewife',
      'BGB', 'Army', 'Police', 'Govt. Service Holder', 'Pvt. Service Holder', 'Social Worker', 'Farmer',
      'Shopkeeper', 'Technician', 'Others'
    ]

    let date = new Date();
    let year = date.getFullYear();
    let passingYear = [];
    for(let i = 0 ; i < 10 ; i++){
      passingYear.push(year - i)
    }

    

    return (
      <div class="admisia">
        <AppLayout>
          <Helmet>
            <title>ApplicationForm</title>
            <meta name="description" content="Description of ApplicationForm" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Online Admission"
            menuStepFirst="Online Admission"
            menuStepSenond="Application Form"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">
                <div className="row m-0 text-center bg-smoke-white section-top-page">
                  <div className="col-xl-4 py-5 text-center one active">
                    <div className='page'>1</div>
                    <div>Information</div>
                  </div>
                  <div className={ this.state.pageSecond || this.state.pageThird? "col-xl-4 py-5 two active" : "col-xl-4 py-5 two " } >
                    <div className='page'>2</div>
                    <div>Review</div>
                  </div>
                  <div className={ this.state.pageThird? "col-xl-4 py-5 three active" : "col-xl-4 py-5 three " }>
                    <div className='page'>3</div>
                    <div>Completed</div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Academic Year: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.academicYear) || (admissionObj && admissionObj.currentAcademicYear) }</th>
                            <th className="text-right"><span>Application End Date : { get_DDMMM_YY_Format_WithComma( (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicationEndDate) || (admissionObj && admissionObj.applicationEndDate) ) }</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>CLASS & GROUP <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        value={ (admissionObj && admissionObj.className) + " ( " + (admissionObj && admissionObj.groupName) + " )"}
                                        readOnly
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4"></div>
                                  <div className="col-xl-4 text-right my-auto text-primary">
                                    <small>Application Fee -</small> { admissionObj && admissionObj.totalFee } TK (BDT)
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
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Class</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.className) || (admissionObj && admissionObj.className) }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Group</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.groupName) || (admissionObj && admissionObj.groupName) }</div>
                                      { this.state.pageThird ? 
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Roll No.</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.rollNo) }</div>
                                        :null
                                      }
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="row">
                                  <div class="col-xl-12">
                                    <div class="student-details-info ml-auto">
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Academic Year</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.academicYear) || (admissionObj && admissionObj.currentAcademicYear) }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application End Date</label>: { get_DDMMM_YY_Format_WithComma( (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicationEndDate) || (admissionObj && admissionObj.applicationEndDate) ) }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.totalFee) || (admissionObj && admissionObj.totalFee) } TK</div>
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

                <div className="row">
                  <div className="col-xl-12">
                    <div className="my-3">    {/*page-inner-title*/}
                      <h2 className="d-flex justify-content-center">
                        <span className="text-orange "> Application Form </span>
                      </h2>
                      {/* <div className="custom-title-border-left"></div> */}
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped responsive className="application-form-table">
                        <thead>
                          <tr>
                            <th colSpan="3">Personal Information</th>
                            {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>STUDENT NAME <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Add Name"
                                        value={ this.props.getApplicantName }
                                        onChange={ (e) =>{ this.props.applicantName(e); this.state.errors["applicantName"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['applicantName']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown mb-3">
                                      <Label for="class-group" className="text-primary-light"><small>GENDER <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                        value={ this.props.getGender }
                                        onChange={ (e) =>{ this.props.gender(e); this.state.errors["gender"] = '' } }
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
                                      <Label for="class-group" className="text-primary-light"><small>RELIGION <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                        value={ this.props.getReligion }
                                        onChange={ (e) =>{ this.props.religion(e); this.state.errors["religion"] = '' } }
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
                                      <Label for="class-group" className="text-primary-light"><small>DATE OF BIRTH <span className="required">*</span></small></Label>
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
                                        onChange={ (e) =>{ this.props.dob(e); this.state.errors["dob"] = ''} }
                                        className="dayPicker-custom-input bg-white border-0 rounded-0"
                                        name='date'
                                        autoComplete="off"
                                      />
                                      <span className='error-message'>{errors['dob']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>BIRTH REG. NO. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Birth reg. no."
                                        value={ this.props.getBirthCertificateNo }
                                        onChange={  (e) =>{ this.props.birthCertificateNo(e); this.state.errors["birthCertificateNo"] = '' } }
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['birthCertificateNo']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="text-primary-light"><small>QUOTA <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select Your Quota"
                                        value={ this.props.getQuota }
                                        onChange={ (e) =>{ this.props.quota(e); this.state.errors["quota"] = '' } }
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
                                      </Input>
                                      <span className='error-message'>{errors['quota']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-upload">
                                      <Label for="class-group" className="text-primary-light"><small>PHOTO <span className="required">*</span></small></Label>
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
                                      <Label for="class-group" className="text-primary-light"><small>GUARDIAN MOBILE NO. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mobile no."
                                        value={ this.props.getMobileNo }
                                        onChange={  (e) =>{ this.props.mobileNo(e); this.state.errors["mobileNo"] = '' } }
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['mobileNo']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 d-flex align-items-center">
                                    <small className="text-orange">
                                      ***This number will be needed from further <br />
                                      communication.So, Please input a valid contact no.***
                                    </small>
                                  </div>

                                  <div className="col-xl-8">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>Address <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="textarea"
                                        name="class-group"
                                        placeholder="Enter Address"
                                        style={{ height: "150px" }}
                                        value={ this.props.getAddressDetails }
                                        onChange={  (e) =>{ this.props.addressDetails(e); this.state.errors["addressDetails"] = '' } }
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['addressDetails']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 d-flex align-items-center">
                                    {
                                      this.props.getFileContent? 
                                      <img src={ "data:image/jpg;base64," + this.props.getFileContent } height="120px" />: null
                                    }
                                    
                                  </div>


                                </div>
                              </td>
                              {/* <td>Test</td> */}
                            </tr>

                          : this.state.pageSecond || this.state.pageThird ?

                            <tr>
                              <td style={{ width: "232px"}} className="p-4">
                              {/* { "data:image/jpg;base64," + this.props.getFileContent } */}

                              { this.props.getFileContent ?
                                <img src={ "data:image/jpg;base64," + this.props.getFileContent } style={{ width: "232px"}}/>
                                :<img src={staticImg} style={{ width: "232px"}}/>
                              }
                                
                                </td>
                              <td className="p-4">
                                <div className="row">
                                  <div class="col-xl-12">
                                    <div class=" student-details-info">
                                      <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Student Name</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicantName) || this.props.getApplicantName }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.gender) || this.props.getGender }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.religion) || this.props.getReligion }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: { get_DDMMM_YY_Format_WithComma( (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.dob) || this.props.getDob ) }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Birth Registration No.</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.birthCertificateNo) || this.props.getBirthCertificateNo }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.mobileNo) || this.props.getMobileNo }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.addressDetails) || this.props.getAddressDetails }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Quota</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.quota) || this.props.getQuota }</div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            :null
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
                          { this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>FATHER'S NAME <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Father's Name"
                                        value={ this.props.getFatherName }
                                        onChange={ (e) =>{ this.props.fatherName(e); this.state.errors["fatherName"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['fatherName']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="text-primary-light"><small>FATHER'S OCCUPATION <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                        value={ this.props.getFatherOccupation }
                                        onChange={ (e) =>{ this.props.fatherOccupation(e); this.state.errors["fatherOccupation"] = '' }}
                                      >
                                        <option hidden value="">Select Father's Occupation</option>
                                        { occupations.map( item => 
                                          <option value={ item }> { item } </option>
                                        )}
                                      </Input>
                                      <span className='error-message'>{errors['fatherOccupation']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>FATHER'S NID. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Father's NID (If Any)"
                                        value={ this.props.getFatherNidNo }
                                        onChange={ (e) =>{ this.props.fatherNidNo(e); this.state.errors["fatherNidNo"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['fatherNidNo']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>MOTHER'S NAME <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mothers's Name"
                                        value={ this.props.getMotherName }
                                        onChange={ (e) =>{ this.props.motherName(e); this.state.errors["motherName"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['motherName']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className="text-primary-light"><small>MOTHER'S OCCUPATION <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        value={ this.props.getMotherOccupation }
                                        onChange={ (e) =>{ this.props.motherOccupation(e); this.state.errors["motherOccupation"] = '' }}
                                      >
                                        <option hidden value="">Select Mother's Occupation</option>
                                        { occupations.map( item => 
                                          <option value={ item }> { item } </option>
                                        )}
                                      </Input>
                                      <span className='error-message'>{errors['motherOccupation']}</span>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className="text-primary-light"><small>MOTHERS'S NID. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mother's NID (If Any)"
                                        value={ this.props.getMotherNidNo }
                                        onChange={ (e) =>{ this.props.motherNidNo(e); this.state.errors["motherNidNo"] = '' }}
                                      >
                                      </Input>
                                      <span className='error-message'>{errors['motherNidNo']}</span>
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
                                      <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Father's Name</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.fatherName) || this.props.getFatherName }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Occupation</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.fatherOccupation) || this.props.getFatherOccupation }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's NID</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.fatherNidNo) || this.props.getFatherNidNo }</div>
                                      <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Mother's Name</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.motherName) || this.props.getMotherName }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Occupation</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.motherOccupation) || this.props.getMotherOccupation }</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's NID</label>: { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.motherNidNo) || this.props.getMotherNidNo }</div>                                    
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            :null
                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                { admissionObj && admissionObj.prevExamInfoRequiredStatus == 1 ? 
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
                                { this.state.pageFirst ?
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
                                        <th>INS. TYPE</th>
                                        <th>BOARD</th>
                                        <th>CLASS</th>
                                        <th>ROLL NO.</th>
                                        <th>REG. NO</th>
                                        <th>EXAM</th>
                                        <th>GRADE </th>
                                        <th>GPA</th>
                                        <th>PASSING YEAR</th>
                                        { this.state.pageThird ? null : <th>Action</th> }
                                      </tr>
                                    </thead>
                                    <tbody>
                                      { (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPreviousExamViewResponses) ?
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

                                              {this.state.pageThird ? null :
                                                <td>
                                                  <div className="d-flex">
                                                    <Button className="btn btn-info mr-2" onClick={() => this.onEditAdditionalInfo(item.id)} /*onClick={ onEditAdditionalInfo }*/>
                                                      <i className="fas fa-pencil"></i>
                                                    </Button>
                                                    <Button className="btn btn-danger" onClick={() => this.onDeleteAdditionalInfo(item.id)}>
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

                                              {this.state.pageThird ? null :
                                                <td>
                                                  <div className="d-flex">
                                                    <Button className="btn btn-info mr-2" onClick={() => this.onEditAdditionalInfo(item.id)} /*onClick={ onEditAdditionalInfo }*/>
                                                      <i className="fas fa-pencil"></i>
                                                    </Button>
                                                    <Button className="btn btn-danger" onClick={() => this.onDeleteAdditionalInfo(item.id)}>
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

                                {/* <div className="col-xl-12">
                                  No Record Found
                                </div> */}
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
                    { !this.state.pageThird ?
                      <span className="mr-2">
                        <Input 
                          type="checkbox" 
                          style={{ position: "relative", marginLeft: "0px"}} 
                          onChange={ this.checkAgreement } 
                          checked={this.state.isCheckAgreement}
                        /> 
                      </span> 
                      : null
                    }
                    I declare that the above mention information are correct. If any information provide by me is found false.<br/>
                    The institute reserves the right to cancel my admission. I shall be obliged and obey all the rules & regulations of the institute.
                  </div>
                </div>

                


                  {this.state.pageThird ? 
                    <React.Fragment>
                      <div className="container">
                        <div className="row">
                          <div className="offset-xl-1 col-xl-10">
                            <div className="custom-title-border-center"></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 text-orange">
                        <h2 className="mb-0"><b>Congratulation !!</b></h2>
                        Application Submitted Successfully.
                      </div>

                      <div className="col-xl-12 my-3">
                        <small>Your User ID: 20200000012, Please keep this number to pay the application fee 125.00/= taka within 72 Hours through Bkash app or USSD Dial code.</small>
                      </div>

                      <div className="col-xl-12">
                        <h4 className="mb-3"><u><b>Follow The Steps</b></u></h4>
                        <small>
                          01. Go to Your Bkash Mobile app/dial code <br />
                          02. Choose ''Pay bill'' option <br />
                          03. Select Admisia option <br />
                          04. Enter the student registration no. <br />
                          05. After enter student registration you see the fees that you would be pay <br />
                          06. Now enter your Bkash mobile menu PIN to conform <br /><br />

                          N.B: Please preserve the user ID. You will need User ID to download Admit card after Completed your payment <br />
                        </small>

                      </div>

                      <div className="col-xl-12 text-right d-flex justify-content-end mt-4">
                        <FormGroup className="mr-5">
                          <Button
                            className="btn all-border-radious no-border explore-btn border-0 px-5"
                            onClick={this.showPreviousPage}
                          >
                            DOWNLOAD
                          </Button>
                        </FormGroup>

                        <FormGroup>
                          <Button
                            className="btn all-border-radious no-border explore-btn border-0 px-5"
                            onClick={this.showNextPage}
                          >
                            FINISHED
                          </Button>
                        </FormGroup>
                      </div>
                    </React.Fragment>
                    : 
                    <div className="col-xl-12 text-right d-flex justify-content-end">
                      { this.state.pageSecond ?
                        <FormGroup className="mr-5">
                          <Button
                            className="btn all-border-radious no-border explore-btn border-0 px-5"
                            onClick={this.showPreviousPage}
                          >
                            <i class="fas fa-angle-left" ></i> UPDATE 
                          </Button>
                        </FormGroup>
                        : null
                      }
    
                      <FormGroup>
                        <Button
                          className="btn all-border-radious no-border explore-btn border-0 px-5"
                          onClick={this.showNextPage}
                          disabled={!this.state.isCheckAgreement}
                        >
                          Next <i class="fas fa-angle-right" ></i> 
                        </Button>
                      </FormGroup>
                    </div>
                  }



                <Modal isOpen={this.state.examInfoDialogVisible} toggle={examInfoDialog}>
                  <ModalHeader toggle={examInfoDialog} className="bg-primary-color-dark text-white">Previous Exam Info</ModalHeader>
                  <ModalBody className="bg-light">
                    <div className="row">
                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="text-primary-light"><small>INSTITUTE NAME <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Institute Name"
                            value={ this.props.getInstituteName }
                            onChange={ (e) =>{ this.props.instituteName(e.target.value); this.state.errors["instituteName"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['instituteName']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="text-primary-light"><small>INSTITUTE TYPE <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            placeholder="Select Institute Type"
                            value={ this.props.getInstituteType }
                            onChange={ (e) =>{ this.props.instituteType(e.target.value); this.state.errors["instituteType"] = '' }}
                          >
                            <option hidden value="">Select Type</option>
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
                          <Label for="class-group" className="text-primary-light"><small>BOARD <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            value={ this.props.getBoardName }
                            onChange={ (e) =>{ this.props.boardName(e.target.value); this.state.errors["boardName"] = '' }}
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
                          <Label for="class-group" className="text-primary-light"><small>CLASS <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Class Name"
                            value={ this.props.getClassdName }
                            onChange={ (e) =>{ this.props.className(e.target.value); this.state.errors["className"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['className']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="text-primary-light"><small>Roll NO. <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Roll No."
                            value={ this.props.getRollNo }
                            onChange={ (e) =>{ this.props.rollNo(e.target.value); this.state.errors["rollNo"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['rollNo']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="text-primary-light"><small>REGISTRATION NO. <span className="required"></span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Reg. No."
                            value={ this.props.getRegistrationNo }
                            onChange={ (e) =>{ this.props.registrationNo(e.target.value); this.state.errors["registrationNo"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['registrationNo']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className="text-primary-light"><small>EXAM <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Exam Name"
                            value={ this.props.getExamName }
                            onChange={ (e) =>{ this.props.examName(e.target.value); this.state.errors["examName"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['examName']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="text-primary-light"><small>GRADE <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            value={ this.props.getExamGrade }
                            onChange={ (e) =>{ this.props.examGrade(e.target.value); this.state.errors["examGrade"] = '' }}
                          >
                            <option hidden value="">Select Gread</option>
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
                          <Label for="class-group" className="text-primary-light"><small>GPA <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter GPA"
                            value={ this.props.getExamGpa }
                            onChange={ (e) =>{ this.props.examGpa(e.target.value); this.state.errors["examGpa"] = '' }}
                          >
                          </Input>
                          <span className='error-message'>{errors['examGpa']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className="text-primary-light"><small>PASSING YRAR <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            value={ this.props.getPassingYear }
                            onChange={ (e) =>{ this.props.passingYear(e.target.value); this.state.errors["passingYear"] = '' }}
                          >
                            <option hidden value="">Select Passing Year</option>

                            { passingYear.map(item => 
                              <option value={ item }>{ item }</option>
                            )}
                            
                          </Input>
                          <span className='error-message'>{errors['passingYear']}</span>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 text-right my-3">
                        <Button className="btn all-border-radious no-border explore-btn border-0 px-5" onClick={this.onSubmitAdditionalInfo}>SAVE</Button>{' '}
                      </div>

                    </div>
                  </ModalBody>
                  {/* <ModalFooter>
                    <Button color="primary" onClick={examInfoDialog}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={examInfoDialog}>Cancel</Button>
                  </ModalFooter> */}
                </Modal>


              </div>


              <div className="container">
                <div className="row">
                  <div className="offset-xl-1 col-xl-10">
                    <div className="custom-title-border-center mb-2"></div>
                  </div>
                </div>
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

    mobileNo: (e) => { dispatch(makeChangeMobileNo(e.target.value)) },
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
