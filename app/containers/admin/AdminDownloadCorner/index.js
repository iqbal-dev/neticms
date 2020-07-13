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
import makeSelectAdminDownloadCorner, { 
  makeSelectDownloadCornerList,
  makeSelectSerialValue,
  makeSelectShowDialog
} from './selectors';
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
import { AdminPrivateLayout } from '../AdminPrivateLayout';
import { 
  makeChangeSerialValue, 
  makeChangeTitleValue,
  makeSubmitFormData, 
  setUpdateRowData, 
  setDialogVisible, 
  setDialogHide 
} from './actions';

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
      rowData: [],
      file: {
        contentName: '',
        extention: '',
        contentFile: '',
        contentFull: '',
      }
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

  // uploadFile = (e) => {
  //   console.log("upload FILE:::::", e);
  //   const data = new FormData();
  //   // data.append("file", file);
  //   // return data;
  // }

  uploadFile = (e) => {
    let file = e.target.files[0];
    console.log("UPLOAD FILE", file);

    var reader = new FileReader();
    const scope = this
    reader.readAsDataURL(file);
    reader.onload = function () {
      let content = reader.result;
      var keyw = 'data:' + file.type + ';base64,'; //link will be same from the word webapps in URL
      var urlStr = content.substring(content.indexOf(keyw) + keyw.length);
      let album = {
        contentName: file.name,
        extention: file.type,
        contentFile: urlStr,
        contentFull: content,
      };
      scope.setState({ file: album})
      console.log("ALBUM", album);
    }
  }


  formDialog = () => {
    let {dialogType, rowData} = this.state
    // console.log("----------", dialogType, rowData);
    let { showDialog, submitFormData } = this.props
    // console.log("----------", dialogType, rowData);

    let addDialogVisibility = false;
    let updateDialogVisibility = false;
    let deleteDialogVisibility = false;

    if(showDialog && showDialog.dialogTypeAndVisible == 'insert'){
      addDialogVisibility = showDialog.visibility
    }
    else if(showDialog && showDialog.dialogTypeAndVisible == 'update'){
      updateDialogVisibility = showDialog.visibility
    }
    else if(showDialog && showDialog.dialogTypeAndVisible == 'delete'){
      deleteDialogVisibility = showDialog.visibility
    }
    
    return(
      <Dialog 
        onClose={ this.props.hideAddAndUpdateDialog } 
        aria-labelledby="customized-dialog-title" 
        open={ addDialogVisibility || updateDialogVisibility}
        // style={{ width: '800px'}}
        // maxWidth="xl"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.props.hideAddAndUpdateDialog }>
          { showDialog && showDialog.dialogTypeAndVisible == 'insert' ? 'Add New Seat Info' : 'Update Seat Info'}
        </DialogTitle>
        <DialogContent dividers>

          <Grid item xs={12} style={{minWidth: '400px'}}>
            <Box className="">
              <Grid item xs={12} className="px-3 py-2">
                <TextField
                  id="serialNoId"
                  label="Serial No."
                  variant="outlined"
                  helperText=""
                  fullWidth
                  required
                  value={this.props.serialValue}
                  onChange={this.props.onChangeSerialValue}
                />
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <TextField
                  label="Title"
                  variant="outlined"
                  helperText=""
                  fullWidth
                  required
                  value={this.props.titleValue}
                  onChange={this.props.onChangeTitleValue}
                />
              </Grid>

              <Grid item xs={12} className="px-3 py-2">
                <input
                  accept="image/*, .pdf, .xls, .xlsx, .doc, .docx"
                  // className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: "none"}}
                  onChange={this.uploadFile}
                />
                <label htmlFor="contained-button-file" style={{ width: "100%"}}>
                  <Button
                    variant="outlined"
                    color="default"
                    className="flex "
                    startIcon={<CloudUploadIcon />}
                    size="large"
                    component="span"
                    fullWidth
                  >
                    Upload 
                  </Button>
                </label>
                <center><img src={ this.state.file.contentFull} style={{ maxHeight: "100px" }}/></center>
                <p>{ this.state.file.contentName }</p>
              </Grid>

              {/* <Grid item xs={12} className="px-3 py-2">
                <img src={ this.state.file.contentFull} height="120px"/>
              </Grid> */}

            </Box>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            mx="auto"
            onClick={this.props.hideAddAndUpdateDialog}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            mx="auto"
            onClick={ e => submitFormData(showDialog && showDialog.dialogTypeAndVisible) }
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

    console.log("PROPS ----------", this.props.downloadCornerList);

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
      <AdminPrivateLayout>
        <Container maxWidth="xl" className="my-0 p-0">
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
                          onClick={e => this.props.visibleDialog('insert', null)}
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
                            <IconButton 
                              aria-label="edit" 
                              color="primary" 
                              onClick={e => this.props.visibleDialog('update', item)}
                            >
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
      </AdminPrivateLayout>
    );
  }
}

AdminDownloadCorner.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminDownloadCorner: makeSelectAdminDownloadCorner(),

  downloadCornerList: makeSelectDownloadCornerList(), 

  serialValue: makeSelectSerialValue(),

  showDialog: makeSelectShowDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSerialValue: (evt) => { dispatch(makeChangeSerialValue(evt.target.value)) },
    onChangeTitleValue: (evt) => { dispatch(makeChangeTitleValue(evt.target.value)) },

    submitFormData: (param) => { dispatch(makeSubmitFormData(param)) /*console.log(param)*/ },

    visibleDialog: ( dialogType, row ) => {
      // dispatch(resetDialogValue());
      dispatch(setUpdateRowData(row));
      // dispatch(setRowDataToUpdateDialog());
      dispatch(setDialogVisible(dialogType));
    },
    hideAddAndUpdateDialog: () => {
      dispatch(setDialogHide());
    },

  //   uploadFile : (e) =>{
  //     let photo = e.target.files[0];
  //     console.log("UPLOAD FILE", photo);

  //     var reader = new FileReader();
  //     const scope = this
  //     reader.readAsDataURL(photo);
  //     reader.onload = function () {
  //       let content = reader.result;
  //       var keyw = 'data:' + photo.type + ';base64,'; //link will be same from the word webapps in URL
  //       var urlStr = content.substring(content.indexOf(keyw) + keyw.length);
  //       let album = {
  //           extention: photo.type,
  //           contentPic: urlStr,
  //           contentName: photo.name
  //       };
  //       console.log("ALBUM", album);
  //   }
      
  //   }
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
