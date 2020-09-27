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
import staticImage from '../../assets/img/avatar.png';
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

export class FindPayslip extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }
    this.emptyFieldCheck = this.emptyFieldCheck.bind(this);

  }

  onChangeAcYear = (e) => {
    this.props.onChangeAcademicYear(e)
    this.clearErrorMsg(e.target.name);
  }

  onChangeStudentId = (e) => {
    this.props.onChangeStudentID(e);
    this.clearErrorMsg(e.target.name);
  }

  handleSubmitSearch = (e) => {

    // console.log('handleSubmitSearch', !this.emptyFieldCheck());
    e.preventDefault();

    if (!this.emptyFieldCheck()) {
      this.props.onSubmitSearch();
    }

  }

  emptyFieldCheck() {

    let { errors } = this.state;
    let fieldIsEmpty = false;

    if (this.props.academicYear === '' || this.props.academicYear === undefined) {
      fieldIsEmpty = true;
      errors["year"] = "Year can't left empty.";
    }

    if (this.props.studentID === '' || this.props.studentID === undefined) {
      fieldIsEmpty = true;
      errors["studentID"] = "Student ID can't left empty.";
    }

    this.setState({ errors });
    return fieldIsEmpty;

  }

  clearErrorMsg = (name) => {
    let { errors } = this.state;
    errors[name] = ''
    this.setState({ errors })
  }

  toggleTab = tabId => this.props.onChangeTabPanel(tabId);
  // onSearchStudentInfo = () => {
  //   if (true) { this.props.onSubmitSearch(); }
  // }

  render() {

    // console.log("student & academic year", this.props.studentID, this.props.academicYear);

    let { academicYearList, makeSelectFindPayslipData, academicYear } = this.props;

    let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
    let instituteId = '';
    { instituteUrlInfo && instituteUrlInfo.length ? instituteId = instituteUrlInfo[0].emInstituteList[0].edumanInstituteId : instituteId }

    // console.log("this.props.makeSelectFindPayslipData ::::::::::::::", makeSelectFindPayslipData);

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
            menuStepSenond="Fees Info"
            menuStepThird="Find Payslip Info"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 attendance-body-header">
                    <div className="row attendance-body-header-inside">

                      <div className="col-md-12 col-lg-12 form py-4">
                        <Form inline>
                          <div className="col-12 col-xl-4">
                            <FormGroup className="custom-dropdown">
                              <Input
                                type="select"
                                name="year"
                                onChange={(e) => this.onChangeAcYear(e)}
                              // value={ this.props.academicYear}
                              >
                                <option value=''>Select Academic Year</option>
                                {academicYearList && academicYearList.map(item => (<option key={item.name} value={academicYear || item.name}>{item.name}</option>))}
                              </Input>
                              <span className="error-message">{this.state.errors["year"]}</span>
                            </FormGroup>

                          </div>

                          <div className="col-12 col-xl-4">
                            <FormGroup className="mb-0">
                              <Input
                                type="text"
                                name="studentID"
                                placeholder="Enter Student ID Number"
                                onChange={(e) => this.onChangeStudentId(e)}
                              />
                              <span className="error-message">{this.state.errors["studentID"]}</span>
                            </FormGroup>

                          </div>

                          <div className="col-12 col-xl-4">
                            <FormGroup className="mb-0">
                              <Button
                                className="btn explore-btn mb-0 all-border-radious"
                                onClick={this.handleSubmitSearch}
                              >
                                <i class="fas fa-chevron-circle-right mr-3" ></i> Search
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
                    <div className="row find-pay-slip-info-wrapper py-4">
                      <div className="col-lg-6 col-md-12">
                        <div className="student-info d-md-flex align-items-lg-center justify-content-md-center">
                          <div className="student-image">
                            {makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].byteImage ? <img src={"data:image/*; base64," + makeSelectFindPayslipData[0].byteImage} className="img-fluid rounded-circle" width="140" />
                              : <img src={staticImage} className="img-fluid rounded-circle" width="140" />}

                          </div>
                          <div className="student-info-table">
                            <Table>
                              <tr>
                                <td>Student Name</td>
                                <td>: {makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].name}</td>
                              </tr>
                              <tr>
                                <td>Student ID</td>
                                <td>: {makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].customId}</td>
                              </tr>
                              <tr>
                                <td>Institute ID</td>
                                <td>: {instituteId}</td>
                              </tr>
                            </Table>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="d-md-flex align-items-md-center justify-content-md-center py-3">
                          <div className="roll-no-box">
                            <div className="text-center">
                              <span>Roll No.</span>
                              <h1>{makeSelectFindPayslipData && makeSelectFindPayslipData[0] && makeSelectFindPayslipData[0].roll}</h1>
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
                            <p>Student's Unpaid Payslip Details</p>
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
                            <p>Student's Paid Payslip Details</p>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <div className="panel-border"></div>
                      <TabContent activeTab={this.props.tabVisibleStatus} className="find-pay-slip-info-wrapper">
                        <TabPane tabId="1">
                          <div className="tab-panel-wrapper student-info">
                            <div className="row">
                              {
                                makeSelectFindPayslipData && makeSelectFindPayslipData.map((item) =>
                                  <div className="col-md-6 mb-3">
                                    <div className="student-info-box-wrapper">
                                      <div className="student-info-box-title">
                                        Fee Name :  <span>{item.feeHeadDetails}</span>
                                      </div>
                                      <div className="student-info-table">
                                        <Table>
                                          <tr>
                                            <td>Payslip ID</td>
                                            <td>: {item.invoiceId}</td>
                                          </tr>
                                          <tr>
                                            <td>Fee Subhead</td>
                                            <td>: {item.feeSubHeadDetails}</td>
                                          </tr>
                                          <tr>
                                            <td>Total Payable</td>
                                            <td className='text-orange'>: {item.totalPayable} /-BDT</td>
                                          </tr>
                                          {/* <tr>
                                            <td>Paid</td>
                                            <td>: {item.totalPaid} /-BDT</td>
                                          </tr>
                                          <tr>
                                            <td>Total Due</td>
                                            <td className='text-orange'>: {item.totalDue} /-BDT</td>
                                          </tr> */}
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
                            under construction
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
                <div className="custom-title-border-center mb-2" />
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
