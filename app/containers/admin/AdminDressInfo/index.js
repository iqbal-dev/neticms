/**
 *
 * AdminDressInfo
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
import makeSelectAdminDressInfo, { makeSelectDressInfoListData, makeSelectModalVisibleStatus, makeSelectClassRange, makeSelectDressCodeDetails, makeSelectDressCodeImage, makeSelectSerialNo, makeSelectGender } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Button,
  Grid,
  Paper,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  TextareaAutosize
} from '@material-ui/core';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { AdminPrivateLayout } from '../AdminPrivateLayout';
import { setModalVisibleStatus, setDressCodeInfo, resetFormData, setUpdateDressCodeInfo, setSerialNo, setSelectedGenderValue, setClassRange, setDressCodeDetails, setDressCodeImage } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class AdminDressInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogFormType: true,
      addDialogVisibility: false,
      updateDialogVisibility: false,

      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10
    }
  }

  setOpen = value => {
    this.setState({ addDialogVisibility: value })
  }

  setUpdateDialogOpen = value => {
    this.setState({ updateDialogVisibility: value })
  }


  setPage = page => {
    this.setState({ page: page })
  }

  setRowsPerPage = rowsPerPage => {
    this.setState({ rowsPerPage: rowsPerPage })
  }

  updateDialogClickOpen = (e, rowData, dialogType) => {
    if (dialogType === 'update') {
      this.props.onChangeModalVisibleStatus();
      // this.props.onSelectDatatableRowdata(rowData);
      this.setState({ dialogFormType: false });
    } else if (dialogType === 'insert') {
      this.props.resetFormData();
      this.props.onChangeModalVisibleStatus();
      this.setState({ dialogFormType: true });

    }


  };
  render() {
    let { page, rowsPerPage } = this.state
    let { dressInfoList } = this.props
    console.log('this.state.dialogFormType', this.state.dialogFormType);

    function createData(serial, className, group, totalSeat, action) {
      return { serial, className, group, totalSeat, action };
    }

    const handleClickOpen = () => {
      this.props.resetFormData();
      this.setOpen(true);
    };

    const handleClose = () => {
      this.setOpen(false);
    };



    const updateDialogClose = () => {
      this.setUpdateDialogOpen(false);
    };

    const handleChangePage = (event, newPage) => {
      this.setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

      this.setRowsPerPage(+event.target.value);
      this.setPage(0);
    };
    return (

      <AdminPrivateLayout>
        <Container maxWidth="xl" className="my-0 p-0">
          <Helmet>
            <title>AdminFeesInfo</title>
            <meta name="description" content="Description of AdminFeesInfo" />
          </Helmet>

          <Grid container spacing={3}>

            <Grid item xs={12}>
              <Box className="">
                <Grid item xs={12} className="px-3 py-2">

                  <TableContainer component={Paper}>
                    <Box
                      className=""
                      variant="h6"
                      id="tableTitle"
                      component="div"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      style={{ backgroundColor: '#cfe8fc' }}
                    >
                      <Typography
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        className='px-3'
                      >
                        Dress Code Info
                    </Typography>

                      <Typography
                        variant="p"
                        component="div"
                      >
                        Total Found: {dressInfoList && dressInfoList.length || 0}
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="rounded-0 shadow-none bg-success ml-3"
                          startIcon={<AddIcon />}
                          onClick={e => this.updateDialogClickOpen(e, null, 'insert')}
                        >
                          Add New
                      </Button>
                      </Typography>

                    </Box>
                    <Table
                      aria-labelledby="tableTitle"
                      size='medium'
                      aria-label="enhanced table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Serial No.</TableCell>
                          <TableCell>Dress Info</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {dressInfoList && dressInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, key) =>
                          <TableRow key={key}>
                            <TableCell>{item.dressSerial}</TableCell>
                            <TableCell>{item.dressImageName}</TableCell>
                            <TableCell align="center">
                              <IconButton aria-label="edit" color="primary" onClick={e => this.updateDialogClickOpen(e, item, 'update')}>
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete" color="secondary">
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                        }
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[2, 10, 25, 100]}
                      component="div"
                      count={dressInfoList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableContainer>

                </Grid>
              </Box>
            </Grid>
          </Grid>

         

          <Box>
            <Dialog
              onClose={this.props.onChangeModalVisibleStatus}
              aria-labelledby="customized-dialog-title"
              open={this.props.modalVisible}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={this.props.onChangeModalVisibleStatus}>
                {this.state.dialogFormType === true ? 'Add' : 'Update'} Dress Info
            </DialogTitle>
              <DialogContent dividers>

                <Grid item xs={12} style={{ minWidth: '400px' }}>
                  <Box className="">
                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Serial No."
                        variant="outlined"
                        helperText=""
                        fullWidth
                        required
                        value={this.props.dressSerial}
                        onChange={this.props.onChangeSerialNo}
                      />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl variant="outlined" className="" fullWidth required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          label="Gender"
                          value={this.props.gender}
                          onChange={this.props.onChangeGender}
                        >
                          <MenuItem value='Male'>Male</MenuItem>
                          <MenuItem value='Female'>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Class"
                        variant="outlined"
                        helperText=""
                        placeholder="enter class range"
                        fullWidth
                        required
                        value={this.props.classRange}
                        onChange={this.props.onChangeClassRange}
                      />
                    </Grid>

            
                    <Grid item xs={12} className="px-3 py-2">
                      <TextareaAutosize
                        style={{ width: '364px' }}
                        aria-label="Details"
                        rowsMin={3}
                        variant="outlined"
                        value={this.props.dressDetails}
                        onChange={this.props.onChangeDressCodeDetails}
                        placeholder="enter dress code details" />
                    </Grid>
                 

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Amount"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        value={this.props.dressImageName}
                        onChange={this.props.onChangeDressCodeImage}
                        required
                      />
                    </Grid>


              

              

      

                  </Box>
                </Grid>

              </DialogContent>
              <DialogActions>
                {this.state.dialogFormType === true ?
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    mx="auto"
                    onClick={this.props.saveDressCodeInfo}
                  >
                    Save
            </Button>
                  : ''}


                {this.state.dialogFormType === false ?
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    mx="auto"
                    onClick={this.props.updateDressCodeInfo}
                  >
                    Update
              </Button>
                  : ''}
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </AdminPrivateLayout>
    );
  }
}

AdminDressInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminDressInfo: makeSelectAdminDressInfo(),
  dressInfoList: makeSelectDressInfoListData(),
  modalVisible: makeSelectModalVisibleStatus(),

  classRange: makeSelectClassRange(),
  dressDetails: makeSelectDressCodeDetails(),
  dressImageName: makeSelectDressCodeImage(),
  dressSerial: makeSelectSerialNo(),
  gender: makeSelectGender(),




});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeModalVisibleStatus: () => { dispatch(setModalVisibleStatus('modalVisible')) },

    onChangeSerialNo: (evt) => { dispatch(setSerialNo(evt.target.value)) },
    onChangeGender: (evt) => { dispatch(setSelectedGenderValue(evt.target.value)) },
    onChangeClassRange: (evt) => { dispatch(setClassRange(evt.target.value)) },
    onChangeDressCodeDetails: (evt) => { dispatch(setDressCodeDetails(evt.target.value)) },
    onChangeDressCodeImage: (evt) => { dispatch(setDressCodeImage(evt.target.value)) },




    saveDressCodeInfo: () => { dispatch(setDressCodeInfo()) },
    resetFormData: () => { dispatch(resetFormData()) },
    updateDressCodeInfo: () => { dispatch(setUpdateDressCodeInfo()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminDressInfo', reducer });
const withSaga = injectSaga({ key: 'adminDressInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminDressInfo);
