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

import {
  makeChangeDate, onSubmitSearchBtn,
} from './actions'
import { makeSelectStdAttendanceList, makeSelectDate, makeSelectChartDataArray } from './selectors';

import { AppLayout } from '../AppLayout';

/* eslint-disable react/prefer-stateless-function */
export class SectionWiseAttendance extends React.Component {

  constructor(props) {

    super(props);
    this.state = {}
    this.onSubmitSearch = this.onSubmitSearch.bind(this);

  }

  onSubmitSearch = (e) => {
    e.preventDefault();
    this.props.onSubmitSearch();
  }

  render() {

    // console.log("data list - index", this.props.attendanceListData);
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
            pageTitle="Section Wise Attendance"
            menuStepFirst="Academic Info"
            menuStepSenond="Student Attendance"
            menuStepThird="Section Wise"
          />

          <section>
            <div className="container-fluid">
              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12 attendance-body-header">
                    <div className="row attendance-body-header-inside">
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

                      <div className="col-lg-3 m-t-30 m-b-30 ">
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

                      <div className="col-lg-6 form">
                        <Form inline method='POST' onSubmit={(e) => this.onSubmitSearch(e)}>
                          <FormGroup>
                            <Input
                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                              value={this.props.selectedDate}
                              onChange={(e) => this.props.onChangeDate(e)}
                            />
                            <Button className="btn explore-btn">Search</Button>
                          </FormGroup>
                        </Form>
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
                        Total Class Found{' '}
                        <span className="text-orange">({attendanceListData && attendanceListData.length ? attendanceListData.length : 0})</span>
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
                              attendanceListData.map((item, index) =>
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

SectionWiseAttendance.propTypes = {
  dispatch: PropTypes.func.isRequired,
  attendanceListData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectDate(),
  attendanceListData: makeSelectStdAttendanceList(),
  chartDataArray: makeSelectChartDataArray(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeDate: (evt) => { dispatch(makeChangeDate(evt.target.value)) },
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
