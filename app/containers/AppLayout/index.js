/**
 *
 * AppLayout
 *
 */

import React from 'react';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppLayout from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import AboutUs from 'containers/AboutUs';

export default function AppLayout(match) {

  let instituteHostNm = window.location.pathname.slice(1).toString();
  let aboutRouteNm = '/' + instituteHostNm + '/about'.toString();
  // console.log('aboutRoute', match);

  return (
    <Route
      path="/about/nhmsc"
      render={({ match }) => {
        
        component={AboutUs}
      }}
    />
  );

}
