/**
 *
 * ApplicationForm
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
import makeSelectApplicationForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { CustomInput, FormGroup, Input, Label, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import staticImg from '../../../assets/img/demo-image.jpg';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageFirst: true,
      pageSecond: false,
      pageThird: false,
      examInfoDialogVisible: false,
      errors: {},
    }
  }

  showNextPage = () =>{
    if( !this.state.pageThird){
      this.setState({ pageFirst: false, pageSecond: true, pageThird: false });
    }

    if( !this.state.pageFirst && this.state.pageSecond){
      this.setState({ pageFirst: false, pageSecond: false, pageThird: true });
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  showPreviousPage = () =>{
    this.setState({ pageFirst: true, pageSecond: false, pageThird: false });
  }
  

  render() {

    const examInfoDialog = () => {
      this.setState({ examInfoDialogVisible: !this.state.examInfoDialogVisible });
    };
    return (
      <div class="admisia">
        <AppLayout>
          <Helmet>
            <title>ApplicationForm</title>
            <meta name="description" content="Description of ApplicationForm" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Online Admission"
            menuStepFirst="Online Admission"
            menuStepSenond="Application Form"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">
                <div className="row m-0 text-center bg-smoke-white section-top-page">
                  <div className="col-xl-4 py-5 text-center one active">
                    <div className='page'>1</div>
                    <div>Information</div>
                  </div>
                  <div className={ this.state.pageSecond || this.state.pageThird? "col-xl-4 py-5 two active" : "col-xl-4 py-5 two " } >
                    <div className='page'>2</div>
                    <div>Review</div>
                  </div>
                  <div className={ this.state.pageThird? "col-xl-4 py-5 three active" : "col-xl-4 py-5 three " }>
                    <div className='page'>3</div>
                    <div>Completed</div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Academic Year: 2020</th>
                            <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>CLASS & GROUP <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4"></div>
                                  <div className="col-xl-4 text-right my-auto text-primary">
                                    <small>Application Fee -</small> 135 TK (BDT)
                                  </div>


                                </div>
                              </td>
                            </tr>

                          : this.state.pageSecond || this.state.pageThird ?

                            <tr>
                              <td>
                                <div className="row">
                                  <div class="col-xl-12">
                                    <div class=" student-details-info">
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Class</label>: Nine</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Group</label>: Science</div>
                                      { this.state.pageThird ? 
                                        <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Roll No.</label>: 321</div>
                                        :null
                                      }
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="row">
                                  <div class="col-xl-12">
                                    <div class="student-details-info ml-auto">
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Academic Year</label>: Name</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application End Date</label>: 31 Oct, 2020</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: 135 TK</div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            : null

                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="my-3">    {/*page-inner-title*/}
                      <h2 className="d-flex justify-content-center">
                        <span className="text-orange "> Application Form </span>
                      </h2>
                      {/* <div className="custom-title-border-left"></div> */}
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th colSpan="3">Personal Information</th>
                            {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>STUDENT NAME <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Add Name"
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className=" text-orange"><small>GENDER <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                      >
                                        <option hidden value="">Select Gender</option>
                                        <option value="">Male</option>
                                      </Input>
                                    </FormGroup>
                                  </div>
                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className=" text-orange"><small>RELIGION <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                      >
                                        <option hidden value="">Select Religion</option>
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-datepicker">
                                      <Label for="class-group" className=" text-orange"><small>DATE OF BIRTH <span className="required">*</span></small></Label>
                                      <DatePicker
                                        placeholderText='Select Date'
                                        dateFormat="dd/MM/yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        isClearable
                                        fixedHeight
                                        // maxDate={this.props.attendanceToDate}
                                        // selected={this.props.date}
                                        // onChange={(e) => this.onChangeDate(e, 'date')}
                                        className="dayPicker-custom-input bg-white border-0 rounded-0"
                                        name='date'
                                      />
                                      {/* <span className='error-message'>{errors['date']}</span> */}
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>BIRTH REG. NO. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Birth reg. no."
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className=" text-orange"><small>QUOTA <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select Your Quota"
                                      >
                                        <option hidden value="">Select Your Quota</option>
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 text-primary">
                                    <FormGroup className="custom-upload">
                                      <Label for="class-group" className=" text-orange"><small>PHOTO <span className="required">*</span></small></Label>
                                      <CustomInput
                                        label="Choose a photo"
                                        className=" bg-white border-0 rounded-0"
                                        type="file"
                                        id="exampleCustomFileBrowser"
                                        name="customFile"
                                      />
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>GUARDIAN MOBILE NO. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mobile no."
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4 d-flex align-items-center">
                                    <small className="text-orange">
                                      ***This number will be needed from further <br />
                                      communication.So, Please input a valid contact no.***
                                    </small>
                                  </div>

                                  <div className="col-xl-8">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>Address <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="textarea"
                                        name="class-group"
                                        placeholder="Enter Address"
                                        style={{ height: "150px" }}
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>


                                </div>
                              </td>
                              {/* <td>Test</td> */}
                            </tr>

                          : this.state.pageSecond || this.state.pageThird ?

                            <tr>
                              <td style={{ width: "232px"}} className="p-4"><img src={staticImg} style={{ width: "232px"}}/></td>
                              <td className="p-4">
                                <div className="row">
                                  <div class="col-xl-12">
                                    <div class=" student-details-info">
                                      <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Student Name</label>: Nine</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: Science</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: 135 TK</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: Nine</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Birth Registration No.</label>: Science</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: 135 TK</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: Nine</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Quota</label>: Science</div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            :null
                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Parents Information</th>
                            {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          { this.state.pageFirst ?
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>FATHER'S NAME <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Father's Name"
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className=" text-orange"><small>FATHER'S OCCUPATION <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                      >
                                        <option hidden value="">Select Father's Occupation</option>
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>FATHER'S NID. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Father's NID (If Any)"
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>MOTHER'S NAME <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mothers's Name"
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup className="custom-dropdown">
                                      <Label for="class-group" className=" text-orange"><small>MOTHER'S OCCUPATION <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="select"
                                        name="class-group"
                                        placeholder="Select gender"
                                      >
                                        <option hidden value="">Select Mother's Occupation</option>
                                      </Input>
                                    </FormGroup>
                                  </div>

                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Label for="class-group" className=" text-orange"><small>MOTHERS'S NID. <span className="required">*</span></small></Label>
                                      <Input
                                        className=" bg-white border-0 rounded-0"
                                        type="text"
                                        name="class-group"
                                        placeholder="Enter Mother's NID (If Any)"
                                      >
                                      </Input>
                                    </FormGroup>
                                  </div>


                                </div>
                              </td>
                            </tr>

                            : this.state.pageSecond || this.state.pageThird ?

                            <tr>
                              <td className="p-4">
                                <div className="row">
                                  <div class="col-xl-12">
                                    <div class=" student-details-info">
                                      <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Father's Name</label>: Name</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Occupation</label>: Job</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's NID</label>: 123456789</div>
                                      <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Mother's Name</label>: Name</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Occupation</label>: Job</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's NID</label>: 123456789</div>                                    
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            :null
                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped responsive className="application-form-table">
                        <thead>
                          <tr>
                            <th>Previous Exam Information</th>
                            {/* <th className="text-right"><span>Application End Date : 31 Oct, 2020</span></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="2" class="p-4">
                              <div className="row">
                                { this.state.pageFirst ?
                                  <div className="col-xl-4">
                                    <FormGroup>
                                      <Button
                                        className="btn all-border-radious no-border explore-btn border-0"
                                        onClick={examInfoDialog}
                                      // onClick={this.onDownloadPdf}
                                      >
                                        <i class="fas fa-plus" ></i> ADD INFO
                                      </Button>
                                    </FormGroup>
                                  </div>
                                  : null
                                }

                                <div className="col-xl-12">
                                  <Table striped responsive className="pre-exam-info-table">
                                    <thead>
                                      <tr>
                                        <th>INSTITUTE NAME</th>
                                        <th>INS. TYPE</th>
                                        <th>BOARD</th>
                                        <th>CLASS</th>
                                        <th>ROLL NO.</th>
                                        <th>REG.NO</th>
                                        <th>EXAM</th>
                                        <th>GRADE </th>
                                        <th>GPA</th>
                                        <th>PASSING YEAR</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td><span>1</span></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>

                                <div className="col-xl-12">
                                  No Record Found
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row mt-1 p-4">
                  <div className="col-xl-12 mb-2"><b>Agreement *</b></div>
                  <div className="col-xl-12 f-14">
                    { !this.state.pageThird ?
                      <span className="mr-2"><Input type="checkbox" style={{ position: "relative", marginLeft: "0px"}} /> </span> 
                      : null
                    }
                    I declare that the above mention information are correct. If any information provide by me is found false.<br/>
                    The institute reserves the right to cancel my admission. I shall be obliged and obey all the rules & regulations of the institute.
                  </div>
                </div>

                


                  {this.state.pageThird ? 
                    <React.Fragment>
                      <div className="container">
                        <div className="row">
                          <div className="offset-xl-1 col-xl-10">
                            <div className="custom-title-border-center"></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 text-orange">
                        <h2 className="mb-0"><b>Congratulation !!</b></h2>
                        Application Submitted Successfully.
                      </div>

                      <div className="col-xl-12 my-3">
                        <small>Your User ID: 20200000012, Please keep this number to pay the application fee 125.00/= taka within 72 Hours through Bkash app or USSD Dial code.</small>
                      </div>

                      <div className="col-xl-12">
                        <h4 className="mb-3"><u><b>Follow The Steps</b></u></h4>
                        <small>
                          01. Go to Your Bkash Mobile app/dial code <br />
                          02. Choose ''Pay bill'' option <br />
                          03. Select Admisia option <br />
                          04. Enter the student registration no. <br />
                          05. After enter student registration you see the fees that you would be pay <br />
                          06. Now enter your Bkash mobile menu PIN to conform <br /><br />

                          N.B: Please preserve the user ID. You will need User ID to download Admit card after Completed your payment <br />
                        </small>

                      </div>

                      <div className="col-xl-12 text-right d-flex justify-content-end mt-4">
                        <FormGroup className="mr-5">
                          <Button
                            className="btn all-border-radious no-border explore-btn border-0 px-5"
                            onClick={this.showPreviousPage}
                          >
                            DOWNLOAD
                          </Button>
                        </FormGroup>

                        <FormGroup>
                          <Button
                            className="btn all-border-radious no-border explore-btn border-0 px-5"
                            onClick={this.showNextPage}
                          >
                            FINISHED
                          </Button>
                        </FormGroup>
                      </div>
                    </React.Fragment>
                    : 
                    <div className="col-xl-12 text-right d-flex justify-content-end">
                      { this.state.pageSecond ?
                        <FormGroup className="mr-5">
                          <Button
                            className="btn all-border-radious no-border explore-btn border-0 px-5"
                            onClick={this.showPreviousPage}
                          >
                            <i class="fas fa-angle-left" ></i> UPDATE 
                          </Button>
                        </FormGroup>
                        : null
                      }
    
                      <FormGroup>
                        <Button
                          className="btn all-border-radious no-border explore-btn border-0 px-5"
                          onClick={this.showNextPage}
                        >
                          Next <i class="fas fa-angle-right" ></i> 
                        </Button>
                      </FormGroup>
                    </div>
                  }



                <Modal isOpen={this.state.examInfoDialogVisible} toggle={examInfoDialog}>
                  <ModalHeader toggle={examInfoDialog} className="bg-primary-color-dark text-white">Previous Exam Info</ModalHeader>
                  <ModalBody className="bg-light">
                    <div className="row">
                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className=" text-orange"><small>INSTITUTE NAME <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Institute Name"
                          >
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className=" text-orange"><small>BOARD <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            placeholder="Select Board"
                          >
                            <option hidden value="">Select Gender</option>
                            <option value="">Male</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className=" text-orange"><small>CLASS <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Class Name"
                          >
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className=" text-orange"><small>Roll NO. <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Roll No."
                          >
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className=" text-orange"><small>REGISTRATION NO. <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Reg. No."
                          >
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className=" text-orange"><small>INSTITUTE TYPE <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                            placeholder="Select Institute Type"
                          >
                            <option hidden value="">Select Type</option>
                            <option value="">Test</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className=" text-orange"><small>EXAM <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter Exam Name"
                          >
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className=" text-orange"><small>GRADE <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                          >
                            <option hidden value="">Select Gread</option>
                            <option value="">Test</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup>
                          <Label for="class-group" className=" text-orange"><small>GPA <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="text"
                            name="class-group"
                            placeholder="Enter GPA"
                          >
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6">
                        <FormGroup className="custom-dropdown">
                          <Label for="class-group" className=" text-orange"><small>PASSING YRAR <span className="required">*</span></small></Label>
                          <Input
                            className=" bg-white border-0 rounded-0"
                            type="select"
                            name="class-group"
                          >
                            <option hidden value="">Select Passing Year</option>
                            <option value="">2020</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 text-right my-3">
                        <Button className="btn all-border-radious no-border explore-btn border-0 px-5" onClick={examInfoDialog}>SAVE</Button>{' '}
                      </div>

                    </div>
                  </ModalBody>
                  {/* <ModalFooter>
                    <Button color="primary" onClick={examInfoDialog}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={examInfoDialog}>Cancel</Button>
                  </ModalFooter> */}
                </Modal>


              </div>


              <div className="container">
                <div className="row">
                  <div className="offset-xl-1 col-xl-10">
                    <div className="custom-title-border-center mb-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </AppLayout>
      </div>
    );
  }
}

ApplicationForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationForm: makeSelectApplicationForm(),
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

const withReducer = injectReducer({ key: 'applicationForm', reducer });
const withSaga = injectSaga({ key: 'applicationForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApplicationForm);
