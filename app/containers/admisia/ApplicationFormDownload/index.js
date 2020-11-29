/**
 *
 * ApplicationFormDownload
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
import makeSelectApplicationFormDownload from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import succesImage from './succesImage.png';

import {
  CustomInput, FormGroup, Input, Label, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from 'reactstrap';
import { get_DDMMM_YY_Format_WithComma } from '../../../utils/dateFormat';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationFormDownload extends React.Component {

  applicationDownload() {

    var applicantInfoDetails = JSON.parse(sessionStorage.applicantFromDownloadData);

    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(function (canvas) {
      canvas.getContext('2d');

      // console.log(canvas.height + "  " + canvas.width);

      var imgData = canvas.toDataURL("image/JPG", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }

      pdf.save(applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.registrationId + "_application form.pdf");
    });
  }

  render() {

    let applicantInfoDetails = JSON.parse(sessionStorage.applicantFromDownloadData);
    // console.log('download-applicantInfoList', applicantInfoDetails);

    return (
      <div class="admisia">
        <section>
          <div className="container-fluid">
            <div className="container m-t-40 online-application">

              <div className="row">
                <div class="col-xl-12 ">
                  <Button className="btn all-border-radious no-border explore-btn" style={{ float: 'right' }} onClick={this.applicationDownload}>Download</Button>
                </div>
              </div>

              <div class="canvas_div_pdf" style={{ marginTop: '20px' }}>

                <div className="row m-0 text-center bg-smoke-white section-top-page" >
                  <div className="col-xl-4 py-5 text-center one active">
                    <div className='page'>1</div>
                    <div>Information</div>
                  </div>
                  <div className="col-xl-4 py-5 two active" >
                    <div className='page'>2</div>
                    <div>Review</div>
                  </div>
                  <div className="col-xl-4 py-5 three active">
                    <div className='page'>3</div>
                    <div>Completed</div>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="m-t-20">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Application Information</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>

                          <tr>
                            <td>
                              <div className="row">
                                <div class="col-xl-12">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Class</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.clasName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Group</label>: {applicantInfoDetails.applicantPersonalViewResponse.groupName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Roll No.</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.rollNo}</div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="row">
                                <div class="col-xl-12">
                                  <div class="student-details-info ml-auto">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Academic Year</label>: {applicantInfoDetails.insertApplicantInfoObj.academicYear}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application End Date</label>: {get_DDMMM_YY_Format_WithComma(applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.applicationEndDate)}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: {(applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.totalFee)} TK</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="my-3">
                      <h2 className="d-flex justify-content-center">
                        <span className="text-orange "> Application Form </span>
                      </h2>
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
                          <tr>
                            <td style={{ width: "232px" }} className="p-4">
                              <img src={"data:image/jpg;base64," + applicantInfoDetails.applicantPersonalViewResponse.fileContent} style={{ width: "232px" }} />
                            </td>
                            <td className="p-4">
                              <div className="row">
                                <div class="col-xl-12">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center mt-0"><div class="task-badge found"></div><label>Student Name</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.applicantName}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.gender}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.religion}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: {get_DDMMM_YY_Format_WithComma(applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.dob)}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Birth Registration No.</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.birthCertificateNo}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Quota</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.quota}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.mobileNo}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.addressDetails}</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                {applicantInfoDetails && applicantInfoDetails.applicantPreviousExamViewResponses && applicantInfoDetails.applicantPreviousExamViewResponses.length > 0 ?
                  <div className="row mt-1">
                    <div className="col-xl-12">
                      <div className="">
                        <Table striped className="application-form-table">
                          <thead>
                            <tr>
                              <th>Previous Exam Information</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="2" class="p-4">
                                <div className="row">
                                  <div className="col-xl-12 mt-3">
                                    <Table striped className="pre-exam-info-table">
                                      <thead>
                                        <tr>
                                          <th>INSTITUTE NAME</th>
                                          <th>INS. TYPE</th>
                                          <th>BOARD</th>
                                          <th>CLASS</th>
                                          <th>ROLL NO.</th>
                                          <th>REG. NO</th>
                                          <th>EXAM</th>
                                          <th>GRADE </th>
                                          <th>GPA</th>
                                          <th>PASSING YEAR</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {applicantInfoDetails && applicantInfoDetails.applicantPreviousExamViewResponses.map((item, index) =>
                                          <tr>
                                            <td>{item.instituteName}</td>
                                            <td>{item.instituteType}</td>
                                            <td>{item.boardName}</td>
                                            <td>{item.className}</td>
                                            <td>{item.rollNo}</td>
                                            <td>{item.registrationNo}</td>
                                            <td>{item.examName}</td>
                                            <td>{item.examGrade}</td>
                                            <td>{item.examGpa}</td>
                                            <td>{item.passingYear}</td>
                                          </tr>
                                        )
                                        }
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                  : ''}

                <div className="row mt-1 p-4">
                  <div className="col-xl-12 mb-2"><b>Agreement *</b></div>
                  <div className="col-xl-12 f-14">
                    I declare that the above mention information are correct. If any information provide by me is found false.<br />
                    The institute reserves the right to cancel my admission. I shall be obliged and obey all the rules & regulations of the institute.
                  </div>
                </div>

                <React.Fragment>

                  <div className="row mt-1">
                    <div className="col-xl-12">
                      <div className="">
                        <Table striped className="application-form-table">
                          <thead>
                            <tr>
                              <th>Success Message</th>
                            </tr>
                          </thead>
                          <tbody>

                            <tr>
                              <td colSpan="12" className="p-0 success-wrapper">

                                <div className="col-xl-12 success-top-section">

                                  <img className="successImage" src={succesImage} width="100%" height="90" />
                                  <div className="col-xl-12 success-level text-orange">
                                    <h2 className="mb-0" style={{ marginTop: '12px' }}><b>Congratulation !!</b></h2>
                                    Application Submitted Successfully.
                                    </div>

                                </div>

                                <div className="col-xl-12 success-details">
                                  Your Registration No.  <span className="text-orange" style={{ fontSize: 'x-large' }}> <strong>{applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.registrationId}</strong> </span>, Please keep this number to pay the application fee {applicantInfoDetails && applicantInfoDetails.applicantPersonalViewResponse.totalFee}.00/= taka.
                                    {/* within 72 Hours through Bkash app or USSD Dial code. */}
                                  <br />
                                  <p className="m-t-8">
                                    <strong> N.B: </strong>  Please preserve your "Registration No." You will need Registration No. to complete payment procedure, to download Admit and<br />also further inquiries. <br />
                                  </p>
                                </div>

                                <div className="col-xl-12 success-bottom-section ">
                                  <img className="successImage" src={succesImage} width="100%" height="90" />
                                </div>

                                {/* <div className="col-xl-12">
                                    <h4 className="mb-3"><u><b>Follow The Steps</b></u></h4>
                                    <small>
                                      01. Go to Your Bkash Mobile app/dial code <br />
                                      02. Choose ''Pay bill'' option <br />
                                      03. Select Admisia option <br />
                                      04. Enter the student registration no. <br />
                                      05. After enter student registration you see the fees that you would be pay <br />
                                      06. Now enter your Bkash mobile menu PIN to conform <br /><br />

                                      <strong> N.B: </strong>  Please preserve your "Registration No." You will need Registration No. to complete payment procedure, to download Admit and also further inquiries. <br />
                                    </small>

                                  </div> */}

                              </td>
                            </tr>

                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="row">
                      <div className="offset-xl-1 col-xl-10">
                        <div className="custom-title-border-center"></div>
                      </div>
                    </div>
                  </div>

                </React.Fragment>

              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }
}

ApplicationFormDownload.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationFormDownload: makeSelectApplicationFormDownload(),
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

const withReducer = injectReducer({ key: 'applicationFormDownload', reducer });
const withSaga = injectSaga({ key: 'applicationFormDownload', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApplicationFormDownload);
