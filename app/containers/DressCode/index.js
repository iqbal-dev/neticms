/**
 *
 * DressCode
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import makeSelectDressCode from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectDressCodeList, makeSelectTabPanelStatus } from './selectors';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { setActivePanel } from './actions';
import maleIcon from '../../assets/img/male-icon.png';
import feMaleIcon from '../../assets/img/fe-male-icon.png';
import combineIcon from '../../assets/img/combine-icon.png';

import dresscode from '../../assets/img/dresscode.png';

/* eslint-disable react/prefer-stateless-function */
export class DressCode extends React.Component {
  toggleTab = tabId => this.props.onChangeTabPanel(tabId);

  render() {
    return (
      <div>
        {console.log('tabID', this.props.tabVisibleStatus)}
        <Helmet>
          <title>DressCode</title>
          <meta name="description" content="Description of DressCode" />
        </Helmet>
        <BreadcrumComponent
          pageTitle="Dress Code"
          menuStepFirst="Home"
          menuStepSenond="Administration"
          menuStepThird="Dress Code"
        />
        <section>
          <div className="container-fluid">
            {/* <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Dress Code</h2>
                    <div className="custom-title-border-left"></div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="dress-code-tab-wrapper">
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
                          <span>
                            <img src={maleIcon} />
                          </span>
                          <p>Male</p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.props.tabVisibleStatus === '2',
                          })}
                          onClick={() => {
                            this.toggleTab('2');
                          }}
                        >
                          <span>
                            <img src={feMaleIcon} />
                          </span>
                          <p>Female</p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.props.tabVisibleStatus === '3',
                          })}
                          onClick={() => {
                            this.toggleTab('3');
                          }}
                        >
                          <span>
                            <img src={combineIcon} />
                          </span>
                          <p>Combined</p>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={this.props.tabVisibleStatus}>
                      <TabPane tabId="1">
                        <div className="tab-panel-wrapper">
                          <div className="row">
                            <div className="col-md-8">
                              <div className="page-inner-title">
                                <h2 className="text-orange">
                                  Class One to Five
                                </h2>
                                <div className="custom-title-border-left" />
                              </div>
                              <div className="content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit in voluptate velit esse
                                  cillumcusantium doloremque laudantium, totam
                                  rem aperiam, eaque ipsa quae ab illo inventore
                                  veritatis. Duis aute irure dolor in
                                  reprehenderit in voluptate ve, eaque ipsa quae
                                  ab illo inventore veritatis.Duis aute irure
                                  dolor in reprehenderit in voluptate velit
                                  esse.
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="panel-image text-center">
                                <img
                                  src={dresscode}
                                  className="img-fluid m-auto"
                                  alt="Dress code one"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-wrapper">
                          <div className="row">
                            <div className="col-md-8 ">
                              <div className="page-inner-title">
                                <h2 className="text-orange">
                                  Class One to Five
                                </h2>
                                <div className="custom-title-border-left" />
                              </div>
                              <div className="content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit in voluptate velit esse
                                  cillumcusantium doloremque laudantium, totam
                                  rem aperiam, eaque ipsa quae ab illo inventore
                                  veritatis. Duis aute irure dolor in
                                  reprehenderit in voluptate ve, eaque ipsa quae
                                  ab illo inventore veritatis.Duis aute irure
                                  dolor in reprehenderit in voluptate velit
                                  esse.
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4 md-order-first">
                              <div className="panel-image text-center">
                                <img
                                  src={dresscode}
                                  className="img-fluid m-auto"
                                  alt="Dress code two"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="tab-panel-wrapper">
                          <div className="row">
                            <div className="col-md-8">
                              <div className="page-inner-title">
                                <h2 className="text-orange">
                                  Class One to Five
                                </h2>
                                <div className="custom-title-border-left" />
                              </div>
                              <div className="content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit in voluptate velit esse
                                  cillumcusantium doloremque laudantium, totam
                                  rem aperiam, eaque ipsa quae ab illo inventore
                                  veritatis. Duis aute irure dolor in
                                  reprehenderit in voluptate ve, eaque ipsa quae
                                  ab illo inventore veritatis.Duis aute irure
                                  dolor in reprehenderit in voluptate velit
                                  esse.
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="panel-image text-center">
                                <img
                                  src={dresscode}
                                  className="img-fluid m-auto"
                                  alt="Dress code three"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-wrapper">
                          <div className="row">
                            <div className="col-md-8 ">
                              <div className="page-inner-title">
                                <h2 className="text-orange">
                                  Class One to Five
                                </h2>
                                <div className="custom-title-border-left" />
                              </div>
                              <div className="content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit in voluptate velit esse
                                  cillumcusantium doloremque laudantium, totam
                                  rem aperiam, eaque ipsa quae ab illo inventore
                                  veritatis. Duis aute irure dolor in
                                  reprehenderit in voluptate ve, eaque ipsa quae
                                  ab illo inventore veritatis.Duis aute irure
                                  dolor in reprehenderit in voluptate velit
                                  esse.
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4 md-order-first">
                              <div className="panel-image text-center">
                                <img
                                  src={dresscode}
                                  className="img-fluid m-auto"
                                  alt="Dress code four"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div className="tab-panel-wrapper">
                          <div className="row">
                            <div className="col-md-8">
                              <div className="page-inner-title">
                                <h2 className="text-orange">
                                  Class One to Five
                                </h2>
                                <div className="custom-title-border-left" />
                              </div>
                              <div className="content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit in voluptate velit esse
                                  cillumcusantium doloremque laudantium, totam
                                  rem aperiam, eaque ipsa quae ab illo inventore
                                  veritatis. Duis aute irure dolor in
                                  reprehenderit in voluptate ve, eaque ipsa quae
                                  ab illo inventore veritatis.Duis aute irure
                                  dolor in reprehenderit in voluptate velit
                                  esse.
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="panel-image text-center">
                                <img
                                  src={dresscode}
                                  className="img-fluid m-auto"
                                  alt="Dress code five"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-panel-wrapper">
                          <div className="row">
                            <div className="col-md-8 ">
                              <div className="page-inner-title">
                                <h2 className="text-orange">
                                  Class One to Five
                                </h2>
                                <div className="custom-title-border-left" />
                              </div>
                              <div className="content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in reprehenderit in voluptate velit esse
                                  cillumcusantium doloremque laudantium, totam
                                  rem aperiam, eaque ipsa quae ab illo inventore
                                  veritatis. Duis aute irure dolor in
                                  reprehenderit in voluptate ve, eaque ipsa quae
                                  ab illo inventore veritatis.Duis aute irure
                                  dolor in reprehenderit in voluptate velit
                                  esse.
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4 md-order-first">
                              <div className="panel-image text-center">
                                <img
                                  src={dresscode}
                                  className="img-fluid m-auto"
                                  alt="Dress code six"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
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
          </div>
        </section>
      </div>
    );
  }
}

DressCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dressCodeList: PropTypes.any,
  tabVisibleStatus: PropTypes.any,
  onChangeTabPanel: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dressCode: makeSelectDressCode(),
  dressCodeList: makeSelectDressCodeList(),
  tabVisibleStatus: makeSelectTabPanelStatus(), // /last day work
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeTabPanel: tabId => dispatch(setActivePanel(tabId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dressCode', reducer });
const withSaga = injectSaga({ key: 'dressCode', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DressCode);
