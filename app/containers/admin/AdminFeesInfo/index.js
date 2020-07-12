/**
 *
 * AdminFeesInfo
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
import makeSelectAdminFeesInfo, {
  makeSelectFeesInfoListData, makeSelectClassInfoListData, makeSelectGroupInfoListData, makeSelectModalVisibleStatus,
  makeSelectSerialNo, makeSelectClass, makeSelectGroup, makeSelectFeeDetails, makeSelectFeeName,
  makeSelectFeeAmount, makeSelectPaymentMode, makeSelectFeeType
} from './selectors';
import reducer from './reducer';
import {
  setSerialNo, setSelectedClassValue, setSelectedGroupValue, setFeeName, setFeeDetails, setFeeAmount, setFeeType, resetFormData, setUpdateFeeInfo,
  setFeeInfo, setDatatableRowdata, setFeePaymentMode, setModalVisibleStatus
} from './actions';

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

/* eslint-disable react/prefer-stateless-function */
export class AdminFeesInfo extends React.Component {
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
    console.log("rowData", rowData);
    console.log("dialogType", dialogType);
    if (dialogType === 'update') {
      this.props.onChangeModalVisibleStatus();
      this.props.onSelectDatatableRowdata(rowData);
      this.setState({ dialogFormType: false });
    } else if (dialogType === 'insert') {
      this.props.resetFormData();
      this.props.onChangeModalVisibleStatus();
      this.setState({ dialogFormType: true });

    }


  };

  render() {
    let { page, rowsPerPage } = this.state
    let { feesInfoList } = this.props
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
      // console.log(event.target.value);

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
          {/* <FormattedMessage {...messages.header} /> */}

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
                        Fees Info
                    </Typography>

                      <Typography
                        variant="p"
                        component="div"
                      >
                        Total Found: {feesInfoList && feesInfoList.length || 0}
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="rounded-0 shadow-none bg-success ml-3"
                          startIcon={<AddIcon />}
                          // onClick={handleClickOpen}
                          onClick={e => this.updateDialogClickOpen(e, null, 'insert')}
                        >
                          Add New
                      </Button>
                      </Typography>

                    </Box>
                    <Table
                      // className={classes.table}
                      aria-labelledby="tableTitle"
                      size='medium'
                      aria-label="enhanced table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Serial No.</TableCell>
                          <TableCell>Class</TableCell>
                          <TableCell>Group</TableCell>
                          <TableCell>Fee Name</TableCell>
                          <TableCell >Fee Amount</TableCell>
                          <TableCell>Fee Type</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {feesInfoList && feesInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, key) =>
                          <TableRow key={key}>
                            <TableCell>{item.feeSerial}</TableCell>
                            <TableCell>{item.className}</TableCell>
                            <TableCell>{item.groupName}</TableCell>
                            <TableCell>{item.feeName}</TableCell>
                            <TableCell>{item.feeAmount}</TableCell>
                            <TableCell>{item.feeType}</TableCell>
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
                      count={feesInfoList.length}
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
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={this.state.addDialogVisibility}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleClose}>
                Add Fees Info
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
                        value={this.props.serialNo}
                        onChange={this.props.onChangeSerialNo}
                      />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl variant="outlined" className="" fullWidth required>
                        <InputLabel>Class</InputLabel>
                        <Select
                          label="Class"
                          value={this.props.selectedClass ? this.props.selectedClass : ''}
                          onChange={this.props.onChangeClass}
                        >
                          {this.props.classList && this.props.classList.map((option) => (
                            <MenuItem key={option.classId} value={option.classId}>
                              {option.className}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl required variant="outlined" className="" fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Group</InputLabel>
                        <Select
                          label="Group"
                          value={this.props.selectedGroup ? this.props.selectedGroup : ''}
                          onChange={this.props.onChangeGroup}
                        >
                          {this.props.groupList && this.props.groupList.map((option) => (
                            <MenuItem key={option.groupId} value={option.groupId}>
                              {option.groupName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Name"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        required
                        value={this.props.feeName}
                        onChange={this.props.onChangeFeeName}
                      />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextareaAutosize
                        style={{ width: '364px' }}
                        aria-label="Details"
                        rowsMin={3}
                        variant="outlined"
                        value={this.props.feeDetails}
                        onChange={this.props.onChangeFeeDetails}
                        placeholder="Enter Fee Details" />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Amount"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        value={this.props.feeAmount}
                        onChange={this.props.onChangeFeeAmount}
                        required
                      />
                    </Grid>


                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl required variant="outlined" className="" fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Fee Type</InputLabel>
                        <Select
                          label="Fee Type"
                          value={this.props.feeType}
                          onChange={this.props.onChangeFeeType}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value='Yearly'>Yearly</MenuItem>
                          <MenuItem value='Monthly'>Monthly</MenuItem>
                          <MenuItem value='Exam'>Exam</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Payment Mode"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        value={this.props.paymentMode}
                        onChange={this.props.onChangeFeePaymentMode}
                        required
                      />
                    </Grid>

                    {/* <Box
                    item
                    xs={12}
                    className="px-3 py-2"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      mx="auto"
                    >
                      Primary
                    </Button>
                  </Box> */}

                  </Box>
                </Grid>

              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  mx="auto"
                  onClick={this.props.saveFeeInfo}
                >
                  Save
              </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box>
            <Dialog
              onClose={this.props.onChangeModalVisibleStatus}
              aria-labelledby="customized-dialog-title"
              open={this.props.modalVisible}
            >
              <DialogTitle
                id="customized-dialog-title"
                onClose={this.props.onChangeModalVisibleStatus}>
                {this.state.dialogFormType === true ? 'Add' : 'Update'} Fees Info
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
                        value={this.props.serialNo}
                        onChange={this.props.onChangeSerialNo}
                      />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl variant="outlined" className="" fullWidth required>
                        <InputLabel>Class</InputLabel>
                        <Select
                          label="Class"
                          value={this.props.selectedClass ? this.props.selectedClass : ''}
                          onChange={this.props.onChangeClass}
                        >
                          {this.props.classList && this.props.classList.map((option) => (
                            <MenuItem key={option.classId} value={option.classId}>
                              {option.className}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl required variant="outlined" className="" fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Group</InputLabel>
                        <Select
                          label="Group"
                          value={this.props.selectedGroup ? this.props.selectedGroup : ''}
                          onChange={this.props.onChangeGroup}
                        >
                          {this.props.groupList && this.props.groupList.map((option) => (
                            <MenuItem key={option.groupId} value={option.groupId}>
                              {option.groupName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Name"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        required
                        value={this.props.feeName}
                        onChange={this.props.onChangeFeeName}
                      />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextareaAutosize
                        style={{ width: '364px' }}
                        aria-label="Details"
                        rowsMin={3}
                        variant="outlined"
                        value={this.props.feeDetails}
                        onChange={this.props.onChangeFeeDetails}
                        placeholder="Enter Fee Details" />
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Amount"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        value={this.props.feeAmount}
                        onChange={this.props.onChangeFeeAmount}
                        required
                      />
                    </Grid>


                    <Grid item xs={12} className="px-3 py-2">
                      <FormControl required variant="outlined" className="" fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Fee Type</InputLabel>
                        <Select
                          label="Fee Type"
                          value={this.props.feeType}
                          onChange={this.props.onChangeFeeType}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value='Yearly'>Yearly</MenuItem>
                          <MenuItem value='Monthly'>Monthly</MenuItem>
                          <MenuItem value='Exam'>Exam</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} className="px-3 py-2">
                      <TextField
                        label="Fee Payment Mode"
                        variant="outlined"
                        helperText=""
                        fullWidth
                        value={this.props.paymentMode}
                        onChange={this.props.onChangeFeePaymentMode}
                        required
                      />
                    </Grid>

                    {/* <Box
                    item
                    xs={12}
                    className="px-3 py-2"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      mx="auto"
                    >
                      Primary
                    </Button>
                  </Box> */}

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
                    onClick={this.props.saveFeeInfo}
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
                    onClick={this.props.updateFeeInfo}
                  >
                    Update
              </Button>
                  : ''}
              </DialogActions>
            </Dialog>
          </Box>


          {/* <Button variant="contained" color="primary">
          Primary
        </Button> */}
        </Container>
      </AdminPrivateLayout>
    );
  }
}

AdminFeesInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalVisible: PropTypes.any,

};

const mapStateToProps = createStructuredSelector({
  adminFeesInfo: makeSelectAdminFeesInfo(),
  feesInfoList: makeSelectFeesInfoListData(),
  classList: makeSelectClassInfoListData(),
  groupList: makeSelectGroupInfoListData(),

  serialNo: makeSelectSerialNo(),
  selectedClass: makeSelectClass(),
  selectedGroup: makeSelectGroup(),
  feeDetails: makeSelectFeeDetails(),
  feeName: makeSelectFeeName(),
  feeAmount: makeSelectFeeAmount(),
  feeType: makeSelectFeeType(),
  paymentMode: makeSelectPaymentMode(),

  modalVisible: makeSelectModalVisibleStatus(),




});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSerialNo: (evt) => { dispatch(setSerialNo(evt.target.value)) },
    onChangeClass: (evt) => { dispatch(setSelectedClassValue(evt.target.value)) },
    onChangeGroup: (evt) => { dispatch(setSelectedGroupValue(evt.target.value)) },
    onChangeFeeName: (evt) => { dispatch(setFeeName(evt.target.value)) },
    onChangeFeeDetails: (evt) => { dispatch(setFeeDetails(evt.target.value)) },
    onChangeFeeAmount: (evt) => { dispatch(setFeeAmount(evt.target.value)) },
    onChangeFeeType: (evt) => { dispatch(setFeeType(evt.target.value)) },
    onChangeFeePaymentMode: (evt) => { dispatch(setFeePaymentMode(evt.target.value)) },
    onSelectDatatableRowdata: (evt) => {
      dispatch(setDatatableRowdata(evt))
    },


    onChangeModalVisibleStatus: () => { dispatch(setModalVisibleStatus('modalVisible')) },




    saveFeeInfo: () => { dispatch(setFeeInfo()) },
    resetFormData: () => { dispatch(resetFormData()) },
    updateFeeInfo: () => { dispatch(setUpdateFeeInfo()) },




  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminFeesInfo', reducer });
const withSaga = injectSaga({ key: 'adminFeesInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminFeesInfo);
