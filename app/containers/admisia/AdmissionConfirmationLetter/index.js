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

/* eslint-disable react/prefer-stateless-function */
export class AdmissionConfirmationLetter extends React.Component {

  render() {

    let download = () => {
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

        console.log(canvas.height + "  " + canvas.width);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }

        pdf.save("HTML-Document.pdf");
      });
    }
    return (
      <div class="admisia">
        <AppLayout>

          <BreadcrumComponent
            pageTitle="Confirmation Letter"
            menuStepFirst="Online Admission"
            menuStepSenond="Confirmation Letter"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40 online-application">
                <div className="row">
                  <div class="col-xl-12 text-center">
                    <Button
                      onClick={download}
                    >
                      Download
                  </Button>
                  </div>
                </div>

                <div class="canvas_div_pdf">

                  <div className="row">
                    <div class="col-xl-12 text-center">
                      <img src={netiLogo} height="150px" className="" />
                    </div>

                    <div class="col-xl-12 text-center my-3">
                      <h2>Netizen International School and College</h2>
                      <h5>172/B, Road No. 23, Mohakhali DOHS, Dhaka-1206, Bangladesh</h5>
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
                                      <img src={staticImg} height="150px" className="border rounded" />
                                    </div>
                                  </div>

                                  <div class="col-xl-4 d-flex align-items-end">
                                    <div class=" student-details-info">
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Registration No.</label>: 1233212132</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Roll No.</label>: 25356</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Class & Group</label>: Nine (Science)</div>
                                    </div>
                                  </div>

                                  <div class="col-xl-4 d-flex align-items-end">
                                    <div class=" student-details-info">
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Academic Year</label>: 2020</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Date</label>: 15-11-2020</div>
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
                      Dear Applicant,
                  <br />
                      <br />
                      We are pleased to inform you that, due to your good academic performance, you have been admitted
                      into our institute to future your studies. We congratulate you for the achievement and welcome to the
                      ''Asha International Girl's High School & College'' community.
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
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Student Name</label>: Shahrear Kabir</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Gender</label>: Male</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Religion</label>: Islam</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Date of Birth</label>: 2 March, 1991</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Father's Name</label>: Md. Ruhul Amin</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Mother's Name</label>: Most. Jobeda Khatun</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Guardian Mobile No.</label>: 01675886072</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Address</label>: Test address</div>
                                      <div className="d-flex align-items-center"><div class="task-badge found"></div><label>Application Fee</label>: 135.00 TK</div>

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
                      Print Date : 25-10-2020
                </div>
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
