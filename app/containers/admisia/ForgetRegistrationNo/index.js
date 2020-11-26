/**
 *
 * ForgetRegistrationNo
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
import makeSelectForgetRegistrationNo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button, FormGroup, Input, Label, Table, Modal, ModalBody } from 'reactstrap';

//customs imports
import {
  makeSelectMobileNo, makeSelectApplicantInfoList, makeSelectCommitteeloaderType
} from './selectors';
import { setMobileNo, submitSearch } from './actions';

import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import staticImg from '../../../assets/img/demo-image.jpg';
import { get_DDMMM_YY_Format_WithComma } from '../../../utils/dateFormat';
import { centerTableLoader } from '../../../utils/contentLoader';

export class ForgetRegistrationNo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      modalVisible: false,

    }
  }

  onChangeMobileNumber = (e) => {
    this.props.onChangeMobileNo(e.target.value);
    this.clearErrorMsg('mobileNo')
  }

  submitSearchBtn = () => {

    if (this.emptyFieldCheck()) {
      this.props.onSubmitSearch();
    }

  }

  emptyFieldCheck = () => {

    let { errors } = this.state;
    let formIsValid = true;

    if (this.props.mobileNo === '') {
      formIsValid = false;
      errors["mobileNo"] = "Mobile No. can't left empty";
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

          <BreadcrumComponent
            pageTitle="Find Forget Reg. No."
            menuStepFirst="Online Admision"
            menuStepSenond="Track"
            menuStepThird="Forget Registration No. "
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">
                <div className="row">
                  <div className="col-xl-12"><h2 className="text-center text-orange mb-3">Forget Registration No.</h2></div>

                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Academic Year: 2020</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="2" class="p-4">
                              <div className="row">
                                <div className="col-xl-4">
                                  <FormGroup>
                                    <Label for="class-group" className="text-primary-light"><small>Mobile No. <span className="required">*</span></small></Label>
                                    <Input
                                      className=" bg-white border-0 rounded-0"
                                      type="text"
                                      name="class-group"
                                      placeholder="Enter Mobile No."
                                      value={this.props.mobileNo}
                                      onChange={this.onChangeMobileNumber}
                                    >
                                    </Input>
                                    <span className='error-message'>{errors['mobileNo']}</span>
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
                                {/* <div className="col-xl-4 text-center my-xl-auto text-primary d-flex my-3">
                                  <span className="shape-squire"></span>
                                  <span className="shape-squire"></span>
                                  <b className="ml-3"><u><Link to="/institute/admisia/find_registration_no">Forgot your Registration No. ?</Link></u></b>
                                </div> */}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                {this.props.loaderType === 'tableLoadOn' ? centerTableLoader() :

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

                            {applicantInfoList && applicantInfoList.length ?

                              applicantInfoList.map((applicantInfo) => (
                                <tr>
                                  <td className="p-0">
                                    <div className="row p-4 bg-white mx-0 mb-3 shadow">
                                      <div class="col-xl-3">
                                        <div className="mb-2">
                                          {
                                            applicantInfo.fileContent ?
                                              <img src={"data:image/jpg;base64," + applicantInfo.fileContent} height="220px" className="border rounded" />
                                              : <img src={staticImg} height="220px" className="border rounded" />
                                          }
                                          {/* <img src={staticImg} height="220px" className="border rounded" /> */}
                                        </div>
                                      </div>

                                      <div class="col-xl-6 ">
                                        <div className="row">
                                          <div class="col-xl-6">
                                            <div class="bg-primary-dark text-center text-white py-3 rounded">
                                              Registration No. <br />
                                              <b>{applicantInfo.registrationId}</b>
                                            </div>
                                          </div>

                                          <div class="col-xl-6 ">
                                            <div class="bg-primary-dark text-center text-white py-3 rounded">
                                              Roll No. <br />
                                              <b>{applicantInfo.rollNo}</b>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="mt-4 student-details-info">
                                          <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: {applicantInfo.applicantName}</div>
                                          <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: {applicantInfo.dob ? get_DDMMM_YY_Format_WithComma(applicantInfo.dob) : ''}</div>
                                          <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: {applicantInfo.totalFee} TK</div>
                                          <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Payment Status</label>:
                                     {applicantInfo.applicantFeeStatus === 1 ? <span className="text-success ml-1"><b>Paid</b></span>
                                              : applicantInfo.applicantFeeStatus === 0 ? <span className="text-orange ml-1"><b>Unpaid</b></span>
                                                : ''}
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-xl-3 seperator">
                                        <div className="mb-3">
                                          <Label className="text-primary-light mb-0">Class </Label>
                                          <h5 className='font-weight-bold'>{applicantInfo.clasName}</h5>
                                        </div>

                                        <div className="mb-3">
                                          <Label className="text-primary-light mb-0">Group </Label>
                                          <h5 className='font-weight-bold'>{applicantInfo.groupName}</h5>
                                        </div>

                                        <div className="mb-3">
                                          <Label className="text-primary-light mb-0">Application Date</Label>
                                          {applicantInfo.applicationDate ?
                                            <h5 className='font-weight-bold'>{get_DDMMM_YY_Format_WithComma(applicantInfo.applicationDate)}</h5>
                                            : ''}
                                        </div>

                                        <div className="mb-0">
                                          <Label className="text-primary-light mb-0">Application End Date</Label>
                                          {applicantInfo.applicationDate ?
                                            <h5 className='font-weight-bold'>{get_DDMMM_YY_Format_WithComma(applicantInfo.applicationEndDate)}</h5>
                                            : ''}
                                        </div>

                                      </div>
                                    </div>

                                    {/* <div className="row p-4 bg-white mx-0 mb-0 shadow">
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

                              </div> */}
                                  </td>
                                </tr>

                              ))
                              : <tr><td colSpan='12'>No Data Found</td></tr>

                            }
                          </tbody>

                        </Table>
                      </div>

                    </div>
                  </div>
                }

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

ForgetRegistrationNo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgetRegistrationNo: makeSelectForgetRegistrationNo(),
  mobileNo: makeSelectMobileNo(),
  applicantInfoList: makeSelectApplicantInfoList(),
  loaderType: makeSelectCommitteeloaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeMobileNo: (value) => { dispatch(setMobileNo(value)) },
    onSubmitSearch: () => { dispatch(submitSearch()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgetRegistrationNo', reducer });
const withSaga = injectSaga({ key: 'forgetRegistrationNo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgetRegistrationNo);
