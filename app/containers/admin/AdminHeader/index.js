/**
 *
 * AdminHeader
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
import makeSelectAdminHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/**material import start**/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/* eslint-disable react/prefer-stateless-function */
export class AdminHeader extends React.PureComponent {
  render() {

    return (
      <AppBar position="fixed" className="appTopBarWrapper">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Logout"
            edge="start"
            onClick={this.props.logout}
            className=""
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

AdminHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminHeader: makeSelectAdminHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // logout: () => dispatch(set()),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminHeader', reducer });
const withSaga = injectSaga({ key: 'adminHeader', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminHeader);
