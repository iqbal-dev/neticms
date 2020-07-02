/**
 *
 * IndividualResult
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
// import makeSelectIndividualResult, { makeSelectAcademicYearList, makeSelectAcademicYear } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';
import donorImage from '../../assets/img/donor-image.png';
import positionIcon from '../../assets/img/positionIcon.png';
import { AppLayout } from '../AppLayout';
import makeSelectIndividualResult, { 
  makeSelectAcademicYearList, 
  makeSelectAcademicYear, 
  makeSelectExamList,
  makeSelectIndividualResultData
} from './selectors';

import { 
  makeChangeStudentID, 
  makeChangeStudentMobile,
  submitSearchHandle,
  makeChangeAcademicYear,
  makeChangeExamType,
} from './actions';

import { 
  makeSelectStudentID, 
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class IndividualResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        studentID: "",
        mobileNo: "",
        year: "",
        examType: "",
        errors: {}
    }
  }

  onChangeInputField = (event) =>{
    let { errors } = this.state
    // console.log('e', event.target.value);
    errors[event.target.name] = ''
    this.setState({
      [event.target.name]: event.target.value, errors
    });
  }

  handleError = () => {
    let { errors } = this.state
    let formIsValid = true;
    if (!this.state.studentID) {
      errors["studentID"] = "Student Id can't left empty"
      formIsValid = false;
    }

    if (!this.state.mobileNo) {
      errors["mobileNo"] = "Mobile No. can't left empty"
      formIsValid = false;
    }

    if (!this.state.year) {
      errors["year"] = "Year can't left empty"
      formIsValid = false;
    }

    if (!this.state.examType) {
      errors["examType"] = "Exam type can't left empty"
      formIsValid = false;
    }

    this.setState({ errors })
    return formIsValid;
  }

  onSearchStudentInfo = () =>{
    if(this.handleError()){

    }
  }
  
  render() {
    let { errors } =this.state
    let { academicYearList, academicYear, examList, resultData } = this.props
    console.log("YEAR_LIST", academicYearList);
    console.log("EXAM_LIST", examList);//resultData
    console.log("Result Data", resultData);//resultData
    
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>IndividualResult</title>
            <meta name="description" content="Description of IndividualResult" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Individual Result"
            menuStepFirst="Home"
            menuStepSenond="Result Info"
            menuStepThird="Individual"
          />

          <section>
            <div className="container-fluid">
              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside">
                      <div className="col-md-6 col-lg-3 top-position">
                        <img src={positionIcon} />
                        <div>
                          <h2>{ resultData.classPosition }</h2>
                          <p>Merit Position</p>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-9 mt-sm-5 mt-md-1 mt-lg-0 mt-5">
                        <div className="row form">
                          <Form inline className="col-lg-12">
                            <div className="col-md-12 col-lg-4">
                              <FormGroup className=" custom-input-text">
                                <Input
                                  type="text"
                                  placeholder="Write Student Id"
                                  name="studentID"
                                  onChange={this.props.onChangeStudentID}
                                />
                              </FormGroup>
                              <div className="error-message"> {errors['studentID']}</div>
                              <FormGroup className="custom-dropdown m-t-10">
                                <Input
                                  type="select"
                                  name="year"
                                  onChange={this.props.onChangeAcademicYear}
                                // value={ this.props.academicYear}
                                >
                                  <option value=''>Select Academic Year</option>
                                  {academicYearList && academicYearList.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}
                                </Input>
                              </FormGroup>
                              <div className="error-message"> {errors['year']}</div>
                            </div>

                            <div className="col-md-12 col-lg-4">
                              <FormGroup className="custom-input-text">
                                <Input
                                  type="text"
                                  name="mobileNo"
                                  placeholder="Write Reg. Mobile No."
                                  onChange={this.props.onChangeStudentMobile}
                                />
                              </FormGroup>
                              <div className="error-message"> {errors['mobileNo']}</div>
                              <FormGroup className="custom-dropdown m-t-10">
                                <Input
                                  type="select"
                                  name="examType"
                                  onChange={this.props.onChangeExamType}
                                >
                                  <option value=''>Select Exam Type</option>
                                  {examList && examList.map(item => (<option key={item.examObject.id} value={item.examObject.id}>{item.examObject.name}</option>))}
                                </Input>
                              </FormGroup>
                              <div className="error-message"> {errors['examType']}</div>
                            </div>

                            <div className="col-md-12 col-lg-3">
                              <FormGroup>
                                <Button
                                  className="btn explore-btn full-width all-border-radious"
                                  onClick={this.props.onSubmitSearch}
                                >
                                  <i class="fas fa-chevron-circle-right mr-3"></i> Search
                              </Button>
                              </FormGroup>
                              <FormGroup className="my-3">
                                <span className="print text-orange"><i className="fas fa-print text-secondary"></i> Print Result</span>
                              </FormGroup>
                            </div>
                          </Form>
                          {/* <div className="col-md-12 col-lg-6 form">
                          <Form inline>
                            
                            

                            <Button className="btn explore-btn full-width">Search</Button>
                          </Form>
                        </div> */}
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title with-print mb-4">
                      <h2>
                        <span className="font-20">
                          Showing Result for Student ID. <span className="text-orange">{ resultData.customStudentId }</span>, Reg. Mobile No. <span className="text-orange">{ resultData.mobileNo }</span></span>
                        <span className="print text-orange"><i className="fas fa-print"></i> Print Result</span>
                      </h2>
                      <div className="custom-title-border-left my-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">

                  <div class="col-md-12 studentlist-data-inside">
                    <div class="description">
                      <div class="col-md-12 description-inside py-4 mx-0">
                        <div class="col-md-6 col-lg-2 roll-no">
                          <span class="roll-no-title">Roll No.</span>
                          <br />
                          <label className="text-orange mb-0">{ resultData.studentRoll }</label>
                          <hr className="my-1" />
                          <span class="roll-no-title">Student ID</span>
                          <br />
                          <label className="text-orange">{ resultData.customStudentId }</label>
                        </div>

                        <div class="col-md-6 col-lg-2 student-img mx-0">
                          <div class="img-div">
                            <div class="img-div overlay">
                              <i class="fas fa-search-plus"></i>
                            </div>
                            <img src={donorImage} width="85px" height="85px" />
                          </div>
                        </div>

                        <div class="col-md-6 col-lg-4">
                          <div class="col-lg-12 student-details">
                            <div className=""><label>Student Name</label>: { resultData.studentName }</div>
                            <div className=""><label>Father's Name</label>: { resultData.fatherName }</div>
                            <div className=""><label>Mother's Name</label>: { resultData.motherName }</div>
                            <div className=""><label>Reg. Mobile No.</label>: { resultData.mobileNo }</div>
                            <div className=""><label>Exam Name</label>: { /*resultData.studentName*/ }</div>
                          </div>
                        </div>
                        <div className="row vertical-border ml-md-1 px-0 d-sm-none d-md-block d-lg-block"></div>
                        <div class="col-md-6 col-lg-4 ml-md-0">
                          <div class="col-lg-12 student-details">
                            <div className=""><label>Section</label>: { resultData.sectionName }</div>
                            <div className=""><label>Total Marks</label>: { resultData.obtainedMarks }</div>
                            <div className=""><label>GPA</label>: { resultData.gpa }</div>
                            <div className=""><label>Grade</label>: { resultData.grade }</div>
                            <div className=""><label>Academic Year</label>: { this.props.academicYear }</div>
                          </div>
                        </div>


                        {/* <div class="col-md-6 col-lg-1 student-gender">
                          <i class="fas fa-male" />
                        </div>
                        <div class="col-md-6 col-lg-2 student-custom-id">
                          <span class="roll-no-title">Student ID</span>
                          <br />
                          <label className="text-orange">321256</label>
                        </div> */}

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="container">
                <div className="row">
                  <di className="col-md-12">
                    <div className="table-responsive custom-table">
                      <Table
                        responsive
                        className="section-wise-attendance-table attendance-symbol"
                      >
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Total Marks</th>
                            <th>CT</th>
                            <th>CP</th>
                            <th>WR</th>

                            <th>PR</th>
                            <th>Obtained Marks</th>
                            <th>GPA</th>
                            <th>Grade</th>
                            {/* <th className="text-center">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Bangla 1st Paper</td>
                            <td>549.60</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>500.96</td>
                            <td>4.88</td>
                            <td>A</td>
                          </tr>
                          <tr>
                            <td>Bangla 1st Paper</td>
                            <td>549.60</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>500.96</td>
                            <td>4.88</td>
                            <td>A</td>
                          </tr><tr>
                            <td>Bangla 1st Paper</td>
                            <td>549.60</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>500.96</td>
                            <td>4.88</td>
                            <td>A</td>
                          </tr><tr>
                            <td>Bangla 1st Paper</td>
                            <td>549.60</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>95.55</td>
                            <td>500.96</td>
                            <td>4.88</td>
                            <td>A</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </di>
                </div>
                {/* <div className="row m-t-40">
                <div className="col-md-12">
                  <div className="text-center m-t-40">
                    <button className="btn explore-btn-lg">
                      Load More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
          </div>
        </AppLayout>
        
      </div>
    );
  }
}

IndividualResult.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  individualResult: makeSelectIndividualResult(),
  studentID: makeSelectStudentID(),

  academicYearList: makeSelectAcademicYearList(),
  academicYear: makeSelectAcademicYear(),

  examList: makeSelectExamList(),

  resultData: makeSelectIndividualResultData(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeStudentID: (evt) => { dispatch(makeChangeStudentID(evt.target.value)) },
    onChangeAcademicYear: (evt) => { dispatch(makeChangeAcademicYear(evt.target.value)) },
    onChangeStudentMobile: (evt) => { dispatch(makeChangeStudentMobile(evt.target.value)) },
    onChangeExamType: (evt) => { dispatch(makeChangeExamType(evt.target.value)) },

    onSubmitSearch: () => { dispatch(submitSearchHandle()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'individualResult', reducer });
const withSaga = injectSaga({ key: 'individualResult', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IndividualResult);
