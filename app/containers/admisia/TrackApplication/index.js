/**
 *
 * TrackApplication
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
import makeSelectTrackApplication from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Input, Label, Table, Modal, ModalBody } from 'reactstrap';

//customs imports
import { makeSelectRegistrationNo, makeSelectApplicantInfoList } from './selectors';
import { setRegistrationNo, submitSearch } from './actions';

import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import staticImg from '../../../assets/img/demo-image.jpg';
import { get_DDMMM_YY_Format_WithComma } from '../../../utils/dateFormat';

export class TrackApplication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      modalVisible: false,

    }
  }

  onChangeRegNumber = (e) => {
    this.props.onChangeRegNo(e.target.value);
    this.clearErrorMsg('registrationNo')
  }

  submitSearchBtn = () => {

    if (this.emptyFieldCheck()) {
      this.props.onSubmitSearch();
    }

  }

  emptyFieldCheck = () => {

    let { errors } = this.state;
    let formIsValid = true;

    if (this.props.registrationNo === '') {
      formIsValid = false;
      errors["registrationNo"] = "Registration No. can't left empty";
    }
    this.setState({ errors });
    return formIsValid;

  }

  clearErrorMsg = (name) => {
    let { errors } = this.state;
    errors[name] = '';
    this.setState({ errors })

  }

  getApplicantStatus = () => {

    let { applicantInfoList } = this.props;

    if (applicantInfoList.applicantFeeStatus === 1) {

      if (applicantInfoList.admissionExamStatus === 1) {

        if (applicantInfoList.applicantStatus === 0) {

          // true for pending assessment
          return <div className="row">
            <div className="col-xl-12 font-weight-bold">
              <div className=" d-flex align-items-center justify-content-center shape-circle pending">P</div>
              <h2 className="mt-3"><b>Pending For Assesment</b></h2>
              <p className="">Oops !!! Your application is in "Pending" status for Assesment.</p>

              <Button
                className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                disabled
              >
                ADMIT CARD
            </Button>
            </div>
          </div>

        } else if (applicantInfoList.applicantStatus === 1) {

          // true for approved assessment
          return (<div className="row">
            <div className="col-xl-9 font-weight-bold">
              <div className=" d-flex align-items-center justify-content-center shape-circle approved">A</div>
              <h2 className="mt-3"><b>Approved For Assesment</b></h2>
              <p className=""><span className="text-orange">Congratulation !!! </span> Your application has been "Approved" for Assesment.</p>

              <Button
                className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
              // onClick={examInfoDialog}
              >
                ADMIT CARD
              </Button>
            </div>
            <div class="col-xl-3 seperator ">
              <div className="mb-3">
                <Label className="text-primary-light mb-0">Assessment Date </Label>
                <h5 className="font-weight-bold">{get_DDMMM_YY_Format_WithComma(applicantInfoList.admissionExamDate)}</h5>
              </div>

              <div className="mb-3">
                <Label className="text-primary-light mb-0">Assessment Start Time </Label>
                <h5 className="font-weight-bold">{applicantInfoList.admissionExamTime}</h5>
              </div>

              <div className="mb-3">
                <Label className="text-primary-light mb-0">Assessment Center </Label>
                <h5 className="font-weight-bold">{applicantInfoList.examCenterName}</h5>
              </div>

              <div className="mb-3">
                <Label className="text-primary-light mb-0">Exam Instruction</Label>
                <h5 className="font-weight-bold"><u><span style={{ color: '#007BFF', cursor: 'pointer' }} onClick={this.onChangeModalStatus}>View Details</span></u></h5>
              </div>

              <div className="mb-3">
                <Label className="text-primary-light mb-0">Approved Date</Label>
                <h5 className="font-weight-bold">{get_DDMMM_YY_Format_WithComma(applicantInfoList.statusUpdateDate)}</h5>
              </div>

            </div>
          </div>
          )
        } else if (applicantInfoList.applicantStatus === 2) {

          // true for rejected assessment
          return (<div className="row">
            <div className="col-xl-9 font-weight-bold">
              <div className=" d-flex align-items-center justify-content-center shape-circle rejected">R</div>
              <h2 className="mt-3"><b>Rejected For Assesment</b></h2>
              <p className="">Sorry !!! Your are "Rejected" for Assesment.</p>

              <Button
                className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                // onClick={examInfoDialog}
                disabled
              >
                ADMIT CARD
              </Button>
            </div>
            <div class="col-xl-3 d-flex align-items-center pl-0">
              <div className="mb-3 seperator pl-3">
                <Label className="text-primary-light mb-0">Rejected Date</Label>
                <h5 className="font-weight-bold">{get_DDMMM_YY_Format_WithComma(applicantInfoList.statusUpdateDate)}</h5>
              </div>
            </div>
          </div>
          )
        }

      }

      if (applicantInfoList.applicantStatus === 1 && applicantInfoList.autoApproveStatus === 0) {
        // true for pending admission

        return (<div className="row">

          <div className="col-xl-12 font-weight-bold">
            <div className=" d-flex align-items-center justify-content-center shape-circle pending">P</div>
            <h2 className="mt-3"><b>Pending For Admission</b></h2>
            <p className="">Oops !!! Your application is in "Pending" status for Admission.</p>

            <Button
              className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
              // onClick={examInfoDialog}
              disabled
            >
              ADMISSION CONFIRMATION LETTER
          </Button>
          </div>
        </div>
        )
      }

      if (applicantInfoList.applicantStatus === 3) {
        // true for rejected admission

        return (<div className="row">
          <div className="col-xl-9 font-weight-bold">
            <div className=" d-flex align-items-center justify-content-center shape-circle rejected">R</div>
            <h2 className="mt-3"><b>Rejected For Admission</b></h2>
            <p className="">Sorry !!! Your are "Rejected" for Admission.</p>

            <Button
              className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
              // onClick={examInfoDialog}
              disabled
            >
              ADMISSION CONFIRMATION LETTER
          </Button>
          </div>
          <div class="col-xl-3 d-flex align-items-center pl-0">
            <div className="mb-3 seperator pl-3">
              <Label className="text-primary-light mb-0">Rejected Date</Label>
              <h5 className="font-weight-bold">{get_DDMMM_YY_Format_WithComma(applicantInfoList.statusUpdateDate)}</h5>
            </div>
          </div>
        </div>
        )
      }

      if (applicantInfoList.applicantStatus === 4) {
        // true for waiting admission

        return (<div className="row">
          <div className="col-xl-9 font-weight-bold">
            <div className=" d-flex align-items-center justify-content-center shape-circle waiting">W</div>
            <h2 className="mt-3"><b>Waiting For Admission</b></h2>
            <p className="">You are in "Waiting" list for Admission.</p>

            <Button
              className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
              // onClick={examInfoDialog}
              disabled
            >
              ADMISSION CONFIRMATION LETTER
          </Button>
          </div>
          <div class="col-xl-3 d-flex align-items-center pl-0">
            <div className="mb-3 seperator pl-3">
              <Label className="text-primary-light mb-0">Waiting Date</Label>
              <h5 className="font-weight-bold">{get_DDMMM_YY_Format_WithComma(applicantInfoList.statusUpdateDate)}</h5>
            </div>
          </div>
        </div>
        )

      }

      if (applicantInfoList.applicantStatus === 5) {
        // true for approved admission

        return (<div className="row">
          <div className="col-xl-9 font-weight-bold">
            <div className=" d-flex align-items-center justify-content-center shape-circle approved">A</div>
            <h2 className="mt-3"><b>Approved For Admission</b></h2>
            <p className=""><span className="text-orange">Congratulation !!! </span> Your application has been "Approved" for Admission.</p>

            <Button
              className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
            // onClick={examInfoDialog}
            >
              ADMISSION CONFIRMATION LETTER
          </Button>
          </div>

          <div class="col-xl-3 d-flex align-items-center pl-0">
            <div className="mb-3 seperator pl-3">
              <Label className="text-primary-light mb-0">Approved Date</Label>
              <h5 className="font-weight-bold">{get_DDMMM_YY_Format_WithComma(applicantInfoList.statusUpdateDate)}</h5>
            </div>
          </div>
        </div>
        )
      }

    } else if (applicantInfoList.applicantFeeStatus === 0) {
      return <div className="col-xl-12 font-weight-bold">
        <div className=" d-flex align-items-center justify-content-center shape-circle waiting"><i className="fas fa-spinner"></i></div>
        <h2 className="mt-3"><b>Waiting For Payment</b></h2>
        <p className=""> <i className="fas fa-info-circle"></i> Pay your application fee to confirm your application. </p>
      </div>

    } else { }
  }

  onChangeModalStatus = () => {
    const visibleStatus = this.state.modalVisible;
    this.setState({ modalVisible: !visibleStatus });
  }

  render() {

    let { errors } = this.state;
    let { applicantInfoList } = this.props;

    return (
      <div class="admisia">
        <AppLayout>
          <Helmet>
            <title>ApplicationForm</title>
            <meta name="description" content="Description of ApplicationForm" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Search"
            menuStepFirst="Online Admision"
            menuStepSenond="Track"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">
                <div className="row">
                  <div className="col-xl-12"><h2 className="text-center text-orange mb-3">Track Your Application</h2></div>

                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Academic Year: 2020</th>
                            {/* <th className="text-right"><span>Application End Date : { get_DDMMM_YY_Format_WithComma( (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicationEndDate) || (admissionObj && admissionObj.applicationEndDate) ) }</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="2" class="p-4">
                              <div className="row">
                                <div className="col-xl-4">
                                  <FormGroup>
                                    <Label for="class-group" className="text-primary-light"><small>Registration No. <span className="required">*</span></small></Label>
                                    <Input
                                      className=" bg-white border-0 rounded-0"
                                      type="number"
                                      name="class-group"
                                      placeholder="Enter Registration No."
                                      value={this.props.registrationNo}
                                      onChange={this.onChangeRegNumber}
                                    >
                                    </Input>
                                    <span className='error-message'>{errors['registrationNo']}</span>
                                  </FormGroup>
                                </div>

                                <div className="col-xl-4">
                                  <FormGroup className="mb-0">
                                    {/* <Label for="class-group" className="text-primary-light"><small> </small></Label> */}
                                    <br />
                                    <Button
                                      className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                                      onClick={this.submitSearchBtn}
                                    >
                                      <i class="fas fa-search" ></i> Search
                                    </Button>
                                  </FormGroup>
                                  {/* <span className='error-message'>{errors['preExamInfo']}</span> */}
                                </div>

                                {/* <div className="col-xl-4"></div> */}
                                <div className="col-xl-4 text-center my-xl-auto text-primary d-flex my-3">
                                  <span className="shape-squire"></span>
                                  <span className="shape-squire"></span>
                                  <b className="ml-3"><u><Link to="/institute/find_registration_no">Forgot your Registration No. ?</Link></u></b>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Applicant Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="p-4 bg-white shadow">
                              {/* <div className="row"> */}

                              {this.getApplicantStatus()}

                              {/* {applicantInfoList.applicantFeeStatus === 1 ?
                                <div className="col-xl-12 font-weight-bold">
                                  <div className=" d-flex align-items-center justify-content-center shape-circle pending">P</div>
                                  <h2 className="mt-3"><b>Pending For Assesment</b></h2>
                                  <p className="">Oops !!! Your application is in "Pending" status for Assesment.</p>

                                  <Button
                                    className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                                    // onClick={examInfoDialog}
                                    disabled
                                  >
                                    ADMIT CARD
                                  </Button>
                                </div>

                                <div className="col-xl-9 font-weight-bold">
                                  <div className=" d-flex align-items-center justify-content-center shape-circle approved">A</div>
                                  <h2 className="mt-3"><b>Approved For Assesment</b></h2>
                                  <p className="">Congratulation !!! Your application has been "Approved" for Assesment.</p>

                                  <Button
                                    className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                                  // onClick={examInfoDialog}
                                  >
                                    ADMIT CARD
                                  </Button>
                                </div>
                                <div class="col-xl-3 seperator ">
                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Assessment Date </Label>
                                    <h5 className="font-weight-bold">15 November, 2020</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Assessment Time </Label>
                                    <h5 className="font-weight-bold">12.00 PM - 02.00 PM</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Exam Instruction</Label>
                                    <h5 className="font-weight-bold"><u><a href="#">(View Details)</a></u></h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Approved Date</Label>
                                    <h5 className="font-weight-bold">15 November, 2020</h5>
                                  </div>

                                </div>

                                <div className="col-xl-9 font-weight-bold">
                                  <div className=" d-flex align-items-center justify-content-center shape-circle rejected">R</div>
                                  <h2 className="mt-3"><b>Rejected For Assesment</b></h2>
                                  <p className="">Sorry !!! Your are "Rejected" for Assesment.</p>

                                  <Button
                                    className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                                    // onClick={examInfoDialog}
                                    disabled
                                  >
                                    ADMIT CARD
                                  </Button>
                                </div>
                                <div class="col-xl-3 d-flex align-items-center pl-0">
                                  <div className="mb-3 seperator pl-3">
                                    <Label className="text-primary-light mb-0">Rejected Date</Label>
                                    <h5 className="font-weight-bold">15 November, 2020</h5>
                                  </div>
                                </div>

                                <div className="col-xl-9 font-weight-bold">
                                  <div className=" d-flex align-items-center justify-content-center shape-circle waiting">W</div>
                                  <h2 className="mt-3"><b>Waiting For Admission</b></h2>
                                  <p className="">You are in "Waiting" list for Admission.</p>

                                  <Button
                                    className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                                    // onClick={examInfoDialog}
                                    disabled
                                  >
                                    ADMISSION CONFIRMATION LETTER
                                  </Button>
                                </div>
                                <div class="col-xl-3 d-flex align-items-center pl-0">
                                  <div className="mb-3 seperator pl-3">
                                    <Label className="text-primary-light mb-0">Waiting Date</Label>
                                    <h5 className="font-weight-bold">15 November, 2020</h5>
                                  </div>
                                </div>

:
                                <div className="col-xl-12 font-weight-bold">
                                  <div className=" d-flex align-items-center justify-content-center shape-circle waiting"><i className="fas fa-spinner"></i></div>
                                  <h2 className="mt-3"><b>Waiting For Payment</b></h2>
                                  <p className=""> <i className="fas fa-info-circle"></i> Pay your application fee to confirm your application. </p>
                                </div>
} */}
                              {/* </div> */}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Applicant Information</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white shadow">
                            <td>
                              <div className="row p-4">
                                <div class="col-xl-3">

                                  <div className="mb-2">
                                    {
                                      applicantInfoList.fileContent ?
                                        <img src={"data:image/jpg;base64," + applicantInfoList.fileContent} height="120px" className="border rounded" />
                                        : <img src={staticImg} height="150px" className="border rounded" />
                                    }
                                  </div>

                                  <div className="mb-2">
                                    <Label for="class-group" className="text-primary-light">Registration No. </Label>
                                    <h4><b>{applicantInfoList.registrationId}</b></h4>
                                  </div>

                                  <div className="mb-0">
                                    <Label for="class-group" className="text-primary-light">Roll No. </Label>
                                    <h4><b>{applicantInfoList.rollNo}</b></h4>
                                  </div>

                                </div>

                                <div class="col-xl-6 seperator">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: {applicantInfoList.applicantName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: {applicantInfoList.gender}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: {applicantInfoList.religion}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: {applicantInfoList.dob ? get_DDMMM_YY_Format_WithComma(applicantInfoList.dob) : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Name</label>: {applicantInfoList.fatherName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Name</label>: {applicantInfoList.motherName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: {applicantInfoList.mobileNo}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: {applicantInfoList.addressDetails}</div>

                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: {applicantInfoList.totalFee} TK</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Payment Status</label>:
                                      {applicantInfoList.applicantFeeStatus === 1 ? <span className="text-success ml-1"><b>Paid</b></span>
                                        : applicantInfoList.applicantFeeStatus === 0 ? <span className="text-orange ml-1"><b>Unpaid</b></span>
                                          : ''}
                                    </div>

                                  </div>
                                </div>

                                <div class="col-xl-3 seperator">
                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Class </Label>
                                    <h5 className='font-weight-bold'>{applicantInfoList.clasName}</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Group </Label>
                                    <h5 className='font-weight-bold'>{applicantInfoList.groupName}</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Application Date</Label>
                                    {applicantInfoList.applicationDate ?
                                      <h5 className='font-weight-bold'>{get_DDMMM_YY_Format_WithComma(applicantInfoList.applicationDate)}</h5>
                                      : ''}
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Application End Date</Label>
                                    {applicantInfoList.applicationDate ?
                                      <h5 className='font-weight-bold'>{get_DDMMM_YY_Format_WithComma(applicantInfoList.applicationEndDate)}</h5>
                                      : ''}
                                  </div>

                                </div>

                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Applicant Information</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-0">
                              <div className="row p-4 bg-white mx-0 mb-3 shadow">
                                <div class="col-xl-3">
                                  <div className="mb-2">
                                    <img src={staticImg} height="220px" className="border rounded" />
                                  </div>
                                </div>

                                <div class="col-xl-6 ">
                                  <div className="row">
                                    <div class="col-xl-6">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Registration No. <br />
                                        <b>1200135</b>
                                      </div>
                                    </div>

                                    <div class="col-xl-6 ">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Roll No. <br />
                                        <b>00135</b>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="mt-4 student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: Shahrear Kabir</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: 2 March, 1991</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: 135.00 TK</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Payment Status</label>: <span className="text-success ml-1"> Paid</span></div>

                                  </div>
                                </div>

                                <div class="col-xl-3 seperator">
                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Class </Label>
                                    <h5 className="font-weight-bold">Nine</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Group </Label>
                                    <h5 className="font-weight-bold">Science</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Application Date</Label>
                                    <h5 className="font-weight-bold">31 June, 2020</h5>
                                  </div>

                                  <div className="mb-0">
                                    <Label className="text-primary-light mb-0">Application End Date</Label>
                                    <h5 className="font-weight-bold">15 November, 2020</h5>
                                  </div>

                                </div>
                              </div>

                              <div className="row p-4 bg-white mx-0 mb-0 shadow">
                                <div class="col-xl-3">
                                  <div className="mb-2">
                                    <img src={staticImg} height="220px" className="border rounded" />
                                  </div>
                                </div>

                                <div class="col-xl-6 ">
                                  <div className="row">
                                    <div class="col-xl-6">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Registration No. <br />
                                        <b>1200135</b>
                                      </div>
                                    </div>

                                    <div class="col-xl-6 ">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Roll No. <br />
                                        <b>00135</b>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="mt-4 student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: Shahrear Kabir</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: 2 March, 1991</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: 135.00 TK</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Payment Status</label>: <span className="text-success ml-1"> Paid</span></div>

                                  </div>
                                </div>

                                <div class="col-xl-3 seperator">
                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Class </Label>
                                    <h5 className="font-weight-bold">Nine</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Group </Label>
                                    <h5 className="font-weight-bold">Science</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Application Date</Label>
                                    <h5 className="font-weight-bold">31 June, 2020</h5>
                                  </div>

                                  <div className="mb-0">
                                    <Label className="text-primary-light mb-0">Application End Date</Label>
                                    <h5 className="font-weight-bold">15 November, 2020</h5>
                                  </div>

                                </div>

                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

 */}

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

          <Modal
            className="booklist-popup-wrapper modal-dialog-centered"
            isOpen={this.state.modalVisible}
            toggle={this.onChangeModalStatus}
          >
            <button
              className="close-btn"
              onClick={this.onChangeModalStatus}
            >
              <i className="fas fa-times" />
            </button>

            <ModalBody>
              <div className="content-wrapper content-padding-sm pt-0 pb-0">
                <div className="book-list-wrapper">
                  <div className="table-responsive" style={{ boxShadow: 'none' }}>
                    <table className="book-list w-100">

                      <tr>

                        <td>
                          <table className="book-details">
                            <tr>
                              <td colSpan="12">
                                <span className="title">Exam Instruction</span>
                              </td>

                            </tr>

                            <tr>
                              <td colSpan="12">
                                <span className="">{applicantInfoList.admissionExamInstruction}</span>
                              </td>
                            </tr>

                          </table>
                        </td>
                      </tr>
                      )

                    </table>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>

        </AppLayout>
      </div>
    );
  }
}

TrackApplication.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trackApplication: makeSelectTrackApplication(),
  registrationNo: makeSelectRegistrationNo(),
  applicantInfoList: makeSelectApplicantInfoList()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeRegNo: (value) => { dispatch(setRegistrationNo(value)) },
    onSubmitSearch: () => { dispatch(submitSearch()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'trackApplication', reducer });
const withSaga = injectSaga({ key: 'trackApplication', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TrackApplication);
