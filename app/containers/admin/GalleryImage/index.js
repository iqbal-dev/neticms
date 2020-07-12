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
import makeSelectGalleryImage, { makeSelectModalStatus, makeSelectListModalStatus } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AdminPrivateLayout } from '../AdminPrivateLayout';
import { Container, Grid, Box, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText, InputLabel, Typography } from '@material-ui/core';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setModalStatus, setListModalStatus } from './actions';
import MUIRichTextEditor from "mui-rte";
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import demoImage from '../../../assets/img/demo-image.jpg'

let modalHeader = '';
/* eslint-disable react/prefer-stateless-function */
export class GalleryImage extends React.PureComponent {

  constructor() {
    super();
    this.onChangeModal = this.onChangeModal.bind(this);
    this.onChangeModal = this.onChangeModal.bind(this);
  }

  onChangeModal(value) {
    modalHeader = value;
    this.props.onChangeModalVisiableStatus();
  }

  onChangeListModal(value) {
    modalHeader = value;
    this.props.onChangeListModalVisiableStatus();
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
                      <Fab color="primary" className="" onClick={() => this.onChangeModal('Add Home Slider Image')}>
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
                        <ListItemText>Image Found : <span style={{ cursor: 'pointer' }} onClick={() => this.onChangeListModal('Home Slider')}><b>3</b></span></ListItemText>
                      </ListItem>
                    </List>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Dialog 
          open={this.props.modalStatus} 
          onClose="" 
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{modalHeader}</DialogTitle>
          <DialogContent dividers>
            <Grid item xs={12} className="px-3">
              <FormControl className="my-3" fullWidth required >
                <InputLabel id="select-serial-number-label">Serial Number</InputLabel>
                <Select
                  labelId="select-serial-number-label"
                  id="select-serial-number"
                  value=""
                  onChange=""
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ minWidth: '400px' }}>
              <Box className="">
                <Grid item xs={12} className="px-3">
                  <FormControl className="my-3" fullWidth required >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ minWidth: '400px' }}>
              <Box className="">
                <Grid item xs={12} className="px-3">
                  <FormControl className="my-3" fullWidth required >
                    <MUIRichTextEditor
                      label="Type something here..."
                      onSave=""
                      inlineToolbar={true}
                    />
                  </FormControl>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ minWidth: '400px', marginTop: '40px' }}>
              <Box className="">
                <Divider />
                <Grid item xs={12} className="px-3 my-3">
                  <input
                    accept="image/*"
                    className=""
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      Upload
                    </Button>
                  </label>
                </Grid>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.props.onChangeModalVisiableStatus}>Cancel</Button>
            <Button onClick="" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog 
          open={this.props.listModalStatus} 
          onClose="" 
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{modalHeader} Image List</DialogTitle>
          <DialogContent dividers>
            <Grid item xs={12} className="px-3">
              <TableContainer component={Paper}>
                <Table className="" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Serial  No.</TableCell>
                      <TableCell align="left">Image Info</TableCell>
                      <TableCell align="left">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">1</TableCell>
                      <TableCell align="left">
                        <img src={demoImage} height="100" width="100" />
                        <Typography variant="h6" component="h4">
                          Demo Image 1
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="edit" color="primary" onClick={() => this.onChangeModal('Update Home Slider Image')}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick="">
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">1</TableCell>
                      <TableCell align="left">
                        <img src={demoImage} height="100" width="100" />
                        <Typography variant="h6" component="h4">
                          Demo Image 1
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="edit" color="primary" onClick={() => this.onChangeModal('Update Home Slider Image')}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick="">
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.props.onChangeListModalVisiableStatus}>Cancel</Button>
            <Button onClick="" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        
      </AdminPrivateLayout>
    );
  }
}

GalleryImage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalStatus: PropTypes.any,
  listModalStatus: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  galleryImage: makeSelectGalleryImage(),
  modalStatus: makeSelectModalStatus(),
  listModalStatus: makeSelectListModalStatus()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeModalVisiableStatus: () => dispatch(setModalStatus()),
    onChangeListModalVisiableStatus: () => dispatch(setListModalStatus()),

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
