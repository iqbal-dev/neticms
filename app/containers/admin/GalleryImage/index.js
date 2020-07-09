/**
 *
 * GalleryImage
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
import Button from '@material-ui/core/Button';
import makeSelectGalleryImage, { makeSelectModalStatus } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AdminPrivateLayout } from '../AdminPrivateLayout';
import { Container, Grid, Box, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText } from '@material-ui/core';
import ProgressBar from '../../../components/admin/ProgressBar';

/**Card**/
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { setModalStatus } from './actions';

let modalHeader = '';
/* eslint-disable react/prefer-stateless-function */
export class GalleryImage extends React.PureComponent {

  constructor(){
    super();
    this.onChangemodal = this.onChangemodal.bind(this);
  }

  onChangemodal (value) {
    modalHeader = value;
    this.props.onChangemodalVisiable;
  }

  render() {
    
    return (
      <AdminPrivateLayout>
        <Container maxWidth="xl" className="my-0 p-0">
          <Helmet>
            <title>GalleryImage</title>
            <meta name="description" content="Description of GalleryImage" />
          </Helmet>
          <ProgressBar value="50" />
          <Grid container spacing={3} className="px-3 py-3">
            <Grid item xs={3}>
              <Box className="">
                <Card className="">
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Home Slider"
                  />
                  <CardContent>
                    <Tooltip title="Add" aria-label="add">
                      <Fab color="primary" className=""  onClick={this.onChangemodal('Home Slider')}>
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                    <List component="nav">
                      <ListItem>
                        <ListItemText>Image Shape : 370 x 240</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>Image Size : 400 KB</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>Image Type : JPEG, PNG</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>Max : 5 Image</ListItemText>
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions>
                    <List component="nav">
                      <ListItem>
                        <ListItemText>Image Found : 3</ListItemText>
                      </ListItem>
                    </List>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Dialog open={this.props.modalStatus} onClose="" aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">{modalHeader}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onChangemodalVisiable} color="primary">
              Cancel
          </Button>
            <Button onClick="" color="primary">
              Subscribe
          </Button>
          </DialogActions>
        </Dialog>
      </AdminPrivateLayout>
    );
  }
}

GalleryImage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalStatus: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  galleryImage: makeSelectGalleryImage(),
  modalStatus: makeSelectModalStatus()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangemodalVisiable: () =>  dispatch(setModalStatus()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'galleryImage', reducer });
const withSaga = injectSaga({ key: 'galleryImage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GalleryImage);
