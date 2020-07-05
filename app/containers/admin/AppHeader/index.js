/**
 *
 * AppHeader
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
import makeSelectAppHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AppHeader extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AppHeader</title>
          <meta name="description" content="Description of AppHeader" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AppHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appHeader: makeSelectAppHeader(),
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

const withReducer = injectReducer({ key: 'appHeader', reducer });
const withSaga = injectSaga({ key: 'appHeader', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppHeader);
