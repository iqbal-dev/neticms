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
import { Link } from 'react-router-dom';
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
    const drawer = (
      <div>
        <Typography variant="h6" noWrap className="logo-wrapper">
          <Link to='/admin/homepage'>  Neti CMS </Link>
        </Typography>
        <Divider />
        <List>
          <Link to='/admin/gallery_image'>
            <ListItem button key="Gallery Image">
              <ListItemIcon><ImageOutlinedIcon /></ListItemIcon>
              <ListItemText primary="Gallery Image" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Spech Info">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Spech Info" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Events">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Important Link">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Important Link" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Administration Info">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Administration Info" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="About Us">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Dress Info">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Dress Info" />
            </ListItem>
          </Link>
          <Link to='/admin/fees_info'>
            <ListItem button key="Fees Info">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Fees Info" />
            </ListItem>
          </Link>
          <Link to='/admin/seat_info'>
            <ListItem button key="Seat Info">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Seat Info" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Syllabus">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Syllabus" />
            </ListItem>
          </Link>
          <Link to='#'>
            <ListItem button key="Download Corner">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Download Corner" />
            </ListItem>
          </Link>
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
