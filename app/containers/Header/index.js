/**
 *
 * Header
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
import makeSelectHeader, { makeSelectAccessToken, makeSelectHeaderData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import logo from '../../assets/img/logo.png';

import { setErrorMessage } from './actions';
import { makeSelectInstituteUrlInfo } from './selectors';

import { makeSelectUrlInfo } from '../HomePage/selectors';
import { getUrlInfoLocally } from '../../utils/localStorageMethod';

import { getFullDayName, getFullMonthName } from '../../utils/dateFormat';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {

  render() {

    const date = new Date();

    // console.log('homePage Date', date.getDay(), date.getMonth(), date.getDate(), date.getFullYear());
    // console.log('homePage Date', getFullDayName(date.getDay()), getFullMonthName(date.getMonth()), date.getDate(), date.getFullYear());
    let fullDateInEng = getFullDayName(date.getDay()) + ', ' + getFullMonthName(date.getMonth()) + ', ' + date.getDate() + ', ' + date.getFullYear();
    // console.log('fullDateInEng', fullDateInEng);

    let instituteName = '';
    let instituteAddress = '';
    if (this.props.instituteUrlInfo) {
      instituteName = this.props.instituteUrlInfo.urlInfoDTO.instituteName;
      instituteAddress = this.props.instituteUrlInfo.urlInfoDTO.instituteAddress;
    }

    return (
      <header className="header-wrapper pt-4 pb-4">
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="d-md-inline-flex d-sm-block justify-content-md-center align-items-sm-center">
                  <div className="logo-wrapper">
                    <img src={logo} />
                  </div>
                  <div className="inst-title-wrapper">
                    <h1 className="ins-title">{instituteName}</h1>
                    <address>{instituteAddress}</address>
                    <span>Neti ID : {this.props.appHeaderData}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="social-wrapper">
                  <ul className="d-inline-flex justify-content-md-end w-100 pl-0">
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
                <div className="calender-wrapper-top d-md-inline-flex justify-content-md-center align-items-sm-center w-100">
                  <div className="calender-icon">
                    <i className="far fa-calendar-alt" />
                  </div>
                  <div className="calender-details">
                    <span>{fullDateInEng} (English)</span>
                    <span>26th Boishakh, 1427 (Bangla)</span>
                    <span className="d-inline-flex justify-content-center align-items-center">
                      <i className="fas fa-map-marker-alt pr-2" /> Bangladesh,
                      Time : 11:47 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  instituteUrlInfo: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
  appHeaderData: makeSelectHeaderData(),
  instituteUrlInfo: makeSelectInstituteUrlInfo(),
  accessToken: makeSelectAccessToken(),
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

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
