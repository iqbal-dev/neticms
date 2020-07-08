/**
*
* PrivateRoute
*
*/

import React from 'react';
// import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { getAuthenticatedStatus } from '../../utils/localStorageMethod';

function PrivateRoute({ component: Component, ...rest }) {

  console.log('called private route', getAuthenticatedStatus());

  return (<Route {...rest} render={(props) => (
    getAuthenticatedStatus() == 'true' ? <Component {...props} /> :
      <Redirect
        to={{
          pathname: "/admin/login",
          state: { from: props.location }
        }}
      />

  )} />);
}

PrivateRoute.propTypes = {

};

export default PrivateRoute;
