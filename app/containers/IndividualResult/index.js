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
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';
import donorImage from '../../assets/img/donor-image.png';
import staticImage from '../../assets/img/avatar.png';
import positionIcon from '../../assets/img/positionIcon.png';
import { AppLayout } from '../AppLayout';
import makeSelectIndividualResult, {
  makeSelectAcademicYearList,
  makeSelectAcademicYear,
  makeSelectExamList,
  makeSelectIndividualResultData,
  makeSelectExamConfigId,
  makeSelectExamLoaderType
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
import { inputFieldLoaderLarge, centerTableLoader, inputFieldLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */
export class IndividualResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      mobileNo: "",
      year: "",
      examType: "",
      errors: {},
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChangeStudentId = (e) => {
    this.props.onChangeStudentID(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeAcYear = (e) => {
    this.props.onChangeAcademicYear(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeExam = (e) => {
    console.log(e.target);
    this.setState({ examType: e})
    this.props.onChangeExamType(e);
    this.clearErrorMsg(e.target.name);
  }

  onSubmitSearchHandle = (e) => {
    e.preventDefault();
    if (!this.emptyFieldCheck()) {
      console.log('submit cond true');
      this.props.onSubmitSearch();
    }

  }

  emptyFieldCheck = () => {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (this.props.studentID === '' || this.props.studentID === undefined) {
      fieldIsEmpty = true;
      errors["studentID"] = "Student ID can't left empty.";
    }

    if (this.props.academicYear === '' || this.props.academicYear === undefined) {
      fieldIsEmpty = true;
      errors["year"] = "Academic Year can't left empty.";
    }

    if (this.props.examConfigId === '' || this.props.examConfigId === undefined) {
      fieldIsEmpty = true;
      errors["examType"] = "Exam can't left empty.";
    }

    this.setState({ errors });
    return fieldIsEmpty;

  }

  clearErrorMsg = (name) => {
    let { errors } = this.state;
    errors[name] = ''
    this.setState({ errors })
  }

  render() {

    let { errors } = this.state;
    let { academicYearList, academicYear, examList, resultData } = this.props

    let resultColumnName = []
    let shortCodeTitle = []

    for (let i = 1; i <= 4; i++) {
      if (resultData && resultData['shortCode' + i + 'Name'] != null) {
        resultColumnName.push(resultData && resultData['shortCode' + i + 'Name']);
        shortCodeTitle.push('shortCode' + i);
      }
    }

    let column = resultColumnName.map((item, index) =>
      <th>{item}</th>
    )
    console.log('stdId, acYr, examId', this.props.studentID, this.props.academicYear, this.props.examConfigId);
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
            menuStepFirst="Result Info"
            menuStepSenond="Semester Exam"
            menuStepThird="Individual"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside py-4">
                      <div className="col-md-6 col-lg-3 top-position">
                        <img src={positionIcon} />
                        <div>
                          <h2>{resultData && resultData.classPosition}</h2>
                          <p>Merit Position</p>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-9 mt-sm-5 mt-md-1 mt-lg-0 mt-5">
                        <div className="row form">
                          <Form inline className="col-lg-12">
                            <div className="row col-md-12 col-lg-6">
                              <div className="col-12">
                                <FormGroup className=" custom-input-text">
                                  <Input
                                    type="text"
                                    placeholder="Enter Student Id"
                                    name="studentID"
                                    onChange={(e) => this.onChangeStudentId(e)}
                                  />
                                  <div className="error-message"> {errors['studentID']}</div>
                                </FormGroup>
                              </div>

                              <div className="col-12">
                                <FormGroup className="custom-dropdown mt-2">
                                  <Input
                                    type="select"
                                    name="year"
                                    onChange={(e) => this.onChangeAcYear(e)}
                                  // value={ this.props.academicYear}
                                  >
                                    <option value=''>Select Academic Year</option>
                                    {academicYearList && academicYearList.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}
                                  </Input>
                                  <div className="error-message"> {errors['year']}</div>
                                </FormGroup>
                              </div>

                            </div>

                            <div className="row col-md-12 col-lg-6">
                              <div className="col-12">
                                {this.props.loaderType === 'dependendLoadOn' ? inputFieldLoader() :
                                  <FormGroup className="custom-dropdown">
                                    <Input
                                      type="select"
                                      name="examType"
                                      onChange={(e) => this.onChangeExam(e)}
                                    >
                                      <option value=''>Select Exam Type</option>
                                      {examList && examList.map(item => (<option key={item.examObject.id} value={item.examObject.id}>{item.examObject.name}</option>))}
                                    </Input>
                                    <div className="error-message"> {errors['examType']}</div>
                                  </FormGroup>
                                }
                              </div>
                              

                              {/* <FormGroup className="custom-input-text">
                                <Input
                                  type="text"
                                  name="mobileNo"
                                  placeholder="Enter Reg. Mobile No."
                                  onChange={this.props.onChangeStudentMobile}
                                />
                              </FormGroup>
                              <div className="error-message"> {errors['mobileNo']}</div> */}

                              <div className="col-12">
                                <FormGroup className="mt-2">
                                  <Button
                                    className={ errors['examType']? "btn explore-btn full-width all-border-radious mb-3" : 'btn explore-btn full-width all-border-radious'}
                                    onClick={this.onSubmitSearchHandle}
                                  >
                                    <i class="fas fa-chevron-circle-right mr-3"></i> Search
                                  </Button>
                                  
                                </FormGroup>
                              </div>

                            </div>

                            <div className="col-md-12 col-lg-3">

                              {/* <FormGroup className="my-3">
                                <span className="print text-orange"><i className="fas fa-print text-secondary"></i> Print Result</span>
                              </FormGroup> */}
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

              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title with-print mb-4">
                      <h2>
                        <span className="font-20">
                          Showing Result for Student ID. <span className="text-orange">{resultData && resultData.customStudentId}</span></span>
                        {/* <span className="print text-orange"><i className="fas fa-print"></i> Print Result</span> */}
                      </h2>
                      <div className="custom-title-border-left my-4" />
                    </div>
                  </div>
                </div>
              </div>

              {this.props.loaderType === 'tableLoadOn' ? <div className='m-t-20'>{centerTableLoader()}</div> :
                <div>

                  <div className="container">
                    <div className="row">

                      <div class="col-md-12 studentlist-data-inside">
                        <div class="description">
                          <div class="col-md-12 description-inside py-4 mx-0">
                            <div class="col-md-6 col-lg-2 roll-no">
                              <span class="roll-no-title">Roll No.</span>
                              <br />
                              <label className="text-orange mb-0">{resultData && resultData.studentRoll}</label>
                              <hr className="my-1" />
                              <span class="roll-no-title">Student ID</span>
                              <br />
                              <label className="text-orange">{resultData && resultData.customStudentId}</label>
                            </div>

                            <div class="col-md-6 col-lg-2 student-img mx-0">
                              <div class="img-div">
                                <div class="img-div overlay">
                                  <i class="fas fa-search-plus"></i>
                                </div>
                                <img src={staticImage} width="85px" height="85px" />
                              </div>
                            </div>

                            <div class="col-md-6 col-lg-4">
                              <div class="col-lg-12 student-details">
                                <div className=""><label>Student Name</label>: {resultData && resultData.studentName}</div>
                                <div className=""><label>Father's Name</label>: {resultData && resultData.fatherName}</div>
                                <div className=""><label>Mother's Name</label>: {resultData && resultData.motherName}</div>
                                <div className=""><label>Reg. Mobile No.</label>: {resultData && resultData.mobileNo}</div>
                                <div className=""><label>Exam Name</label>: { /*resultData.studentName*/}</div>
                              </div>
                            </div>
                            <div className="row vertical-border ml-md-1 px-0 d-sm-none d-md-block d-lg-block"></div>
                            <div class="col-md-6 col-lg-4 ml-md-0">
                              <div class="col-lg-12 student-details">
                                <div className=""><label>Section</label>: {resultData && resultData.sectionName}</div>
                                <div className=""><label>Total Marks</label>: {resultData && resultData.obtainedMarks}</div>
                                <div className=""><label>GPA</label>: {resultData && resultData.gpa}</div>
                                <div className=""><label>Grade</label>: {resultData && resultData.grade}</div>
                                <div className=""><label>Academic Year</label>: {this.props.academicYear}</div>
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
                                {column}
                                {/* <th>CT</th>
                            <th>CP</th>
                            <th>WR</th>
                            <th>PR</th> */}
                                <th>Full Marks</th>
                                <th>Obtained Marks</th>
                                <th>GPA</th>
                                <th>Grade</th>
                                {/* <th className="text-center">Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {
                                resultData ?
                                  resultData.examMarks && resultData.examMarks.map((item, index) =>
                                    <tr>
                                      <td>{item.subjectName}</td>
                                      <td>{item.fullMarks}</td>

                                      {
                                        shortCodeTitle.map((item2, index) =>
                                          <td>{
                                            item[item2]
                                          }</td>
                                        )
                                      }
                                      {/* <td>{item.shortCode1}</td>
                                  <td>{item.shortCode2}</td>
                                  <td>{item.shortCode4}</td> */}
                                      <td>{item.fullMarks}</td>
                                      <td>{item.obtainedMarks}</td>
                                      <td>{item.gpa}</td>
                                      <td>{item.grade}</td>

                                    </tr>
                                  )
                                  : <tr><td colSpan='9'>No Data Found</td></tr>
                              }

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

                </div>}
            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center mb-2" />
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
  examConfigId: makeSelectExamConfigId(),
  resultData: makeSelectIndividualResultData(),
  loaderType: makeSelectExamLoaderType(),

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
