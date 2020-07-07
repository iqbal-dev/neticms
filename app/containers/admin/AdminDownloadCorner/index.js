/**
 *
 * AdminDownloadCorner
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
import makeSelectAdminDownloadCorner from './selectors';
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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

/* eslint-disable react/prefer-stateless-function */
export class AdminDownloadCorner extends React.Component {
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
          { dialogType == 'insert' ? 'Add New Download Corner Info' : 'Update Download Corner Info'}
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
                <TextField
                  label="Title"
                  variant="outlined"
                  helperText=""
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <input
                  accept="image/*"
                  // className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: "none"}}
                />
                <label htmlFor="contained-button-file" style={{ width: "100%"}}>
                  <Button
                    variant="outlined"
                    color="default"
                    // className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    size="large"
                    component="span"
                    fullWidth
                  >
                    Upload
                  </Button>
                </label>

                
              </Grid>

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
          Delete Download Corner Info 
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

    function createData(serial, title, download, action) {
      return { serial, title, download, action };
    }

    const dataTableValue = [
      createData(1, "One"),
      createData(2, "Two"),
      createData(3, "Eight"),
      createData(4, "Nine"),
      createData(5, "Ten"),
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
      <Container maxWidth="xl" className="my-3">
        <Helmet>
          <title>AdminDownloadCorner</title>
          <meta
            name="description"
            content="Description of AdminDownloadCorner"
          />
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
                      Download Corner List 
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
                        <TableCell>Title</TableCell>
                        <TableCell>Download</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                    {dataTableValue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => 
                      <TableRow key="">
                        <TableCell>{ item.serial }</TableCell>
                        <TableCell>{ item.title }</TableCell>
                        <TableCell>
                          <IconButton aria-label="download" color="primary">
                            <CloudDownloadIcon />
                          </IconButton>
                        </TableCell>
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
          { this.formDialog }
        </Box>
          
        <Box>
          { this.deleteDialog}
        </Box>

      </Container>
    );
  }
}

AdminDownloadCorner.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminDownloadCorner: makeSelectAdminDownloadCorner(),
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

const withReducer = injectReducer({ key: 'adminDownloadCorner', reducer });
const withSaga = injectSaga({ key: 'adminDownloadCorner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminDownloadCorner);
