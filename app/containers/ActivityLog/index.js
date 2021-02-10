/**
 *
 * ActivityLog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ActivityLog extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ActivityLog</title>
          <meta name="description" content="Description of ActivityLog" />
        </Helmet>
      </div>
    );
  }
}

ActivityLog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'activityLog', saga });

export default compose(
  withSaga,
  withConnect,
)(ActivityLog);
