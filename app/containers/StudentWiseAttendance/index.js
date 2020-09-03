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
import makeSelectStudentWiseAttendance, { makeSelectStudentID, makeSelectAttendanceFromDate, makeSelectAttendancToeDate, makeSelectAttendanceList, makeSelectAttendanceLoaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/avatar.png';
import { submitSearchButton, setStudentID, setAttendanceFromDate, setAttendanceToDate, } from './actions';
import { AppLayout } from '../AppLayout';
import { get_DDMMYY_Format_WithSlash } from '../../utils/dateFormat';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { centerTableLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */

export class StudentWiseAttendance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stdDetailsHeaderVisible: false,
      errors: {},

    }
  }

  onChangeStudentId = (e) => {
    this.props.onChangeStudentID(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeAttendanceFromDate = (value, name) => {
    this.props.onChangeFromDate(value);
    this.clearErrorMsg(name);
  }

  onChangeAttendanceToDate = (value, name) => {
    this.props.onChangeToDate(value);
    this.clearErrorMsg(name);
  }

  onSubmitSearch = (e) => {

    this.setState({ stdDetailsHeaderVisible: true });

    e.preventDefault();
    if (!this.emptyFieldCheck()) {
      this.props.submitSearch();
    }
  }

  emptyFieldCheck() {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (this.props.studentID === '' || this.props.studentID === null) {
      fieldIsEmpty = true;
      errors["studentID"] = "Student ID can't left empty.";
    }

    if (this.props.attendanceFromDate === '' || this.props.attendanceFromDate === undefined) {
      fieldIsEmpty = true;
      errors["fromDate"] = "From Date can't left empty.";
    }
    if (this.props.attendanceToDate === '' || this.props.attendanceToDate === undefined) {
      fieldIsEmpty = true;
      errors["toDate"] = "To Date can't left empty.";
    }

    this.setState({ errors });
    return fieldIsEmpty;

  }

  clearErrorMsg = (name) => {
    let { errors } = this.state;
    errors[name] = ''
    this.setState({ errors })
  }

  render() {

    // console.log('attendanceList-index', this.props.attendanceList);
    let { attendanceList, attendanceFromDate, attendanceToDate } = this.props;
    let { errors } = this.state;

    let fromDateForHeader = '';
    if (attendanceFromDate == '' || !attendanceFromDate == null) {
      fromDateForHeader = '';
    } else { fromDateForHeader = get_DDMMYY_Format_WithSlash(attendanceFromDate); }

    let toDateForHeader = '';
    if (attendanceToDate == '' || !attendanceToDate == null) {
      toDateForHeader = '';
    } else { toDateForHeader = get_DDMMYY_Format_WithSlash(attendanceToDate); }

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>StudentWiseAttendance</title>
            <meta
              name="description"
              content="Description of StudentWiseAttendance"
            />
          </Helmet>

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
                      <div className="col-md-12 col-lg-12 form">
                        <Form method='POST' onSubmit={(e) => this.onSubmitSearch(e)} inline>
                          <div className="col-md-12 col-lg-3">
                            <FormGroup className=" custom-input-text">
                              <Input
                                type="text"
                                name="studentID"
                                placeholder="Enter Student ID "
                                onChange={this.onChangeStudentId}
                              />
                            </FormGroup>
                            <span className="error-message">{errors["studentID"]}</span>
                          </div>

                          <div className="col-md-5 col-lg-3" style={{ marginTop: '-8px' }}>
                            <div>
                              <DatePicker
                                placeholderText='select from date'
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                isClearable
                                fixedHeight
                                maxDate={this.props.attendanceToDate}
                                selected={this.props.attendanceFromDate}
                                onChange={(e) => this.onChangeAttendanceFromDate(e, 'fromDate')}
                                className="dayPicker-custom-input"
                                name='fromDate'
                              />
                            </div>
                            <span className='error-message'>{errors['fromDate']}</span>

                            {/*                             
                            <FormGroup>
                              <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="from date placeholder"
                                onChange={(evt) => this.onChangeAttendanceFromDate(evt)}
                              />
                            </FormGroup> */}
                          </div>

                          <div className="col-md-7 col-lg-3" style={{ marginTop: '-8px' }}>

                            <DatePicker
                              placeholderText='select to date'
                              dateFormat="dd/MM/yyyy"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              isClearable
                              fixedHeight
                              minDate={this.props.attendanceFromDate}
                              selected={this.props.attendanceToDate}
                              onChange={(e) => this.onChangeAttendanceToDate(e, 'toDate')}
                              className="dayPicker-custom-input"
                              name='toDate'
                              style={{ marginRight: '42px' }}
                            />
                            <span className='error-message'>{errors['toDate']}</span>

                            {/* <FormGroup>
                              <Input
                                type="date"
                                name="toDate"
                                id="toDate"
                                placeholder="to date placeholder"
                                onChange={(evt) => this.onChangeAttendanceToDate(evt)}
                              />
                              
                            </FormGroup> */}
                          </div>
                          <div className="col-md-7 col-lg-3" style={{ marginTop: '-8px', marginLeft: '-75px' }}>
                            <Button className="btn explore-btn" type='submit'>Search</Button>
                          </div>

                        </Form>
                      </div>
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
                    Showing result for  <span className="text-orange">Student ID : {this.state.stdDetailsHeaderVisible == true ? this.props.studentID + ' (' + fromDateForHeader + ' to ' + toDateForHeader + ')' : ''} </span>
                  </h5>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-12 attendance-body-header">
                    <div className="row attendance-body-header-inside justify-content-md-center">
                      <div className="col-md-6 col-lg-2 img">
                        <div className="attendance present"><img src={donorImage} /></div>
                      </div>

                      <div className="col-md-6 col-lg-4 info">
                        <Table
                          borderless
                          className="student-wise-attendance"
                        >
                          <tbody>
                            <tr>
                              <td>Student Name</td>
                              <td className="text-orange">: {attendanceList ? attendanceList.studentName : ''}</td>
                            </tr>
                            <tr>
                              <td>Student ID</td>
                              <td>: {attendanceList ? attendanceList.studentId : 0}</td>
                            </tr>
                            <tr>
                              <td>Institute ID</td>
                              <td>: {attendanceList ? attendanceList.instituteId : 0}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>

                      <div className="col-md-3 col-lg-1 roll-no">
                        <div className="title">Roll No.</div>
                        <div className="value text-orange">{attendanceList ? attendanceList.studentRoll : 0}</div>
                      </div>

                      <div className="col-md-12 col-lg-2">
                        {attendanceList && attendanceList.details && attendanceList.details.length ?
                          <Chart
                            width="100%"
                            height="120px"
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ['Attendance', 'count'],
                              ['Present', attendanceList.details.filter(b => b.status === "Present").length],
                              ['Absent', attendanceList.details.filter(b => b.status === "Absent").length],
                              ['Leave', attendanceList.details.filter(b => b.status === "Leave").length],
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
                          : ''}
                      </div>
                      <div className="col-md-12 col-lg-3 ">
                        <div className="legend-with-percent present">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Present</span>
                          <span className="percent">( {attendanceList ? attendanceList.presentPercent : 0}% )</span>
                        </div>

                        <div className="legend-with-percent absent">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Absent</span>
                          <span className="percent">( {attendanceList ? attendanceList.absentPercent : 0}%} )</span>
                        </div>

                        <div className="legend-with-percent delay">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Leave</span>
                          <span className="percent">( {attendanceList ? attendanceList.leavePercent : 0}%} )</span>
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
                        Total Attendance Found{' '}
                        <span className="text-orange">({attendanceList && attendanceList.details && attendanceList.details.length ? attendanceList.details.length : 0})</span>
                      </h2>
                      <div className="custom-title-border-left" />
                    </div>
                  </div>
                </div>
              </div>

              {this.props.loaderType === 'autoLoadOn' ? centerTableLoader() :
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
                            {
                              attendanceList && attendanceList.details ?
                                attendanceList.details.map((item, index) =>

                                  <tr>
                                    <td>{item.date}</td>
                                    <td>{item.day}</td>
                                    <td>{item.status}</td>
                                    <td>{item.presentTime}</td>
                                  </tr>
                                )

                                : <tr><td colSpan='4'>No Data Found</td></tr>
                            }

                          </tbody>

                          {/* 
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
                        </tbody> */}

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
              }
            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
          </div>
        </AppLayout>
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
  attendanceList: makeSelectAttendanceList(),
  loaderType: makeSelectAttendanceLoaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeStudentID: (evt) => { dispatch(setStudentID(evt.target.value)) },
    onChangeFromDate: (evt) => { dispatch(setAttendanceFromDate(evt)) },
    onChangeToDate: (evt) => { dispatch(setAttendanceToDate(evt)) },
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
