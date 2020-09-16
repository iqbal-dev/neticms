/**
 *
 * SectionWiseAttendance
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
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  makeChangeDate, onSubmitSearchBtn,
} from './actions'
import { makeSelectStdAttendanceList, makeSelectDate, makeSelectChartDataArray, makeSelectLoaderStatus } from './selectors';

import { AppLayout } from '../AppLayout';
import { centerTableLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */
export class SectionWiseAttendance extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      errors: {},
    }
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.emptyFieldCheck = this.emptyFieldCheck.bind(this);

  }

  handleDateChange = (e) => {
    console.log('selected date', e);
    this.props.onChangeDate(e);
    this.setState({ errors: {} });
  }

  onSubmitSearch = (e) => {

    e.preventDefault();
    console.log('emptyCheck', this.emptyFieldCheck());
    if (!this.emptyFieldCheck()) {
      this.props.onSubmitSearch();
    }

  }

  emptyFieldCheck() {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (this.props.selectedDate === '' || this.props.selectedDate === undefined) {
      fieldIsEmpty = true;
      errors["date"] = "Date can't left empty.";
    }

    this.setState({ errors });
    return fieldIsEmpty;

  }

  render() {
    let { attendanceListData, chartDataArray } = this.props;
    // console.log("chartDataArray list - index", chartDataArray);

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>SectionWiseAttendance</title>
            <meta
              name="description"
              content="Description of SectionWiseAttendance"
            />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Section Attendance"
            menuStepFirst="Academic Info"
            menuStepSenond="Student Attendance"
            menuStepThird="Section Wise"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 attendance-body-header">
                    <div className="row attendance-body-header-inside py-4">
                      <div className="col-lg-3">
                        {chartDataArray ?
                          <Chart
                            width="200px"
                            height="200px"
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ['Attendance', 'count'],
                              ['Present', chartDataArray.presentData],
                              ['Absent', chartDataArray.absentData],
                              ['Leave', chartDataArray.leaveData]
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
                          : ''
                        }
                      </div>

                      <div className="col-lg-3 my-3">
                        <div className="legend-with-percent present">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Present</span>
                          <span className="percent">({chartDataArray ? chartDataArray.presentPercent : 0}%)</span>
                        </div>

                        <div className="legend-with-percent absent">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Absent</span>
                          <span className="percent">({chartDataArray ? chartDataArray.absentPercent : 0}%)</span>
                        </div>

                        <div className="legend-with-percent delay">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Leave</span>
                          <span className="percent">({chartDataArray ? chartDataArray.leavePercent : 0}%)</span>
                        </div>
                      </div>

                      <div className="row col-lg-6 form">

                        <div className="col-12 col-xl-8 my-2">
                          <FormGroup className="custom-dropdown">
                            <DatePicker
                              placeholderText='select date'
                              dateFormat="dd/MM/yyyy"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              isClearable
                              fixedHeight
                              selected={this.props.selectedDate}
                              onChange={this.handleDateChange}
                              className="dayPicker-custom-input group-btn"
                              name='date'
                            />
                          </FormGroup>
                          <span className="error-message">{this.state.errors["date"]}</span>
                        </div>

                        <div className="col-12 col-xl-4 my-2">
                          <FormGroup className="custom-dropdown">
                            <Button
                              className="btn explore-btn mb-0"
                              onClick={(e) => this.onSubmitSearch(e)}
                            >
                              <i class="fas fa-chevron-circle-right mr-3" ></i> Search
                            </Button>
                          </FormGroup>
                          <span className="error-message">{this.state.errors["year"]}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2>
                        Total Class Found{' '}
                        <span className="text-orange">({attendanceListData && attendanceListData.length ? attendanceListData.length : 0})</span>
                      </h2>
                      <div className="custom-title-border-left" />
                    </div>
                  </div>
                </div>
              </div>

              {this.props.loaderStatus === 'tableLoadOn' ? centerTableLoader() :

                <div className="container">
                  <div className="row">
                    <di className="col-md-12">
                      <div className="table-responsive custom-table">
                        <Table
                          responsive
                          className="section-wise-attendance-table attendance-symbol"
                        >
                          <thead>
                            <tr>
                              <th>Class Name</th>
                              <th>Total Students</th>
                              <th>Present</th>
                              <th>Absent</th>
                              {/* <th>Delay</th> */}
                              <th>Leave</th>
                              {/* <th className="text-center">Action</th> */}
                            </tr>
                          </thead>

                          <tbody>

                            {
                              attendanceListData && attendanceListData.length ?
                                attendanceListData.map((item) =>
                                  <tr>
                                    <td>{item.className}</td>
                                    <td>{item.totalAttenTakenStds}</td>
                                    <td>{item.presentStds}</td>
                                    <td>{item.absentStds}</td>
                                    <td>{item.totalLeaveStds}</td>
                                  </tr>
                                )

                                : <tr><td colSpan='5'>No Data Found</td></tr>
                            }

                          </tbody>

                          {/* <tbody>
                          <tr>
                            <td>Class Ten Section - A</td>
                            <td>57</td>
                            <td>57</td>
                            <td>00</td>
                            <td>07</td>
                            <td className="present">00</td>
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
                <div className="custom-title-border-center mb-2" />
              </div>
            </div>
          </div>
        </AppLayout>
      </div>
    );
  }
}

SectionWiseAttendance.propTypes = {
  dispatch: PropTypes.func.isRequired,
  attendanceListData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectDate(),
  attendanceListData: makeSelectStdAttendanceList(),
  chartDataArray: makeSelectChartDataArray(),
  loaderStatus: makeSelectLoaderStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeDate: (value) => { dispatch(makeChangeDate(value)) },
    onSubmitSearch: () => { dispatch(onSubmitSearchBtn()) }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sectionWiseAttendance', reducer });
const withSaga = injectSaga({ key: 'sectionWiseAttendance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SectionWiseAttendance);
