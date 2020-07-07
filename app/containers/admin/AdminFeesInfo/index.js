/**
 *
 * AdminFeesInfo
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
import makeSelectAdminFeesInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AdminFeesInfo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AdminFeesInfo</title>
          <meta name="description" content="Description of AdminFeesInfo" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AdminFeesInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminFeesInfo: makeSelectAdminFeesInfo(),
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

const withReducer = injectReducer({ key: 'adminFeesInfo', reducer });
const withSaga = injectSaga({ key: 'adminFeesInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminFeesInfo);
