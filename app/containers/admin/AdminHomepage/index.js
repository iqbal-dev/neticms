/**
 *
 * AdminHomepage
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
import makeSelectAdminHomepage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AdminPrivateLayout } from '../AdminPrivateLayout';

/* eslint-disable react/prefer-stateless-function */
export class AdminHomepage extends React.Component {
  render() {
    return (
      <AdminPrivateLayout>
        <Helmet>
          <title>AdminHomepage</title>
          <meta name="description" content="Description of AdminHomepage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </AdminPrivateLayout>
    );
  }
}

AdminHomepage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminHomepage: makeSelectAdminHomepage(),
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

const withReducer = injectReducer({ key: 'adminHomepage', reducer });
const withSaga = injectSaga({ key: 'adminHomepage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminHomepage);
