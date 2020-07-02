/**
 *
 * StudentWiseAttendance
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
import makeSelectStudentWiseAttendance, {makeSelectStudentID, makeSelectAttendanceFromDate,makeSelectAttendancToeDate } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import { submitSearchButton, setStudentID,setAttendanceFromDate, setAttendanceToDate,  } from './actions';


/* eslint-disable react/prefer-stateless-function */
export class StudentWiseAttendance extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>StudentWiseAttendance</title>
          <meta
            name="description"
            content="Description of StudentWiseAttendance"
          />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}

        <BreadcrumComponent
          pageTitle="Student Wise Attendance"
          menuStepFirst="Academic Info"
          menuStepSenond="Student Attendance"
          menuStepThird="Student Wise"
        />

        <section>
          <div className="container-fluid">

            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12 attendance-body-header">
                  <div className="row attendance-body-header-inside">
                    {/* <div className="row"> */}
                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          {/* <div className="row"> */}
                            <div className="col-md-12 col-lg-3">
                              <FormGroup className=" custom-input-text">
                              <Input 
                                type="text" 
                                name="studentID" 
                                placeholder="Enter Your Student ID Number"
                                onChange={this.props.onChangeStudentID}
                              />
                              </FormGroup>
                            </div>

                            <div className="col-md-5 col-lg-3">
                              <FormGroup>
                                <Input
                                  type="date"
                                  name="date"
                                  id="exampleDate"
                                  placeholder="date placeholder"
                                />
                              </FormGroup>
                            </div>

                            <div className="col-md-7 col-lg-6">
                              <FormGroup>
                                <Input
                                  type="date"
                                  name="date"
                                  id="exampleDate"
                                  placeholder="date placeholder"
                                />
                                <Button className="btn explore-btn" onClick={this.props.submitSearch}>Search</Button>
                              </FormGroup>
                            </div>

                          {/* </div> */}
                        </Form>
                      </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <div className="custom-title-border-center" />
                </div>
              </div>
            </div>

            <div className="container info-header-title">
              <div className="row">
                <h5 className="col-lg-12">
                  Showing result for  <span className="text-orange">Student ID: 5214578P ( 01 Jan - 2020 to 16 Feb -2020 )</span>
                </h5>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-12 attendance-body-header">
                  <div className="row attendance-body-header-inside justify-content-md-center">
                    <div className="col-md-6 col-lg-2 img">
                      <div className="attendance present"><img src={donorImage}/></div>
                    </div>

                    <div className="col-md-6 col-lg-4 info">
                      <Table
                        borderless
                        className="student-wise-attendance"
                      >
                        <tbody>
                          <tr>
                            <td>Student Name</td>
                            <td className="text-orange">: Md. Shahrear Kabir</td>
                          </tr>
                          <tr>
                            <td>Student ID</td>
                            <td>: Md. Shahrear Kabir 2</td>
                          </tr>
                          <tr>
                            <td>Institute ID</td>
                            <td>: Md. Shahrear Kabir 3</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div className="col-md-3 col-lg-1 roll-no">
                      <div className="title">Roll No.</div>
                      <div className="value text-orange">123</div>
                    </div>
                    
                    <div className="col-md-12 col-lg-2">
                      <Chart
                        width="100%"
                        height="120px"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['Attendance', 'count'],
                          ['Present', 11],
                          ['Absent', 2],
                          ['On Time', 2],
                        ]}
                        options={{
                          // title: 'My Daily Activities',
                          chartArea: {
                            left: 10,
                            top: 10,
                            right: 10,
                            bottom: 10,
                          },
                          backgroundColor: 'transparent',
                          legend: 'none',
                          slices: {
                            0: { color: '#1dbc60' },
                            1: { color: '#ff0000' },
                            2: { color: '#002749' },
                          },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                    </div>
                    <div className="col-md-12 col-lg-3 ">
                      <div className="legend-with-percent present">
                        {/* <span className="symbol-squire"></span> */}
                        <span className="title">Present</span>
                        <span className="percent">( 73.3% )</span>
                      </div>

                      <div className="legend-with-percent absent">
                        {/* <span className="symbol-squire"></span> */}
                        <span className="title">Absent</span>
                        <span className="percent">( 13.3% )</span>
                      </div>

                      <div className="legend-with-percent delay">
                        {/* <span className="symbol-squire"></span> */}
                        <span className="title">On</span>
                        <span className="percent">( 13.3% )</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2>
                      Total Student Found{' '}
                      <span className="text-orange">(1212)</span>
                    </h2>
                    <div className="custom-title-border-left" />
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <di className="col-md-12">
                  <div className="table-responsive custom-table">
                  <Table
                      responsive
                      className="student-wise-attendance-table attendance-symbol center"
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Day</th>
                          <th>Status</th>
                          <th>Present Time</th>
                          {/* <th className="text-center">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>22-07-2020</td>
                          <td>Thursday</td>
                          <td>
                            <div className="legend-with-percent present">
                              <span className="title">Present</span>
                            </div>
                          </td>
                          <td className="present">09:53 AM</td>
                        </tr>
                        <tr>
                          <td>21-07-2020</td>
                          <td>Wednesday</td>
                          <td>
                            <div className="legend-with-percent absent">
                              <span className="title">Absent</span>
                            </div>
                          </td>
                          <td className="absent">00:00</td>
                        </tr>
                        <tr>
                          <td>20-07-2020</td>
                          <td>Tuesday</td>
                          <td>
                            <div className="legend-with-percent delay">
                              <span className="title">Delay</span>
                            </div>
                          </td>
                          <td className="delay">10.17 AM</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </di>
              </div>
              {/* <div className="row m-t-40">
                <div className="col-md-12">
                  <div className="text-center m-t-40">
                    <button className="btn explore-btn-lg">
                      Load More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="offset-md-1 col-md-10">
              <div className="custom-title-border-center" />
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

StudentWiseAttendance.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentWiseAttendance: makeSelectStudentWiseAttendance(),
  studentID: makeSelectStudentID(),
  attendanceFromDate: makeSelectAttendanceFromDate(),
  attendanceToDate: makeSelectAttendancToeDate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeStudentID: (evt) => { 
      console.log('evt',evt);
      dispatch(setStudentID(evt)) 
    },
    onChangeAttendanceFromDate: (evt) => { 
      console.log('evt',evt);
      dispatch(setAttendanceFromDate(evt)) 
    },
    onChangeAttendanceToDate: (evt) => { 
      console.log('evt',evt);
      dispatch(setAttendanceToDate(evt)) 
    },
    submitSearch: () => { dispatch(submitSearchButton()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'studentWiseAttendance', reducer });
const withSaga = injectSaga({ key: 'studentWiseAttendance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentWiseAttendance);
