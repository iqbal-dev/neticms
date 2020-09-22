/**
 *
 * OnlineClassRoutine
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
import makeSelectOnlineClassRoutine from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { AppLayout } from '../AppLayout';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* eslint-disable react/prefer-stateless-function */
export class OnlineClassRoutine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }
  }

  render() {
    let { errors } = this.state;
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>OnlineClassRoutine</title>
            <meta
              name="description"
              content="Description of OnlineClassRoutine"
            />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Online Class Routine"
            menuStepFirst="More"
            menuStepSenond="Routine"
            menuStepThird="Online Class Routine"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside py-4 no-box-shadow bg-gray-light">

                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          <div className="col-md-6 col-lg-3">
                            <FormGroup className="custom-dropdown">
                              <Input className=" bg-white" type="select" name="examType" onChange={this.onChangeExam}>
                                <option value=''>Select Class</option>
                                {/* {examList && examList.map(item => (
                                    <option key={item.examConfigId} value={item.examConfigId}>{item.examObject.name}</option>
                                  ))} */}
                              </Input>
                              <span className="error-message"> {errors['examType']}</span>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup className="custom-dropdown">
                              <Input className=" bg-white" type="select" name="examType" onChange={this.onChangeExam}>
                                <option value=''>Select Group</option>
                                {/* {examList && examList.map(item => (
                                    <option key={item.examConfigId} value={item.examConfigId}>{item.examObject.name}</option>
                                  ))} */}
                              </Input>
                              <span className="error-message"> {errors['examType']}</span>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup className="custom-datepicker">
                              <DatePicker
                                placeholderText='select to date'
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                isClearable
                                fixedHeight
                                // minDate={this.props.attendanceFromDate}
                                // selected={this.props.attendanceToDate}
                                // onChange={(e) => this.onChangeAttendanceToDate(e, 'toDate')}
                                className="dayPicker-custom-input bg-white"
                                name='toDate'
                                // style={{ marginRight: '42px' }}
                              />
                              <span className='error-message'>{errors['toDate']}</span>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup>
                              <Button
                                className="btn explore-btn all-border-radious"
                              // onClick={this.onSubmitSearch}
                              >
                                <i class="fas fa-chevron-circle-right mr-3" ></i> Search
                                </Button>
                            </FormGroup>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title with-print mb-4">
                      <h2 className="bg-gray-light px-4 py-2">
                        <span className="font-18">
                          Showing Result of <span className="text-orange">Three-HQ-Day-A</span>
                        </span>
                          <span>
                            <span className="font-18">Total found:<span className="text-orange mx-2">(5)</span> </span>
                            <Button className="btn btn-success bg-primary-color-dark"><i className="fas fa-download"></i> Download</Button>
                          </span>
                      </h2>
                      {/* <div className="custom-title-border-left my-4" /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                      <div className="table-responsive custom-table">
                        <Table striped className="class-routine-table online">
                          <thead>
                            <tr>
                              <th colSpan="3" className="text-left">Online Class Routine Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><b>9.00 AM - 10.00 AM</b></td>
                              <td className="pl-5">
                                <span className="font-16"><b>English 1st Part</b></span>
                                <br/>
                                MD. Alamin Hossain
                              </td>
                              <td>
                                <b>Google Meet</b>
                                  <br/>
                                <u><a href="#">Class Link</a></u>
                              </td>
                            </tr>

                            <tr>
                              <td><b>9.00 AM - 10.00 AM</b></td>
                              <td className="pl-5">
                                <span className="font-16"><b>English 1st Part</b></span>
                                <br/>
                                MD. Alamin Hossain
                              </td>
                              <td>
                                <b>Google Meet</b>
                                  <br/>
                                <u><a href="#">Class Link</a></u>
                              </td>
                            </tr>

                          </tbody>
                        </Table>
                      </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center mb-2" />
              </div>
            </div>
          </div>

        </AppLayout>
      </div>
    );
  }
}

OnlineClassRoutine.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  onlineClassRoutine: makeSelectOnlineClassRoutine(),
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

const withReducer = injectReducer({ key: 'onlineClassRoutine', reducer });
const withSaga = injectSaga({ key: 'onlineClassRoutine', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OnlineClassRoutine);
