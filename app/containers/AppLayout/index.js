/**
 *
 * AppLayout
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
import makeSelectAppLayout from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { AppHeader } from './AppHeader';
import { Menu } from '../Menu';
import { AppFooter } from './AppFooter';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { makeSelectUrlInfo } from '../HomePage/selectors';

/* eslint-disable react/prefer-stateless-function */
export class AppLayout extends React.Component {
  render() {

    return (
      <div>
        <AppHeader />
        <Menu />
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

AppLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appLayout: makeSelectAppLayout(),
  urlInfoObjLayout: makeSelectUrlInfo()
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

const withReducer = injectReducer({ key: 'appLayout', reducer });
const withSaga = injectSaga({ key: 'appLayout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppLayout);
