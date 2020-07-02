/**
 *
 * Menu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  Collapse,
  UncontrolledDropdown,
  NavbarToggler,
} from 'reactstrap';
import { Container } from 'reactstrap';
import makeSelectMenu from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link, NavLink } from 'react-router-dom';

import { getUrlInfoLocally } from '../../utils/localStorageMethod';

export class Menu extends React.Component {

  toggle = () => { };

  render() {

    const info = JSON.parse(getUrlInfoLocally());

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
                        <NavItem><Link to='/home' className='nav-link'>Home</Link></NavItem>

                        <UncontrolledDropdown nav inNavbar>

                          <DropdownToggle nav caret>Instiute Info</DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Academic Info</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'>Welcome Speech</Link></NavItem>
                                <NavItem><Link to='/committee' className='nav-link'>Comittee</Link></NavItem>
                                <NavItem><Link to='/donors' className='nav-link'>Donor Member</Link></NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>List of</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/all_teachers' className='nav-link'>Teacher</Link></NavItem>
                                <NavItem><Link to='#' className='nav-link'>Student</Link></NavItem>
                                <NavItem><Link to='/stuff_information' className='nav-link'>Staff</Link></NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>About</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'>Instiute Details</Link></NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </DropdownMenu>

                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>Academic Info</DropdownToggle>
                          <DropdownMenu right>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Details Info</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/booklist' className='nav-link'>  Book List</Link></NavItem>
                                <NavItem><Link to='/dressCode' className='nav-link'>  Uniform</Link></NavItem>
                                <NavItem><Link to='/fees_info' className='nav-link'> Fees Info</Link></NavItem>
                                <NavItem><Link to='#' className='nav-link'>  Seat Info</Link></NavItem>
                                <NavItem><Link to='/syllabus_info' className='nav-link'> Syllabus</Link></NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Student Attendance</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'> Instiute Wise</Link></NavItem>
                                <NavItem><Link to='/sectionWise_attendance' className='nav-link'> Section Wise</Link></NavItem>
                                <NavItem><Link to='studentWise_attendance' className='nav-link'> Student Wise</Link></NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Fees Info</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <Link to='find_paySlip' className='nav-link'>Find Due Info</Link>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Routine Info</DropdownToggle>
                              <DropdownMenu right>

                                <NavItem><Link to='#' className='nav-link'> Class Routine </Link></NavItem>
                                <NavItem><Link to='#' className='nav-link'> Online Schedule </Link></NavItem>
                                <NavItem><Link to='#' className='nav-link'> Exam Routine </Link></NavItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>

                          </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>Result Info</DropdownToggle>

                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>Semester Exam</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/meritList' className='nav-link'>Merit List</Link></NavItem>
                                <NavItem><Link to='/failList' className='nav-link'>Fail List</Link>
                                </NavItem>
                                <NavItem><Link to='/sectionWise_result' className='nav-link'>Section wise </Link> </NavItem>
                                <Link to='individual_result' className='nav-link'>Individual</Link>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Public Exam</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'>Success Student</Link> </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                          </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>More</DropdownToggle>

                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Gallery</DropdownToggle>
                              <DropdownMenu right>

                                <NavItem><Link to='#' className='nav-link'>Photo Gallery</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Video Gallery</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Award Gallery</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Top Student</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Success Alumns</Link> </NavItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>More</DropdownToggle>

                              <DropdownMenu right>

                                <NavItem><Link to='#' className='nav-link'>Academic Calendar</Link> </NavItem>
                                <NavItem><Link to='/all_notice' className='nav-link'>Instiute Notice</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Important Link</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Download Corner</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Job Circular</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Contact</Link> </NavItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Login</DropdownToggle>

                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'>Student</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Guardian</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Teacher</Link> </NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Online Admission</DropdownToggle>
                              <DropdownMenu right>

                                <NavItem><Link to='#' className='nav-link'>Notice Admission</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Application</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Find Result</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Admit Card</Link> </NavItem>

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
                      <i className="far fa-square" />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, Class will be close.
                      </p>
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
