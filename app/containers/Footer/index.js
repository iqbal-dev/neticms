/**
 *
 * Footer
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
import { Container, Row, Col } from 'reactstrap';
import makeSelectFooter from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Wrapper from './Wrapper';
import logo from '../../assets/img/logo.png';
import { makeSelectInstituteUrlInfo } from '../Header/selectors';
import { submitContact, setMessage, setEmail, setMobile, setName } from './actions';
import LoginAccess from './../../components/LoginAccess';

import {
  makeSelectName,
  makeSelectMobileNo,
  makeSelectEmail,
  makeSelectMessageDetails,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class Footer extends React.Component {

  onChangeName = (e) => {
    console.log('name e');
    this.props.onChangeName(e.target.valuee);
  }

  onChangeMobile = (e) => {
    this.props.onChangeMobile(e.target.value);
  }

  onChangeEmail = (e) => {
    this.props.onChangeEmail(e.target.value);
  }

  onChangeMessage = (e) => {
    // console.log('message e', e.target.value);
    this.props.onChangeMessage(e.target.value);
  }

  render() {

    let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));

    let instituteName = '';
    let instituteAddress = '';
    let instituteContact = '';
    let instituteEmail = '';

    if (instituteUrlInfo && instituteUrlInfo.length) {
      instituteName = instituteUrlInfo[0].instituteName;
      instituteAddress = instituteUrlInfo[0].instituteAddress;
      instituteContact = instituteUrlInfo[0].instituteContact;
      instituteEmail =instituteUrlInfo[0].instituteEmail;
    }

    return (
      <div>
        <LoginAccess />
        <footer className="footer-wrapper">
          <div className="container-fluid address-bg">
            <div className="container">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <div className="address-wrapper-full">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="address-wrapper">
                          <div className="text-center">
                            <div className="icon">
                              <i className="fas fa-map-marker-alt" />
                            </div>
                            <span className="title">Address</span>
                            <p className="content">{instituteAddress}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="phone-wrapper">
                          <div className="text-center">
                            <div className="icon">
                              <i className="fas fa-phone-square-alt" />
                            </div>
                            <span className="title">Phone Number</span>
                            <p className="content mb-0">{instituteContact}</p>
                            {/* <p className="content">+88 01914 550 220</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="email-wrapper">
                          <div className="text-center">
                            <div className="icon">
                              <i className="far fa-envelope" />
                            </div>
                            <span className="title">Email Address</span>
                            <p className="content mb-0">
                              {instituteEmail}
                            </p>
                            {/* <p className="content">hello@schoolname-long.com</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-main-wrapper">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="footer-logo-wrapper text-center">
                      <img src={logo} />
                      <div className="counter-wrapper">
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Total visits</span>
                          <span>5214578</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>New visits</span>
                          <span>546</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="footer-widget-wrapper">
                      <div className="widget-title">Pages</div>
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="nav">
                            <li>
                              <a href="#">প্রাতিষ্ঠানিক কাযকম</a>
                            </li>
                            <li>
                              <a href="#">ভর্তি তথ্য</a>
                            </li>
                            <li>
                              <a href="#">রেজাল্ট অনুসন্ধান</a>
                            </li>
                            <li>
                              <a href="#">স্কুল প্রশাসন</a>
                            </li>
                            <li>
                              <a href="#">স্কুল প্রশাসন</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="nav">
                            <li>
                              <a href="#">প্রাতিষ্ঠানিক কাযকম</a>
                            </li>
                            <li>
                              <a href="#">ভর্তি তথ্য</a>
                            </li>
                            <li>
                              <a href="#">রেজাল্ট অনুসন্ধান</a>
                            </li>
                            <li>
                              <a href="#">স্কুল প্রশাসন</a>
                            </li>
                            <li>
                              <a href="#">স্কুল প্রশাসন</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="footer-social">
                            <ul className="d-inline-flex justify-content-between align-items-center w-50 nav">
                              <li>
                                <a href="#">
                                  <i className="fab fa-facebook-f" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-twitter" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-youtube" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-linkedin-in" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="footer-widget-wrapper">
                      <div className="widget-title">Contact Us</div>
                      <div className="footer-contact-form">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name*"
                                onChange={(e) => { this.onChangeName(e) }}
                                value={this.props.className}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile Number*"
                                onChange={(e) => { this.onChangeMobile(e) }}
                                value={this.props.mobileNo}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                onChange={(e) => { this.onChangeEmail(e) }}
                                value={this.props.email}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea className="form-control" rows="5"
                                onChange={(e) => { this.onChangeMessage(e) }}
                                value={this.props.messageDetails}
                                placeholder='Message*'
                              />

                            </div>
                          </div>
                          <div className="col-md-12">
                            <button className="btn btn-primary"
                              onClick={this.props.submitContactDetails}
                            >
                              Send Now <i className="ml-2 fas fa-chevron-right" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copywrite-wrapper">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <dv className="col-md-12">
                    <div className="d-md-flex align-items-md-center justify-content-md-between">
                      <div className="copy-right-left">
                        <p>
                          &copy;{instituteName} 2020, Designed & Developed by
                          Netizen IT Ltd.
                      </p>
                      </div>
                      <div className="copy-right-menu">
                        <ul className="nav">
                          <li>
                            <a href="#">Disclaimer</a>
                          </li>
                          <li>
                            <a href="#">Privacy</a>
                          </li>
                          <li>
                            <a href="#">Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </dv>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  instituteUrlInfo: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  footer: makeSelectFooter(),
  instituteUrlInfo: makeSelectInstituteUrlInfo(),
  name: makeSelectName(),
  mobileNo: makeSelectMobileNo(),
  email: makeSelectEmail(),
  message: makeSelectMessageDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeName: (e) => { dispatch(setName(e)) },
    onChangeMobile: (e) => { dispatch(setMobile(e)) },
    onChangeEmail: (e) => { dispatch(setEmail(e)) },
    onChangeMessage: (e) => {
      console.log('msg e', e);

      dispatch(setMessage(e))
    },
    submitContactDetails: () => { dispatch(submitContact()) }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'footer', reducer });
const withSaga = injectSaga({ key: 'footer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Footer);
