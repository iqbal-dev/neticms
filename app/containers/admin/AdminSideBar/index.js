/**
 *
 * AdminSideBar
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
import makeSelectAdminSideBar from './selectors';
import reducer from './reducer';
import saga from './saga';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
export class AdminSideBar extends React.PureComponent {

  render() {
    const container = window !== undefined ? () => window().document.body : undefined;
    let iconArray = ['<ImageOutlinedIcon />']
    const drawer = (
      <div>
        <Typography variant="h6" noWrap className="logo-wrapper">
            Neti CMS
        </Typography>
        <Divider />
        <List>
          {['Gallery Image', 'Spech Info', 'Notice', 'Events', 'Important Link', 'Administration Info', ' About Us', ' Dress Info', ' Fees Info', 'Seat Info', 'Syllabus', 'Download Corner'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <nav className="adminSideBar-wrapper" aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open=""
            onClose=""
          >
            {drawer}
            
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

AdminSideBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminSideBar: makeSelectAdminSideBar(),
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

const withReducer = injectReducer({ key: 'adminSideBar', reducer });
const withSaga = injectSaga({ key: 'adminSideBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminSideBar);
