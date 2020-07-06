/**
 *
 * AdminSeatInfo
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
import makeSelectAdminSeatInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button } from '@material-ui/core';

// import Button from '@material-ui/core/Button';
// import { Button } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
export class AdminSeatInfo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AdminSeatInfo</title>
          <meta name="description" content="Description of AdminSeatInfo" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    );
  }
}

AdminSeatInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminSeatInfo: makeSelectAdminSeatInfo(),
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

const withReducer = injectReducer({ key: 'adminSeatInfo', reducer });
const withSaga = injectSaga({ key: 'adminSeatInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminSeatInfo);
