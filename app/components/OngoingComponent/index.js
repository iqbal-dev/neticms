/**
 *
 * OngoingComponent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { AppLayout } from '../../containers/AppLayout';

/* eslint-disable react/prefer-stateless-function */
class OngoingComponent extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <AppLayout>
        <div>
          <h1 style={{ textAlign: 'center', padding: '50px' }}>Comming Soon...</h1>
        </div>
      </AppLayout>
    );
  }
}

OngoingComponent.propTypes = {};

export default OngoingComponent;
