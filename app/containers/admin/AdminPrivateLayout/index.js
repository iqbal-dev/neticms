/**
 *
 * AdminPrivateLayout
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
import makeSelectAdminPrivateLayout from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AdminHeader } from '../AdminHeader';

/* eslint-disable react/prefer-stateless-function */
export class AdminPrivateLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AdminPrivateLayout</title>
          <meta
            name="description"
            content="Description of AdminPrivateLayout"
          />
        </Helmet>
        <AdminHeader />
      </div>
    );
  }
}

AdminPrivateLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminPrivateLayout: makeSelectAdminPrivateLayout(),
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

const withReducer = injectReducer({ key: 'adminPrivateLayout', reducer });
const withSaga = injectSaga({ key: 'adminPrivateLayout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminPrivateLayout);
