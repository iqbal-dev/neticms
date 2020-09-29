/**
 *
 * TeacherInformation
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
import makeSelectTeacherInformation, { makeSelectTeacherInformationList, makeSelectTeacherInfoloaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import donorImage from '../../assets/img/donor-image.png';
import demoImageMale from '../../assets/img/demo-image.jpg';
import demoImageFemale from '../../assets/img/demo-image-female.jpg';

import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';
import { centerTableLoader } from '../../utils/contentLoader';
import { FormGroup, Button } from 'reactstrap';

import { getDownloadTablePDF } from '../../utils/generatePdf';

/* eslint-disable react/prefer-stateless-function */
export class TeacherInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }

    
  }

  onDownloadPdf = () => {
    let pdfColumns = [
      { title: "ID", dataKey: "customStaffId" },
      { title: "Name", dataKey: "staffName" },
      { title: "Designation", dataKey: "designationName" },
      { title: "Mobile No.", dataKey: "staffMobile1" },
      { title: "Email", dataKey: "staffEmail" },
      { title: "Gender", dataKey: "gender" },
    ]
    getDownloadTablePDF( "Teacher's List", pdfColumns, this.props.teacherList)
  }

  render() {

    let teachers = this.props.teacherList;

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>TeacherInformation</title>
            <meta
              name="description"
              content="Description of TeacherInformation"
            />
          </Helmet>
          <BreadcrumComponent pageTitle="Teacher's Information" menuStepFirst="Institute Info" menuStepSenond="List of" menuStepThird="Teacher" />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2 className="text-orange d-flex justify-content-between align-items-center">Teacher's Information 
                      <FormGroup className="mb-0">
                        <Button
                          className="btn all-border-radious no-border"
                          onClick={this.onDownloadPdf}
                        >
                          <i class="fas fa-file-pdf" ></i> Download
                        </Button>
                      </FormGroup>
                      </h2>
                      <div className="custom-title-border-left"></div>
                    </div>
                  </div>
                </div>

                {this.props.loaderType === 'autoLoadOn' ? centerTableLoader() :

                  <div className="row" id='pdf-download-section'>
                    {
                      teachers.map((item) => {
                        return (
                          <div className="col-md-6 col-lg-4">
                            <div className="grid-list-wrapper">
                              {
                                item.gender == "Male" ?
                                  <div className="grid-image teachers">
                                    {item.image ?
                                      <img src={"data:image/*;base64," + item.imageName} className="mx-auto d-block" />
                                      : <img src={demoImageMale} className="mx-auto d-block" />
                                    }
                                  </div>
                                  : <div className="grid-image teachers">
                                    {item.image ?
                                      <img src={"data:image/*;base64," + item.imageName} className="mx-auto d-block" />
                                      : <img src={demoImageFemale} className="mx-auto d-block" />
                                    }
                                  </div>
                              }
                              <div className="grid-content text-center">
                                <div className="grid-title">
                                  {item.staffName ? <h3>{item.staffName}</h3> : <h3>No Name</h3>}
                                </div>
                                <div className="grid-subtitle-title">
                                  {item.staffName ? <h4>{item.designationName}</h4> : <h4>No Data</h4>}
                                </div>
                              </div>
                              <div className="grid-social">
                                <ul className="d-flex justify-content-center w-100 nav">
                                  <li><a className={!item.staffMobile1 ? '' : "phone"} phone={item.staffMobile1}><i class="fas fa-phone"></i></a></li>
                                  <li><a className={!item.staffEmail ? '' : "email"} email={item.staffEmail}><i class="fas fa-envelope"></i></a></li>
                                  <li><a className={!item.facebookProfile ? '' : "facebook"} facebook={item.facebookProfile}><i class="fab fa-facebook-f"></i></a></li>
                                  <li><a className={!item.linkedinProfile ? '' : "linkedin"} linkedin={item.linkedinProfile}><i class="fab fa-linkedin-in"></i></a></li>

                                </ul>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                }

              </div>
              <div className="container">
                <div className="row">
                  <div className="offset-md-1 col-md-10">
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

TeacherInformation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  teacherList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  teacherInformation: makeSelectTeacherInformation(),
  teacherList: makeSelectTeacherInformationList(),
  loaderType: makeSelectTeacherInfoloaderType(),
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

const withReducer = injectReducer({ key: 'teacherInformation', reducer });
const withSaga = injectSaga({ key: 'teacherInformation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TeacherInformation);
