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

// let noticeList = []
export class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noticeList: [],
      toggle: false
    }
  }

  toggle = () => this.setState({ toggle: !this.state.toggle })

  componentDidMount() {

    setTimeout(() => {
      let sessionNoticeList = JSON.parse(sessionStorage.getItem('allNoticeList'));
      // let noticeList = this.props.noticeList;

      this.setState({ noticeList: sessionNoticeList })
      this.animateNoticeTitle()
      console.log("this.props.noticeList MENU", sessionNoticeList);

    }, 10000);

  }

  // componentWillReceiveProps(nextProps){
  //   console.log("nextProps>>>>>>>>>>>>>>>>>>>>>>>>>>>", nextProps.noticeList);

  //   if(nextProps.noticeList.length>0){

  //     if(count == 1){
  //       console.log("............................................................................");
  //       this.animateNoticeTitle()
  //       count++
  //     }
  //   }
  // }

  animateNoticeTitle = () => {
    // if(this.props.noticeList.length > 0){
    var noticeTxt = document.getElementsByClassName("notdetls-top");

    var elements1 = document.getElementsByClassName('typewrite')[0];
    let innerData = ''
    for (var i = 0; i < noticeTxt.length; i++) {

      if (i == 0) {
        innerData += '['
      }
      if (i == noticeTxt.length - 1) {
        innerData += '"' + noticeTxt[i].innerText + '"] '
      } else {
        innerData += '"' + noticeTxt[i].innerText + '", ';
      }
    }

    if (elements1) { elements1.setAttribute("data-type", innerData); }

    for (var i = 0; i < noticeTxt.length; i++) {

      noticeTxt[i].style.display = "none";
    }

    var elements = document.getElementsByClassName('typewrite');

    // console.log("elements:::::::::", elements)

    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
    // }
  }

  render() {
    let { noticeList } = this.state

    const info = JSON.parse(getUrlInfoLocally());

    return (
      <div className="header-menu">
        <section className="topmenu-wrapper">
          <div className="container-fluid">
            <div className="container"> {/*  container   */}
              <div className="row">
                <div className="col-12">

                  <Navbar expand="lg">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.toggle} navbar>
                      <Nav className="mr-auto" navbar>
                        <NavItem><Link to='/institute/home' className='nav-link'>Home</Link></NavItem>

                        <UncontrolledDropdown nav inNavbar>

                          <DropdownToggle nav caret>Institute Info</DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Administration</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/institute/welcome_speech' className='nav-link'>Welcome Speech</Link></NavItem>
                                <NavItem><Link to='/institute/committee' className='nav-link'>Committee</Link></NavItem>
                                <NavItem><Link to='/institute/donors' className='nav-link'>Donor Member</Link></NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>List of</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/institute/all_teachers' className='nav-link'>Teacher</Link></NavItem>
                                <NavItem><Link to='/institute/Student_info' className='nav-link'>Student</Link></NavItem>
                                <NavItem><Link to='/institute/stuff_information' className='nav-link'>Staff</Link></NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>About</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/institute/infrastructure' className='nav-link'> Institute Details</Link></NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown>

                            {/* <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>About</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/about' className='nav-link'>Instiute Details</Link></NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown> */}
                          </DropdownMenu>

                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>Academic Info</DropdownToggle>
                          <DropdownMenu right>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Details Info</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/institute/booklist' className='nav-link'>  Book List</Link></NavItem>
                                <NavItem><Link to='/institute/dressCode' className='nav-link'> Dress Code</Link></NavItem>
                                <NavItem><Link to='/institute/fees_info' className='nav-link'> Fees Info</Link></NavItem>
                                <NavItem><Link to='/institute/seatInfo' className='nav-link'>  Seat Info</Link></NavItem>
                                <NavItem><Link to='/institute/syllabus_info' className='nav-link'> Syllabus</Link></NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* not found */}

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Student Attendance</DropdownToggle>
                              <DropdownMenu right>
                                {/* <NavItem><Link to='#' className='nav-link'> Instiute Wise</Link></NavItem> */}
                                <NavItem><Link to='/institute/sectionWise_attendance' className='nav-link'> Section Wise</Link></NavItem>
                                <NavItem><Link to='/institute/studentWise_attendance' className='nav-link'> Student Wise</Link></NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Fees Info</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem>
                                  <Link to='/institute/find_paySlip' className='nav-link'>Find Payslip Info</Link>
                                </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* not found */}

                            {/* <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Routine Info</DropdownToggle>
                              <DropdownMenu right>

                                <NavItem><Link to='#' className='nav-link'> Class Routine </Link></NavItem>
                                <NavItem><Link to='#' className='nav-link'> Online Schedule </Link></NavItem>
                                <NavItem><Link to='#' className='nav-link'> Exam Routine </Link></NavItem>

                              </DropdownMenu>
                            </UncontrolledDropdown> */}

                          </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>Result Info</DropdownToggle>

                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>

                              <DropdownToggle nav caret>Semester Exam</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/institute/meritList' className='nav-link'>Merit List</Link></NavItem>
                                <NavItem><Link to='/institute/failList' className='nav-link'>Fail List</Link>
                                </NavItem>
                                <NavItem><Link to='/institute/sectionWise_result' className='nav-link'>Section Wise </Link> </NavItem>
                                <Link to='/institute/individual_result' className='nav-link'>Individual</Link>
                              </DropdownMenu>

                            </UncontrolledDropdown>
                            {/* not found */}
                            {/* <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Public Exam</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'>Success Student</Link> </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown> */}

                          </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>More</DropdownToggle>

                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Gallery</DropdownToggle>
                              <DropdownMenu right>

                                <NavItem><Link to='/institute/photo_gallery' className='nav-link'>Photo Gallery</Link> </NavItem>
                                {/* <NavItem><Link to='#' className='nav-link'>Video Gallery</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Award Gallery</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Top Student</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Success Alumns</Link> </NavItem> */}

                              </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>More</DropdownToggle>

                              <DropdownMenu right>

                                {/* <NavItem><Link to='#' className='nav-link'>Academic Calendar</Link> </NavItem> */}
                                <NavItem><Link to='/institute/all_notice' className='nav-link'>Institute Notice</Link> </NavItem>
                                {/* <NavItem><Link to='#' className='nav-link'>Important Link</Link> </NavItem> */}
                                <NavItem><Link to='/institute/download_corner' className='nav-link'>Download Corner</Link> </NavItem>
                                {/* <NavItem><Link to='#' className='nav-link'>Job Circular</Link> </NavItem> */}
                                {/* <NavItem><Link to='#' className='nav-link'>Contact</Link> </NavItem> */}

                              </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* Routine Menu */}
                            <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Routine</DropdownToggle>
                              <DropdownMenu right>
                                <NavItem><Link to='/institute/class_routine' className='nav-link'>Class Routine</Link> </NavItem>
                                <NavItem><Link to='/institute/online_class_routine' className='nav-link'>Online Class Routine</Link> </NavItem>
                                <NavItem><Link to='/institute/exam_routine' className='nav-link'>Exam Routine</Link> </NavItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Login</DropdownToggle>

                              <DropdownMenu right>
                                <NavItem><Link to='#' className='nav-link'>Student</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Guardian</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Teacher</Link> </NavItem>
                              </DropdownMenu>

                            </UncontrolledDropdown> */}

                            {/* <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Online Admission</DropdownToggle>
                              <DropdownMenu right>

                                <NavItem><Link to='#' className='nav-link'>Notice Admission</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Application</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Find Result</Link> </NavItem>
                                <NavItem><Link to='#' className='nav-link'>Admit Card</Link> </NavItem>

                              </DropdownMenu>
                            </UncontrolledDropdown> */}

                          </DropdownMenu>
                        </UncontrolledDropdown>

                        {/* ADMISIA MENU START */}
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>Online Admission</DropdownToggle>
                          <DropdownMenu right>
                            <UncontrolledDropdown nav inNavbar>
                              <NavItem><Link to='/institute/admisia/online_admission' className='nav-link'>Admission</Link> </NavItem>
                              <NavItem><Link to='/institute/admisia/payment' className='nav-link'>Payment</Link> </NavItem>
                              <NavItem><Link to='/institute/admisia/application_track' className='nav-link'>Search</Link> </NavItem>
                              <NavItem><Link to='/institute/admisia/download' className='nav-link'>Download</Link> </NavItem>
                            </UncontrolledDropdown>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </Navbar>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="notice-wrapper">
          <div className="container-fluid">
            <div className="container">  {/*  container   */}
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex">
                    <div className="notice-title">Latest News</div>
                    <div className="notice">
                      <i className="far fa-square" />
                      {
                        noticeList && noticeList.map((item, index) =>
                          <React.Fragment>
                            <p className="notdetls-top" style={{ display: 'none' }} >{item.noticeTitle}</p>

                          </React.Fragment>

                        )
                      }

                      <p className="">
                        <i className="">
                          <a
                            href="/institute/all_notice"
                            class="typewrite"
                            data-period="2000"
                            data-type='["Hi, Im Si.", "I am Creative.", "I Love Design.", "I Love to Develop."]'
                          >
                            <span class="wrap"></span>
                          </a>
                        </i>
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
  dispatch: PropTypes.func,
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
