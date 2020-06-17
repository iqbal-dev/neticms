/**
 *
 * Menu
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
import makeSelectMenu from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  NavbarText,
  NavbarToggler,
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { getUrlInfoLocally } from '../../utils/localStorageMethod';

/* eslint-disable react/prefer-stateless-function */
export class Menu extends React.Component {

  toggle = () => { };

  render() {

    const info = JSON.parse(getUrlInfoLocally());
    // let instituteHostNm = info.urlName;

    console.log('menu-UrlInfoLocally', info);

    return (
      <div>
        <section className="topmenu-wrapper">
          <div className="container-fluid">
            <Container>
              <div className="row">
                <div className="col-12">
                  <Navbar expand="lg">
                    <NavbarToggler onClick={this.toggle()} />
                    <Collapse navbar>
                      <Nav className="mr-auto" navbar>
                        <NavItem>
                          <NavLink href="#">Home</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Instiute Info
                          </DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Academic Info
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Welcome Speech</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Comittee</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Donor Member</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                List of
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Teacher</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Student</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Staff</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                About
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Instiute Details</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Academic Info
                          </DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Details Info
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Book List</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Uniform</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Fees Info</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Seat Info</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Syllabus</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Student Attendance
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Instiute Wise</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Section Wise</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Student Wise</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Fees Info
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Find Due Info</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Routine Info
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Class Routine</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Online Schedule</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Exam Routine</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Result Info
                          </DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Semester Exam
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Merit List</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Fail List</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Section wise</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Individual</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Public Exam
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Success Student</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            More
                          </DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Gallery
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Photo Gallery</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Video Gallery</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Award Gallery</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Top Student</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Success Alumns</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                More
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Academic Calendar</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Instiute Notice</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Important Link</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Download Corner</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Job Circular</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Contact</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Login
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Student</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Guardian</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Teacher</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>
                                Online Admission
                              </DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <NavLink href="#">Notice Admission</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Application</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Find Result</NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">Admit Card</NavLink>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </Navbar>
                </div>
              </div>
            </Container>
          </div>
        </section>
        <div className="notice-wrapper">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex">
                    <div className="notice-title">Latest News</div>
                    <div className="notice">
                      <i className="far fa-square"></i><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, Class will be close.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menu: makeSelectMenu(),
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

const withReducer = injectReducer({ key: 'menu', reducer });
const withSaga = injectSaga({ key: 'menu', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Menu);
