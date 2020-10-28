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
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap';
import staticImg from '../../../assets/img/demo-image.jpg';

/* eslint-disable react/prefer-stateless-function */
export class TrackApplication extends React.Component {
  render() {
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
            menuStepFirst="Online Payment"
            menuStepSenond="Payment"
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
                                      type="text"
                                      name="class-group"
                                      placeholder="Enter Registration No."
                                    // value={(admissionObj && admissionObj.className) + " ( " + (admissionObj && admissionObj.groupName) + " )"}
                                    // readOnly
                                    >
                                    </Input>
                                  </FormGroup>
                                </div>

                                <div className="col-xl-4">
                                  <FormGroup className="mb-0">
                                    {/* <Label for="class-group" className="text-primary-light"><small> </small></Label> */}
                                    <br />
                                    <Button
                                      className="btn all-border-radious no-border explore-btn border-0 mt-xl-2 px-4"
                                    // onClick={examInfoDialog}
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
                                  <b className="ml-3"><u><a href="#">Forgot your Registration No. ?</a></u></b>
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
                              <div className="row">
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

                                <div className="col-xl-12 font-weight-bold">
                                  <div className=" d-flex align-items-center justify-content-center shape-circle waiting"><i className="fas fa-spinner"></i></div>
                                  <h2 className="mt-3"><b>Waiting For Payment</b></h2>
                                  <p className=""> <i className="fas fa-info-circle"></i> Pay your application fee to confirm your application. </p>
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
                          <tr className="bg-white shadow">
                            <td>
                              <div className="row p-4">
                                <div class="col-xl-3">

                                  <div className="mb-2">
                                    <img src={staticImg} height="150px" className="border rounded"/>
                                  </div>

                                  <div className="mb-2">
                                    <Label for="class-group" className="text-primary-light">Registration No. </Label>
                                    <h4><b>120120120</b></h4>
                                  </div>

                                  <div className="mb-0">
                                    <Label for="class-group" className="text-primary-light">Roll No. </Label>
                                    <h4><b>125689</b></h4>
                                  </div>

                                  
                                </div>

                                <div class="col-xl-6 seperator">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: Shahrear Kabir</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: Male</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: Islam</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: 2 March, 1991</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Name</label>: Md. Ruhul Amin</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Name</label>: Most. Jobeda Khatun</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: 01675886072</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: Test address</div>
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
                            <td className="p-0">
                              <div className="row p-4 bg-white mx-0 mb-3 shadow">
                                <div class="col-xl-3">
                                  <div className="mb-2">
                                    <img src={staticImg} height="220px" className="border rounded"/>
                                  </div>
                                </div>

                                <div class="col-xl-6 ">
                                  <div className="row">
                                    <div class="col-xl-6">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Registration No. <br/>
                                        <b>1200135</b>
                                      </div>
                                    </div>

                                    <div class="col-xl-6 ">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Roll No. <br/>
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
                                    <img src={staticImg} height="220px" className="border rounded"/>
                                  </div>
                                </div>

                                <div class="col-xl-6 ">
                                  <div className="row">
                                    <div class="col-xl-6">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Registration No. <br/>
                                        <b>1200135</b>
                                      </div>
                                    </div>

                                    <div class="col-xl-6 ">
                                      <div class="bg-primary-dark text-center text-white py-3 rounded">
                                        Roll No. <br/>
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

TrackApplication.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trackApplication: makeSelectTrackApplication(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
