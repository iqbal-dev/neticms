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
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

/* eslint-disable react/prefer-stateless-function */
export class AdminHeader extends React.PureComponent {
  render() {

    return (
      <AppBar position="fixed" className="appTopBarWrapper">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick=""
            className=""
          >
            <MenuIcon />
          </IconButton>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick=""
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl=""
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open=""
                onClose=""
              >
                <MenuItem onClick="">Profile</MenuItem>
                <MenuItem onClick="">My account</MenuItem>
              </Menu>
            </div>
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
