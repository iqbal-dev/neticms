/**
 *
 * AdmisiaDownload
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
import makeSelectAdmisiaDownload from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  makeSelectRegistrationNo,
  makeSelectApplicantInfoList,
  makeSelectMessage,
  makeSelectLoader
} from './selectors';
import { setRegistrationNo, submitSearch } from './actions';

// Custom imports
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap';
import staticImg from '../../../assets/img/demo-image.jpg';
import { get_DDMMM_YY_Format_WithComma } from '../../../utils/dateFormat';
import { BASE_URL_NETI_CMS, ADMISIA_ADMIT_CARD_DOWNLOAD } from '../../../utils/serviceUrl';
import { AdmissionConfirmationLetter } from '../AdmissionConfirmationLetter';
import { Link } from 'react-router-dom';

export class AdmisiaDownload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }
  }

  onChangeRegNumber = (e) => {
    var filteredValue = e.target.value.replace(/\D/g, "");
    this.props.onChangeRegNo(filteredValue);
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

  onDownloadAdmitCard = () => {

    let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
    let cmsId = instituteUrlInfo && instituteUrlInfo[0] && instituteUrlInfo[0].cmsId;
    let regId = this.props.applicantInfoList.registrationId;

    if (this.props.applicantInfoList.applicantFeeStatus === 1) {

      const requestURL = BASE_URL_NETI_CMS.concat(ADMISIA_ADMIT_CARD_DOWNLOAD).concat('?cmsId=').concat(cmsId).concat('&registrationIds=').concat(regId);
      const finalURL = requestURL;
      if (finalURL) {
        setTimeout(() => {
          const response = {
            file: finalURL,
          };
          window.location.href = response.file;

        }, 100);

      }

    }

  }

  onLoadConfirmationLetter = () => {
    this.refs.admissionConfirmationLetter.setConfirmationLetterToDownload();
  }

  render() {

    let { errors } = this.state;
    let { applicantInfoList } = this.props;
    const coreConfigDetails = JSON.parse(localStorage.getItem('admisiaCoreConfigDetails'));

    return (
      <div class="admisia">
        <AppLayout>
          <Helmet>
            <title>ApplicationForm</title>
            <meta name="description" content="Description of ApplicationForm" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Download"
            menuStepFirst="Online Admission"
            menuStepSenond="Download"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Academic Year: {coreConfigDetails.currentAdmissionYear ? coreConfigDetails.currentAdmissionYear : ''}</th>
                            {/* <th className="text-right"><span>Application End Date : { get_DDMMM_YY_Format_WithComma( (getApplicantView && getApplicantView.applicantPersonalViewResponse && getApplicantView.applicantPersonalViewResponse.applicationEndDate) || (admissionObj && admissionObj.applicationEndDate) ) }</span></th> */}
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td colSpan="2" class="p-4">
                              <div className="row">
                                <div className="col-xl-4">
                                  <FormGroup>
                                    <Label for="class-group" className="admisia-level">Registration No. <span className="required">*</span></Label>
                                    <Input
                                      className=" bg-white border-0 rounded-0"
                                      name="class-group"
                                      placeholder="Enter Registration No."
                                      maxLength="15"
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
                                      className="btn all-border-radious no-border explore-btn border-0 mt-xl-2"
                                      onClick={this.submitSearchBtn}
                                    >
                                      <i class="fas fa-search" ></i> Search
                                    </Button>
                                  </FormGroup>
                                  {/* <span className='error-message'>{errors['preExamInfo']}</span> */}
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
                            <th>Applicant Information</th>
                          </tr>
                        </thead>
                        <tbody>

                          {applicantInfoList && applicantInfoList.registrationId ?

                            <tr className="bg-white shadow">
                              <td>
                                <div className="row p-4">
                                  <div class="col-xl-3">

                                    <div className="mb-2">
                                      {/* <img src={staticImg} height="150px" className="border rounded" /> */}

                                      {
                                        applicantInfoList.fileContent ?
                                          <img src={"data:image/jpg;base64," + applicantInfoList.fileContent} height="220px" className="border rounded" />
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

                                  {applicantInfoList.applicantFeeStatus === 1 ?

                                    <div class="col-xl-8 text-success mt-5">
                                      {applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.applicantStatus === 5 ?
                                        <h4><b><i className="fas fa-info-circle"></i> Download your Admission Confirmation Letter. </b></h4>
                                        :
                                        applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.admissionExamStatus === 1 && applicantInfoList.applicantStatus === 1
                                          || applicantInfoList.applicantStatus === 2 || applicantInfoList.applicantStatus === 0 ?
                                          <h4><b><i className="fas fa-info-circle"></i> Download your Admit Card for upcoming assessment. </b></h4>
                                          :
                                          <h4><b><i className="fas fa-info-circle"></i> Download your Admission Confirmation Letter. </b></h4>
                                      }
                                    </div>
                                    : applicantInfoList.applicantFeeStatus === 0 ?
                                      <div class="col-xl-9 text-orange mt-5">
                                        <h4><b><i className="fas fa-info-circle"></i> Pay your application fee to confirm your application. </b></h4>
                                      </div>
                                      : ''}

                                  {applicantInfoList.applicantFeeStatus === 1 ?
                                    <div class="col-xl-4 text-orange mt-5 text-center">
                                      <FormGroup className="mb-0">

                                        {applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.applicantStatus === 5 ?

                                          <Link
                                            className="btn all-border-radious no-border explore-btn mx-2"
                                            to={{ pathname: '/institute/admission_confirmation_letter' }}
                                            target="_blank"
                                          >
                                            Admission Confirmation Letter
                                          </Link>

                                          // <Button
                                          //   className="btn all-border-radious no-border explore-btn border-0"
                                          //   onClick={() => this.onLoadConfirmationLetter()}
                                          //   disabled={applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.applicantStatus === 5 ?
                                          //     false : true}
                                          // >
                                          //   Confirmation Letter
                                          // </Button>

                                          :
                                          applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.admissionExamStatus === 1 && applicantInfoList.applicantStatus === 0
                                            || applicantInfoList.applicantStatus === 2 ?
                                            <Button
                                              className="btn all-border-radious no-border btn-no-hover border-0"
                                              disabled={true}
                                            >
                                              Admit Card
                                            </Button>
                                            :
                                            applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.admissionExamStatus === 1 && applicantInfoList.applicantStatus === 1 ?
                                              <Button
                                                className="btn all-border-radious no-border explore-btn border-0"
                                                onClick={this.onDownloadAdmitCard}
                                              >
                                                Admit Card
                                            </Button>
                                              :

                                              <Button
                                                className="btn all-border-radious no-border btn-no-hover border-0"
                                                disabled={true}
                                              >
                                                Admission Confirmation Letter
                                            </Button>

                                          //   <Link
                                          //     className="btn all-border-radious no-border btn-no-hover mx-2"
                                          //     disabled="true"
                                          //     target="_blank"
                                          //     to=""
                                          //   >
                                          //     Admission Confirmation Letter
                                          // </Link>

                                          // <Button
                                          //   className="btn all-border-radious no-border btn-no-hover border-0"
                                          //   disabled={true}
                                          // >
                                          //   Admit Card
                                          // </Button>

                                          //     <Button
                                          //       className="btn all-border-radious no-border explore-btn border-0 f-right"
                                          //       onClick={this.onDownloadAdmitCard}
                                          //       disabled={applicantInfoList.applicantFeeStatus === 1 && applicantInfoList.admissionExamStatus === 1 && applicantInfoList.applicantStatus === 1 ?
                                          //         false : true}
                                          //     >
                                          //       Admit Card
                                          // </Button>

                                        }

                                      </FormGroup>
                                    </div>
                                    : ''}

                                </div>
                              </td>

                            </tr>

                            : <tr><td colSpan='12'>No Data Found</td></tr>

                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

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

AdmisiaDownload.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  admisiaDownload: makeSelectAdmisiaDownload(),
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

const withReducer = injectReducer({ key: 'admisiaDownload', reducer });
const withSaga = injectSaga({ key: 'admisiaDownload', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdmisiaDownload);
