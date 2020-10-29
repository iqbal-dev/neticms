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
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap';
import staticImg from '../../../assets/img/demo-image.jpg';

/* eslint-disable react/prefer-stateless-function */
export class AdmisiaDownload extends React.Component {
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
                                      className="btn all-border-radious no-border explore-btn border-0 mt-xl-2"
                                    // onClick={examInfoDialog}
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
                            <tr className="bg-white shadow">
                              <td>
                                <div className="row p-4">
                                  <div class="col-xl-3">

                                    <div className="mb-2">
                                      <img src={staticImg} height="150px" className="border rounded" />
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

                                  <div class="col-xl-9 text-success mt-5">
                                    <h4><b><i className="fas fa-info-circle"></i> Download your Admit Card for upcoming assessment. </b></h4>
                                  </div>

                                  <div class="col-xl-9 text-orange mt-5">
                                    <h4><b><i className="fas fa-info-circle"></i> Pay your application fee to confirm your application. </b></h4>
                                  </div>

                                  <div class="col-xl-3 text-orange mt-5">
                                    <FormGroup className="mb-0">
                                      <Button
                                        className="btn all-border-radious no-border explore-btn border-0"
                                      // onClick={examInfoDialog}
                                      >
                                        Admit Card
                                      </Button>
                                    </FormGroup>
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

AdmisiaDownload.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  admisiaDownload: makeSelectAdmisiaDownload(),
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

const withReducer = injectReducer({ key: 'admisiaDownload', reducer });
const withSaga = injectSaga({ key: 'admisiaDownload', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdmisiaDownload);
