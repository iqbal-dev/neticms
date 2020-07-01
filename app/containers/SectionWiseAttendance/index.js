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
import makeSelectSectionWiseAttendance, { makeSelectSectionWiseAttendanceData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import {
  makeChangeDate,
} from './actions'
import { AppLayout } from '../AppLayout';
import makeSelectStudentWiseAttendance from '../StudentWiseAttendance/selectors';

/* eslint-disable react/prefer-stateless-function */
export class SectionWiseAttendance extends React.Component {
  render() {
    console.log("attendanceListData", this.props.attendanceListData);
    
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
                        <Chart
                          width="200px"
                          height="200px"
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
                      <div className="col-lg-3 m-t-30 m-b-30 ">
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
                      <div className="col-lg-6 form">
                        <Form inline>
                          <FormGroup>
                            <Input
                              type="date"
                              name="date"
                              id="exampleDate"
                              placeholder="date placeholder"
                              onChange={ this.props.onChangeDate }
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
                        className="section-wise-attendance-table attendance-symbol"
                      >
                        <thead>
                          <tr>
                            <th>Section Name</th>
                            <th>Total Students</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Delay</th>
                            <th>Leave</th>
                            {/* <th className="text-center">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Class Ten Section - A</td>
                            <td>57</td>
                            <td>57</td>
                            <td>00</td>
                            <td>07</td>
                            <td className="present">00</td>
                          </tr>
                          <tr>
                            <td>Class One Section - A</td>
                            <td>65</td>
                            <td>65</td>
                            <td>00</td>
                            <td>00</td>
                            <td className="absent">00</td>
                          </tr>
                          <tr>
                            <td>Class Five Section - B</td>
                            <td>45</td>
                            <td>42</td>
                            <td>03</td>
                            <td>05</td>
                            <td className="delay">00</td>
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
        </AppLayout>
      </div>
    );
  }
}

SectionWiseAttendance.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sectionWiseAttendance: makeSelectSectionWiseAttendance(),
  attendanceListData: makeSelectSectionWiseAttendanceData()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeDate: (evt) => { dispatch(makeChangeDate(evt.target.value)) },
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
