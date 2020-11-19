/**
 *
 * AdmissionConfirmationLetter
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
import makeSelectAdmissionConfirmationLetter from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap';
import staticImg from '../../../assets/img/demo-image.jpg';
import netiLogo from '../../../assets/img/neti_logo.png';
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { get_DDMMYY_Format_WithHyphen, get_DDMMM_YY_Format_WithComma } from '../../../utils/dateFormat';

/* eslint-disable react/prefer-stateless-function */
export class AdmissionConfirmationLetter extends React.Component {

  constructor(props) {

    super(props);
    this.state = {};

  }

  setConfirmationLetterToDownload() {

    // console.log('letter dwnld click');

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

      pdf.save("confirmation-letter.pdf");
    });
  }

  render() {

    let applicantInfoList = JSON.parse(sessionStorage.applicantInfoByRegNo);

    const instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
    let instituteUrlInfoDetails = '';

    if (instituteUrlInfo && instituteUrlInfo[0]) {
      instituteUrlInfoDetails = instituteUrlInfo && instituteUrlInfo[0];
    } else { instituteUrlInfoDetails = '' }

    return (
      <div class="admisia">

        <section>
          <div className="container-fluid">
            <div className="container m-t-40 online-application">
              <div className="row">
                <div class="col-xl-12 ">
                  <Button className="btn all-border-radious no-border explore-btn" style={{ float: 'right' }} onClick={this.setConfirmationLetterToDownload}>Download</Button>
                </div>
              </div>

              <div class="canvas_div_pdf">

                <div className="row">

                  <div class="col-xl-12 text-center">
                    {instituteUrlInfoDetails.logoContent ?
                      <img src={"data:image/jpg;base64," + instituteUrlInfoDetails.logoContent} width="151px" height="150px" className="" />
                      :
                      <img src={netiLogo} width="151px" height="150px" className="" />
                    }
                  </div>

                  <div class="col-xl-12 text-center my-3">
                    <h2>{instituteUrlInfoDetails.instituteName}</h2>
                    <h5>{instituteUrlInfoDetails.instituteAddress}, Bangladesh</h5>
                  </div>

                  <div class="col-xl-12 text-center mt-1 text-primary-light">
                    <h3><b className="" style={{ borderBottomStyle: "dotted" }}>Admission Confirmation Letter</b></h3>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <tbody>
                          <tr className="bg-white">
                            <td className="py-0" style={{ borderTop: "unset" }}>
                              <div className="row">
                                <div class="col-xl-3">
                                  <div className="mb-2">
                                    {
                                      applicantInfoList && applicantInfoList.fileContent ?
                                        <img src={"data:image/jpg;base64," + applicantInfoList.fileContent} height="220px" className="border rounded" />
                                        : <img src={staticImg} height="150px" className="border rounded" />
                                    }

                                    {/* <img src={staticImg} height="150px" className="border rounded" /> */}
                                  </div>
                                </div>

                                <div class="col-xl-4 d-flex align-items-end">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Registration No.</label>: {applicantInfoList ? applicantInfoList.registrationId : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Roll No.</label>: {applicantInfoList ? applicantInfoList.rollNo : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Class & Group</label>: {applicantInfoList ? `${applicantInfoList.clasName} (${applicantInfoList.groupName}) ` : ''}</div>
                                  </div>
                                </div>

                                <div class="col-xl-4 d-flex align-items-end">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Academic Year</label>: {applicantInfoList ? applicantInfoList.academicYear : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Date</label>:{applicantInfoList ? get_DDMMYY_Format_WithHyphen(applicantInfoList.applicationDate) : ''}</div>
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

                <div className="row my-4">
                  <div className="col-xl-12">
                    <strong> Dear Applicant,</strong>
                    <br />
                    <br />
                    We are pleased to inform you that, due to your good academic performance, you have been admitted
                    into our institute to future your studies. We congratulate you for the achievement and welcome to the
                  ''{instituteUrlInfoDetails.instituteName}'' community.
                  <br />
                    Bring your required documents on the admission date. We Look forward to receiving you.
                </div>
                </div>

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Applicant Information</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            <td>
                              <div className="row">

                                <div class="col-xl-12">
                                  <div class=" student-details-info">
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: {applicantInfoList ? applicantInfoList.applicantName : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: {applicantInfoList ? applicantInfoList.gender : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: {applicantInfoList ? applicantInfoList.religion : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: {applicantInfoList ? get_DDMMM_YY_Format_WithComma(applicantInfoList.dob) : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Name</label>: {applicantInfoList ? applicantInfoList.fatherName : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Name</label>:{applicantInfoList ? applicantInfoList.motherName : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: {applicantInfoList ? applicantInfoList.mobileNo : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: {applicantInfoList ? applicantInfoList.addressDetails : ''}</div>
                                    <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: {applicantInfoList ? applicantInfoList.totalFee : ''} TK</div>

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

                <div className="row mt-1">
                  <div className="col-xl-12">
                    <div className="">
                      <Table striped className="application-form-table">
                        <thead>
                          <tr>
                            <th>Declaration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            <td>
                              <div className="row">
                                <div class="col-xl-12">
                                  I, Md. Rashid Khan, do hereby declare that the above mentioned information and photo are correct. If any
                                  information provided provided by me is found false, the institute reserves the right to cancel my
                                  admission. I shall be obliged to obey the rules and regulations of the institute as well as pay all the
                                  required fees.
                              </div>
                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="row my-5 mx-2">
                  <div className="col-xl-4">
                    <h1 className="m-0">___________</h1>
                    {/* <br/> */}
                    Applicant Signature & Date
                </div>
                  <div className="col-xl-4 text-center">
                    <h1 className="m-0">___________</h1>
                    {/* <br/> */}
                    Guardian Signature & Date
                </div>
                  <div className="col-xl-4 text-right">
                    <h1 className="m-0">___________</h1>
                    {/* <br/> */}
                    Principal Signature & Date
                </div>
                </div>

                <div className="row my-2 mx-2">
                  <div className="col-xl-4">
                    Powered By: Netizen IT Limited
                </div>
                  <div className="col-xl-4 text-center">
                    This is a system generated letter
                </div>
                  <div className="col-xl-4 text-right">
                    Print Date : {get_DDMMYY_Format_WithHyphen(new Date)}
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="offset-xl-1 col-xl-10">
                <div className="custom-title-border-center mb-2"></div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }
}

AdmissionConfirmationLetter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  admissionConfirmationLetter: makeSelectAdmissionConfirmationLetter(),
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

const withReducer = injectReducer({
  key: 'admissionConfirmationLetter',
  reducer,
});
const withSaga = injectSaga({ key: 'admissionConfirmationLetter', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdmissionConfirmationLetter);
