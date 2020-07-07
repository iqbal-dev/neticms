/**
 *
 * AdminSeatInfo
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
import makeSelectAdminSeatInfo from './selectors';
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
  TablePagination
} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { toUpper } from 'lodash';
import { AdminPrivateLayout } from '../AdminPrivateLayout';

// import Button from '@material-ui/core/Button';
// import { Button } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */



export class AdminSeatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addDialogVisibility: false,
      deleteDialogVisibility: false,
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10,
      dialogType: '', 
      rowData: []
    }
  }

  setOpen = (value, dialogType, rowData) =>{
    if(dialogType == 'delete'){
      this.setState({ deleteDialogVisibility: value, dialogType: dialogType, rowData: rowData })
    }
    else{
      this.setState({ addDialogVisibility: value, dialogType: dialogType, rowData: rowData })
    }
   
  }

  setPage = page =>{
    this.setState({ page: page })
  }

  setRowsPerPage = rowsPerPage =>{
    this.setState({ rowsPerPage: rowsPerPage })
  }

  handleClose = () => {
    this.setState({ addDialogVisibility: false, deleteDialogVisibility: false })
  };

  formDialog = () => {
    let {dialogType, rowData} = this.state
    console.log("----------", dialogType, rowData);
    
    return(
      <Dialog 
        onClose={this.handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={this.state.addDialogVisibility}
        // style={{ width: '800px'}}
        // maxWidth="xl"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          { dialogType == 'insert' ? 'Add New Seat Info' : 'Update Seat Info'}
        </DialogTitle>
        <DialogContent dividers>

          <Grid item xs={12} style={{minWidth: '400px'}}>
            <Box className="">
              <Grid item xs={12} className="px-3 py-2">
                <TextField
                  label="Serial No."
                  variant="outlined"
                  helperText=""
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <FormControl variant="outlined" className="" fullWidth required>
                  <InputLabel>Class</InputLabel>
                  <Select
                    label="Age"
                  // value={age}
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <FormControl required variant="outlined" className="" fullWidth>
                  <InputLabel id="demo-simple-select-required-label">Group</InputLabel>
                  <Select
                    label="Age"
                  // value={age}
                  // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <TextField
                  label="Total Seat"
                  variant="outlined"
                  helperText=""
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <TextField
                  label="Multiline"
                  variant="outlined"
                  // rowsMax={4}
                  // value={value}
                  // onChange={handleChange}
                  multiline
                  fullWidth
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
            color="secondary"
            size="large"
            mx="auto"
            onClick={this.handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            mx="auto"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  } 

  deleteDialog = () =>{
    let {dialogType, rowData} = this.state
    console.log("----------", dialogType, rowData);
    return(
      <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.deleteDialogVisibility}>
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          Delete Seat Info
            </DialogTitle>
        <DialogContent dividers>

          <Grid item xs={12}>
            <Box className="">
              { rowData && rowData.className + " " + rowData && rowData.group + " " + rowData && rowData.totalSeat  } Are you Sure?
            </Box>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            mx="auto"
            onClick={this.handleClose}
          >
            Cancel
              </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            mx="auto"
          >
            Save
              </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    let { page, rowsPerPage } = this.state

    function createData(serial, className, group, totalSeat, action) {
      return { serial, className, group, totalSeat, action };
    }

    const dataTableValue = [
      createData(1, "One", "n/a", 50 ),
      createData(2, "Two", "n/a", 50),
      createData(3, "Eight", "n/a", 40),
      createData(4, "Nine", "Science", 60),
      createData(5, "Ten", "Science", 70),
    ];

    const handleClickOpen = (dialogType, rowData) => {
      this.setOpen(true, dialogType, rowData);
    };

    // const handleClose = () => {
    //   this.setOpen(false);
    // };

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
            <title>AdminSeatInfo</title>
            <meta name="description" content="Description of AdminSeatInfo" />
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
                        Seat Info
                    </Typography>

                      <Typography
                        variant="p"
                        component="div"
                      >
                        Total Found: 5
                      <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="rounded-0 shadow-none bg-success ml-3"
                          startIcon={<AddIcon />}
                          onClick={e => handleClickOpen('insert', null)}
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
                          <TableCell align="right">Total Seat</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {dataTableValue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) =>
                          <TableRow key="">
                            <TableCell>{item.serial}</TableCell>
                            <TableCell>{item.className}</TableCell>
                            <TableCell>{item.group}</TableCell>
                            <TableCell align="right">{item.totalSeat}</TableCell>
                            <TableCell align="center">
                              <IconButton aria-label="edit" color="primary" onClick={e => handleClickOpen('update', item)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete" color="secondary" onClick={e => handleClickOpen('delete', item)}>
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
                      count={dataTableValue.length}
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
            {this.formDialog}
          </Box>

          <Box>
            {this.deleteDialog}
          </Box>

          {/* <Box>
          { this.formDialog('update', null) }
        </Box> */}

          {/* <Button variant="contained" color="primary">
          Primary
        </Button> */}
        </Container>
      </AdminPrivateLayout>
    );
  }
}

AdminSeatInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminSeatInfo: makeSelectAdminSeatInfo(),
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

const withReducer = injectReducer({ key: 'adminSeatInfo', reducer });
const withSaga = injectSaga({ key: 'adminSeatInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminSeatInfo);
