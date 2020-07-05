/**
 *
 * AppPrivateLayout
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
import makeSelectAppPrivateLayout from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AppPrivateLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AppPrivateLayout</title>
          <meta name="description" content="Description of AppPrivateLayout" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AppPrivateLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appPrivateLayout: makeSelectAppPrivateLayout(),
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

const withReducer = injectReducer({ key: 'appPrivateLayout', reducer });
const withSaga = injectSaga({ key: 'appPrivateLayout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppPrivateLayout);
