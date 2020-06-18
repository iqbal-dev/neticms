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
import makeSelectStudentWiseAttendance from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';

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
                                <Input type="text" name="academic-year">
                                </Input>
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
                                <Button class="btn explore-btn">Search</Button>
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

            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12 attendance-body-header">
                  <div className="row attendance-body-header-inside">
                    <div className="col-md-6 col-lg-3">
                      <Chart
                        width="200px"
                        height="200px"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['Result', 'count'],
                          ['Passed', 11],
                          ['Failed', 2],
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
                    <div className="col-md-6 col-lg-3 m-t-30 m-b-30 ">
                      <div className="legend-with-percent present">
                        {/* <span className="symbol-squire"></span> */}
                        <span className="title">Passed</span>
                        <span className="percent">( 73.3% )</span>
                      </div>

                      <div className="legend-with-percent absent">
                        {/* <span className="symbol-squire"></span> */}
                        <span className="title">Failed</span>
                        <span className="percent">( 13.3% )</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 form">
                      <Form inline>
                        <FormGroup className="custom-dropdown">
                          <Input type="select" name="academic-year">
                            <option>Select Academic Year</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                        <FormGroup className="custom-dropdown">
                          <Input type="select" name="exam-type">
                            <option>Select Exam Type</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                        <FormGroup className="custom-dropdown">
                          <Input type="select" name="section">
                            <option>Select Section</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>

                        <Button className="btn explore-btn full-width">Search</Button>
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
                          <th>Photo</th>
                          <th>Student ID</th>
                          <th>Roll No</th>
                          <th>Student Name</th>
                          <th>Total Marks</th>
                          <th>GPA</th>
                          <th>Grade</th>
                          {/* <th className="text-center">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><div className="attendance passed"><img src={donorImage}/></div></td>
                          <td>100024</td>
                          <td>1</td>
                          <td>Md. Shahrear Kabir</td>
                          <td>549.60</td>
                          <td>4.88</td>
                          <td className="passed">A</td>
                        </tr>
                        <tr>
                          <td><div className="attendance passed"><img src={donorImage}/></div></td>
                          <td>100024</td>
                          <td>2</td>
                          <td>Md. Shahrear Kabir 2</td>
                          <td>549.60</td>
                          <td>4.88</td>
                          <td className="passed">A</td>
                        </tr>
                        <tr>
                          <td><div className="attendance passed"><img src={donorImage}/></div></td>
                          <td>100024</td>
                          <td>3</td>
                          <td>Md. Shahrear Kabir 3</td>
                          <td>549.60</td>
                          <td>5.00</td>
                          <td className="passed">A+</td>
                        </tr>
                        <tr>
                          <td><div className="attendance failed"><img src={donorImage}/></div></td>
                          <td>100030</td>
                          <td>4</td>
                          <td>Md. Shahrear Kabir 4</td>
                          <td>120.60</td>
                          <td>00</td>
                          <td className="failed">F</td>
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

const withReducer = injectReducer({ key: 'studentWiseAttendance', reducer });
const withSaga = injectSaga({ key: 'studentWiseAttendance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentWiseAttendance);
