/**
 *
 * Payment
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
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap';

// custom imports
import { makeSelectRegistrationNo, makeSelectApplicantInfoList } from './selectors';
import { setRegistrationNo, submitSearch } from './actions';

import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { get_DDMMM_YY_Format_WithComma } from '../../../utils/dateFormat';
import { Link } from 'react-router-dom';
import { BASE_URL_NETI_CMS } from '../../../utils/serviceUrl';

export class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
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
            pageTitle="Online Payment"
            menuStepFirst="Online Admission"
            menuStepSenond="Payment"
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
                                      type="text"
                                      name="registrationNo"
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
                          <tr>
                            <td class="p-4 bg-white shadow">
                              <div className="row">
                                <div class="col-xl-3">
                                  <div className="mb-4">
                                    <Label for="class-group" className="text-primary-light">Registration No. </Label>
                                    <h4><b>{applicantInfoList.registrationId}</b></h4>
                                  </div>

                                  <div className="mb-4">
                                    <Label for="class-group" className="text-primary-light">Roll No. </Label>
                                    <h4><b>{applicantInfoList.rollNo}</b></h4>
                                  </div>

                                  <div className="mb-4">
                                    <Label for="class-group" className="text-primary-light">Payment Status</Label>
                                    {applicantInfoList.applicantFeeStatus === 1 ? <h4 className="text-success"><b>Paid</b></h4>
                                      : applicantInfoList.applicantFeeStatus === 0 ? <h4 className="text-orange"><b>Unpaid</b></h4>
                                        : ''}
                                  </div>
                                </div>

                                <div class="col-xl-6 seperator">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: {applicantInfoList.applicantName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: {applicantInfoList.gender}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: {applicantInfoList.religion}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: {applicantInfoList.dob}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Name</label>: {applicantInfoList.fatherName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Name</label>: {applicantInfoList.motherName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: {applicantInfoList.mobileNo}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: {applicantInfoList.addressDetails}</div>

                                  </div>
                                </div>

                                <div class="col-xl-3 seperator">
                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Class </Label>
                                    <h5>{applicantInfoList.clasName}</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Group </Label>
                                    <h5>{applicantInfoList.groupName}</h5>
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Application Date</Label>
                                    {applicantInfoList.applicationDate ?
                                      <h5 className="">{get_DDMMM_YY_Format_WithComma(applicantInfoList.applicationDate)}</h5>
                                      : ''}
                                  </div>

                                  <div className="mb-3">
                                    <Label className="text-primary-light mb-0">Application End Date</Label>
                                    {applicantInfoList.applicationDate ?
                                      <h5 className="">{get_DDMMM_YY_Format_WithComma(applicantInfoList.applicationEndDate)}</h5>
                                      : ''}
                                  </div>

                                </div>

                                {applicantInfoList.applicantFeeStatus === 0 ?
                                  <div class="col-xl-9 text-orange mt-5">
                                    <h4><b><i className="fas fa-info-circle"></i> Pay your application fee to confirm your application. </b></h4>
                                  </div>
                                  : ''
                                }
                                {applicantInfoList.applicantFeeStatus === 0 ?

                                  <div class="col-xl-3 text-orange mt-5">
                                    <FormGroup className="mb-0">

                                      <Link
                                        className="btn all-border-radious no-border explore-btn mx-2 "
                                        to={{ pathname: `${BASE_URL_NETI_CMS}/admisia/application-fee/pay?registrationId=${applicantInfoList.registrationId}`, }}
                                        target="_blank"
                                      >
                                        Pay <i class="fas fa-angle-right" ></i>
                                      </Link>

                                      {/* <Button
                                        className="btn all-border-radious no-border explore-btn border-0"
                                        onClick={this.handlePay}
                                      >
                                        Payment
                                      </Button> */}

                                    </FormGroup>
                                  </div>
                                  : ''}

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
                            <th>Payment Instruction</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="row p-4">
                                <div className="col-xl-3"><div className="border bg-white text-center p-3">Step-1</div></div>
                                <div className="col-xl-3"><div className="border bg-white text-center p-3">Step-2</div></div>
                                <div className="col-xl-3"><div className="border bg-white text-center p-3">Step-3</div></div>
                                <div className="col-xl-3"><div className="border bg-white text-center p-3">Step-4</div></div>
                              </div>
                            </td>
                          </tr>
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

Payment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
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

const withReducer = injectReducer({ key: 'payment', reducer });
const withSaga = injectSaga({ key: 'payment', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Payment);
