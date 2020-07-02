/**
 *
 * FindPayslip
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
import reducer from './reducer';
import saga from './saga';
import { Button, Input, Form, FormGroup, Table } from 'reactstrap';
import Chart from 'react-google-charts';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { setActivePanel } from '../DressCode/actions';
import { AppLayout } from '../AppLayout';
import { 
  makeChangeAcademicYear, 
  makeChangeStudentID, 
  submitSearchHandle 
} from './actions';
import { 
  makeSelectTabPanelStatus, 
  makeSelectAcademicYearList, 
  makeSelectAcademicYear, 
  makeSelectStudentID, 
  makeSelectFindPayslipData 
} from './selectors';

// import { 
//   // makeSelectFindPayslip,
//   makeSelectTabPanelStatus,
//   makeSelectAcademicYearList 
// } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class FindPayslip extends React.PureComponent {
  toggleTab = tabId => this.props.onChangeTabPanel(tabId);

  onSearchStudentInfo = () => {
    if (true) {this.props.onSubmitSearch();}
  }

  render() {
    // let { errors } = this.state
    let { academicYearList, makeSelectFindPayslipData, academicYear } = this.props;

    let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
    let instituteId = '';
    { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }


    console.log("this.props.makeSelectFindPayslipData ::::::::::::::", makeSelectFindPayslipData);

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>FindPayslip</title>
            <meta name="description" content="Description of FindPayslip" />
          </Helmet>
          <BreadcrumComponent
            pageTitle="Find Payslip"
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
                      {/* <div className="row"> */}
                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          {/* <div className="row"> */}
                          <div className="col-md-5">
                            <FormGroup className="custom-dropdown">
                              <Input
                                type="select"
                                name="year"
                                onChange={this.props.onChangeAcademicYear}
                                // value={ this.props.academicYear}
                              >
                                <option value=''>Select Academic Year</option>
                                {academicYearList && academicYearList.map(item => (<option key={item.name} value={academicYear || item.name}>{item.name}</option>))}
                              </Input>
                            </FormGroup>
                            {/* <div className="error-message"> {errors['year']}</div> */}
                          </div>

                          <div className="col-md-7">
                            <FormGroup className="mb-0">
                              <Input 
                                type="text" 
                                name="studentID" 
                                placeholder="Enter Your Student ID Number"
                                onChange={this.props.onChangeStudentID}
                              />

                              <Button 
                                className="btn explore-btn mb-0"
                                onClick={this.onSearchStudentInfo}
                              >
                                Search
                              </Button>
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
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row find-pay-slip-info-wrapper">
                      <div className="col-lg-6 col-md-12">
                        <div className="student-info d-md-flex align-items-lg-center justify-content-md-center">
                          <div className="student-image">
                            <img src={donorImage} className="img-fluid rounded-circle" width="140" />
                          </div>
                          <div className="student-info-table">
                            <Table>
                              <tr>
                                <td>Student Name</td>
                                <td>: { makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].name }</td>
                              </tr>
                              <tr>
                                <td>Student ID</td>
                                <td>: { makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].customId }</td>
                              </tr>
                              <tr>
                                <td>Institute ID</td>
                                <td>: { instituteId }</td>
                              </tr>
                            </Table>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="d-md-flex align-items-md-center justify-content-md-center">
                          <div className="roll-no-box">
                            <div className="text-center">
                              <span>Roll No.</span>
                              <h1>{ makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].roll }</h1>
                            </div>
                          </div>
                          <div className="student-info-table">
                            <Table>
                              {/* <tr>
                                <td>Total Due</td>
                                <td>: { makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].totalDue } /-</td>
                              </tr>
                              <tr>
                                <td>Payment Last Date</td>
                                <td>: 22 July, 2020</td>
                              </tr> */}
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="payslip-tab-wrapper">
                      <Nav
                        tabs
                        className="w-100 d-inline-flex justify-content-center align-items-center"
                      >
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.props.tabVisibleStatus === '1',
                            })}
                            onClick={e => {
                              this.toggleTab('1');
                            }}
                          >
                            <p>Male</p>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.props.tabVisibleStatus === '2',
                            })}
                            onClick={e => {
                              this.toggleTab('2');
                            }}
                          >
                            <p>Female</p>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <div className="panel-border"></div>
                      <TabContent activeTab={this.props.tabVisibleStatus} className="find-pay-slip-info-wrapper">
                        <TabPane tabId="1">
                          <div className="tab-panel-wrapper student-info">
                            <div className="row">
                              {
                                makeSelectFindPayslipData && makeSelectFindPayslipData.map((item, index) =>
                                  <div className="col-md-6 mb-3">
                                    <div className="student-info-box-wrapper">
                                      <div className="student-info-box-title">
                                        Fee Type :  <span>{ item.feeHeadDetails }</span>
                                      </div>
                                      <div className="student-info-table">
                                        <Table>
                                          <tr>
                                            <td>Invoice ID</td>
                                            <td>: { item.invoiceId }</td>
                                          </tr>
                                          <tr>
                                            <td>Fee Name</td>
                                            <td>: { item.feeSubHeadDetails }</td>
                                          </tr>
                                          <tr>
                                            <td>Total Payable</td>
                                            <td>: { item.totalPayable }</td>
                                          </tr>
                                          <tr>
                                            <td>Paid</td>
                                            <td>: { item.totalPaid }</td>
                                          </tr>
                                          <tr>
                                            <td>Total Due</td>
                                            <td className='text-orange'>: { item.totalDue }</td>
                                          </tr>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                              
                            </div>
                          </div>

                        </TabPane>
                        <TabPane tabId="2">
                          <div className="tab-panel-wrapper">
                            this is demo
                        </div>
                        </TabPane>
                      </TabContent>

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
        </AppLayout>
      </div>
    );
  }
}

FindPayslip.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tabVisibleStatus: PropTypes.any,
  onChangeTabPanel: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // findPayslip: makeSelectFindPayslip(),
  tabVisibleStatus: makeSelectTabPanelStatus(), // /last day work
  academicYearList: makeSelectAcademicYearList(),
  academicYear: makeSelectAcademicYear(),
  studentID: makeSelectStudentID(),
  makeSelectFindPayslipData: makeSelectFindPayslipData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeTabPanel: tabId => dispatch(setActivePanel(tabId)),
    onChangeAcademicYear: (evt) => { dispatch(makeChangeAcademicYear(evt.target.value)) },
    onChangeStudentID: (evt) => { dispatch(makeChangeStudentID(evt.target.value)) },
    onSubmitSearch: () => { dispatch(submitSearchHandle()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'findPayslip', reducer });
const withSaga = injectSaga({ key: 'findPayslip', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FindPayslip);
