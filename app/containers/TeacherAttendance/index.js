/**
 *
 * TeacherAttendance
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
import makeSelectTeacherAttendance,  {makeSelectAttendanceList} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import { submitSearchButton, setAttendanceDate } from './actions';
import { AppLayout } from '../AppLayout';


/* eslint-disable react/prefer-stateless-function */
export class TeacherAttendance extends React.Component {

  onChangeAttendanceDate = (e) => {
    let date = e.target.value;
    let formattedDate = date.split('-');
    let finalDate = formattedDate[2] + '-' + formattedDate[1] + '-' + formattedDate[0];
    this.props.onChangeAttendanceDate(finalDate);
  


  }
  render() {
    let { teacherAttendanceList } = this.props;
    let totalHr = 0
    let totalPresentPercent  = 0

    let totalAbsentPercent  = 0

    let totalLeavePercent  = 0


    if(teacherAttendanceList && teacherAttendanceList.length !== 0) {
      totalHr = teacherAttendanceList.map(item => +item.totalHr)
      .reduce((a, b) => {
          return a + b;
      }, 0);

      totalPresentPercent = teacherAttendanceList.map(item => +item.totalPresent)
      .reduce((a, b) => {
          return a + b;
      }, 0);

      totalAbsentPercent = teacherAttendanceList.map(item => +item.totalAbsent)
      .reduce((a, b) => {
          return a + b;
      }, 0);

      totalLeavePercent = teacherAttendanceList.map(item => +item.totalLeave)
      .reduce((a, b) => {
          return a + b;
      }, 0);


      
    }


    // let chartColumnHeader = ["Active", "Inactive"];
    // emDueBillStatus = Object.entries(body.emDueBillAmountStatus)
    // emDueBillStatusArr.push(chartColumnHeader, ...emDueBillStatus);


    return (
      <div>
                <AppLayout>

        <div>
          <Helmet>
            <title>TeacherAttendance</title>
            <meta
              name="description"
              content="Description of TeacherAttendance"
            />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Teacher Attendance"
            menuStepFirst="Home"
            menuStepSenond="Administration"
            menuStepThird="Teacher Attendance"
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
                        <span className="percent">{totalHr && totalPresentPercent ? `(${+((totalHr * 100) / (totalPresentPercent * 100)) * 100} %)` : 0}</span>
                        </div>

                        <div className="legend-with-percent absent">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Absent</span>
                          <span className="percent">{totalHr && totalAbsentPercent ? `(${+((totalHr * 100) / (totalAbsentPercent * 100)) * 100} %)` : 0}</span>
                        </div>

                        {/* <div className="legend-with-percent delay">
                          <span className="title">Delay</span>
                          <span className="percent">( 13.3% )</span>
                        </div> */}

                        <div className="legend-with-percent on-leave">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">On Leave</span>
                          <span className="percent">{totalHr && totalLeavePercent ? `(${+((totalHr * 100) / (totalLeavePercent * 100)) * 100} %)` : 0}</span>
                        </div>
                      </div>
                      <div className="col-lg-6 form">
                        <Form inline>
                          <FormGroup>
                            <Input
                              type="date"
                              name="date"
                              id="exampleDate"
                              onChange={this.onChangeAttendanceDate}
                              placeholder="Select a date"
                            />
                            {/* <Button class="btn explore-btn">Search</Button> */}
                            <Button className="btn explore-btn all-border-radious" onClick={this.props.submitSearch}>Search</Button>

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
                            <th>Photo</th>
                            <th>Teacher's ID</th>
                            <th>Teacher's Name</th>
                            <th>Designation</th>
                            <th>Status</th>

                            {/* <th className="text-center">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                        {
                            teacherAttendanceList ?
                            teacherAttendanceList.map((item, index) =>
                                <tr>
                                  <td><center className="attendance failed"><img src={donorImage} /></center></td>
                                  <td>{item.customStaffId}</td>
                                  <td>{item.staffName}</td>
                                  <td>{item.staffDesignation}</td>
                                  <td>{item.stringAttendanceStatus}</td>
                                </tr>
                              )

                              : <tr><td colSpan='5'>No Data Found</td></tr>
                          }
                        </tbody>
                      </Table>
                    </div>
                  </di>
                </div>
                <div className="row m-t-40">
                  <div className="col-md-12">
                    <div className="text-center m-t-40">
                      <button className="btn explore-btn-lg">
                        Load More <i className="fas fa-angle-right" />
                      </button>
                    </div>
                  </div>
                </div>
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
        </AppLayout>
      </div>
    );
  }
}

TeacherAttendance.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func

};

const mapStateToProps = createStructuredSelector({
  teacherAttendance: makeSelectTeacherAttendance(),
  teacherAttendanceList: makeSelectAttendanceList(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeAttendanceDate: (evt) => { 
      console.log('evt',evt);
      dispatch(setAttendanceDate(evt)) 
    },
    submitSearch: () => { dispatch(submitSearchButton()) },

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teacherAttendance', reducer });
const withSaga = injectSaga({ key: 'teacherAttendance', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TeacherAttendance);
