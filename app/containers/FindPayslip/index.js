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
import makeSelectFindPayslip, { makeSelectTabPanelStatus } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Button, Input, Form, FormGroup, Table } from 'reactstrap';
import Chart from 'react-google-charts';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { setActivePanel } from '../DressCode/actions';



/* eslint-disable react/prefer-stateless-function */
export class FindPayslip extends React.PureComponent {
  toggleTab = tabId => this.props.onChangeTabPanel(tabId);

  render() {
    return (
      <div>
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
                          <FormGroup className=" custom-input-text">
                            <Input type="text" name="academic-year" placeholder="Enter Your Student ID Number">
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-7">
                          <FormGroup>
                            <Input type="text" name="academic-year" placeholder="Enter Your Student ID Number"></Input>

                            <Button className="btn explore-btn">Search</Button>
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
                              <td>: Sayma Rezoyana Khan</td>
                            </tr>
                            <tr>
                              <td>Student ID</td>
                              <td>: 5214578P</td>
                            </tr>
                            <tr>
                              <td>Institute ID</td>
                              <td>: NTI25415478545</td>
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
                            <h1>112</h1>
                          </div>
                        </div>
                        <div className="student-info-table">
                          <Table>
                            <tr>
                              <td>Total Due</td>
                              <td>: 25000/-</td>
                            </tr>
                            <tr>
                              <td>Payment Last Date</td>
                              <td>: 22 July, 2020</td>
                            </tr>
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
                            <div className="col-md-6">
                              <div className="student-info-box-wrapper">
                                  <div className="student-info-box-title">
                                    Fee Type :  <span>Tuition Fees</span>
                                  </div>
                                  <div className="student-info-table">
                                    <Table>
                                      <tr>
                                        <td>Student Name</td>
                                        <td>: Sayma Rezoyana Khan</td>
                                      </tr>
                                      <tr>
                                        <td>Student ID</td>
                                        <td>: 5214578P</td>
                                      </tr>
                                      <tr>
                                        <td>Institute ID</td>
                                        <td>: NTI25415478545</td>
                                      </tr>
                                    </Table>
                                  </div>
                              </div>
                            </div>
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
  findPayslip: makeSelectFindPayslip(),
  tabVisibleStatus: makeSelectTabPanelStatus(), // /last day work
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeTabPanel: tabId => dispatch(setActivePanel(tabId)),
    dispatch,
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
