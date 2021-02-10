/**
 *
 * FailList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import { AppLayout } from '../AppLayout';
import { getDownloadTablePDF } from '../../utils/generatePdf';

import {
  makeChangeAcademicYear,
  makeChangeSection,
  makeChangeExamType,
  submitSearchHandle
} from './actions'

import {
  makeSelectFailListData,
  makeSelectAcademicYearList,
  makeSelectSectionList,
  makeSelectExamList,
  makeSelectClassConfigId,
  makeSelectAcademicYear,
  makeSelectExamConfigId,
  makeSelectFailListLoaderType
} from './selectors';
import { makeSelectGlobalSectionList } from '../HomePage/selectors';
import { centerTableLoader, inputFieldLoader } from '../../utils/contentLoader';

let sectionName = '';
let examName = '';

export class FailList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      year: "",
      examType: "",
      section: "",
      errors: {}
    }
  }

  onChangeAcYear = (e) => {
    this.props.onChangeAcademicYear(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeSection = (e) => {
    this.props.onChangeSection(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeExam = (e) => {
    this.props.onChangeExamType(e);
    this.clearErrorMsg(e.target.name);
  }

  emptyFieldCheck() {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (this.props.academicYear === '' || this.props.academicYear === null) {
      fieldIsEmpty = true;
      errors["year"] = "Academic Year can't left empty.";
    }

    if (this.props.classConfigId === '' || this.props.classConfigId === null) {
      fieldIsEmpty = true;
      errors["section"] = "section can't left empty.";
    }
    if (this.props.examConfigId === '' || this.props.examConfigId === null) {
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

  onSearchStudentInfo = (e) => {
    e.preventDefault();
    if (!this.emptyFieldCheck()) {
      this.props.onSubmitSearch();
    }
  }

  onDownloadPdf = () => {

    let pdfColumns = [
      { title: "Photo", dataKey: "photo" },
      { title: "Name", dataKey: "studentName" },
      { title: "Roll No.", dataKey: "studentRoll" },
      { title: "Student ID", dataKey: "customStudentId" },
      { title: "Total Marks", dataKey: "totalMarks" },
      { title: "Failed Subject", dataKey: "numOfFailedSubjects" },
    ]
    getDownloadTablePDF("Fail List of " + sectionName + '  ' + examName + ' ' + this.props.academicYear, pdfColumns, this.props.failList);

  }

  render() {

    let { errors } = this.state;
    let { academicYearList, sectionList, examList, failList } = this.props;

    if (sectionList && sectionList.length) {
      sectionList.filter(item => {
        if (item.classConfigId == this.props.classConfigId) { sectionName = item.classShiftSection }
      })
    }

    if (examList && examList.length) {
      examList.filter(item => {
        if (item.examConfigId == this.props.examConfigId) { examName = item.examObject.name }
      })
    }

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>FailList</title>
            <meta name="description" content="Description of FailList" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Fail List"
            menuStepFirst="Result Info"
            menuStepSenond="Semester Exam"
            menuStepThird="Fail List"
          />

          <section>
            <div className="container-fluid">

              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 attendance-body-header">
                    <div className="row attendance-body-header-inside py-4">
                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          <div className="col-md-6 col-lg-3">
                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoader() : <div>

                              <FormGroup className="custom-dropdown">
                                <Input
                                  type="select"
                                  name="year"
                                  onChange={this.onChangeAcYear}
                                >
                                  <option value=''>Select Academic Year</option>
                                  {academicYearList && academicYearList.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}
                                </Input>
                                <span className="error-message"> {errors['year']}</span>
                              </FormGroup>
                            </div>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoader() : <div>

                              <FormGroup className="custom-dropdown">
                                <Input
                                  type="select"
                                  name="section"
                                  onChange={this.onChangeSection}
                                >
                                  <option value=''>Select a Section</option>
                                  {
                                    sectionList && sectionList.map((item, index) =>
                                      <option key={item.classConfigId} value={item.classConfigId}>{item.classShiftSection}</option>
                                    )
                                  }
                                </Input>
                                <span className="error-message"> {errors['section']}</span>
                              </FormGroup>
                            </div>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            {this.props.loaderType === 'dependendLoadOn' ? inputFieldLoader() : <div>

                              <FormGroup className="custom-dropdown">
                                <Input
                                  type="select"
                                  name="examType"
                                  onChange={this.onChangeExam}
                                >
                                  <option value=''>Select Exam</option>
                                  {examList && examList.map(item => (
                                    <option key={item.examConfigId} value={item.examConfigId}>{item.examObject.name}</option>
                                  ))}
                                </Input>
                                <span className="error-message"> {errors['examType']}</span>
                              </FormGroup>

                            </div>
                            }

                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup className="mb-0">
                              <Button
                                className="btn explore-btn all-border-radious"
                                onClick={this.onSearchStudentInfo}
                              >
                                <i class="fas fa-chevron-circle-right mr-3" ></i> Search
                            </Button>
                            </FormGroup>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title with-print">
                      <h2>
                        <span>Total Failed Student Found<span className="text-orange">({failList && failList.length ? failList.length : 0})</span></span>
                        {/* <span className="print text-orange cursor-pointer" onClick={this.onDownloadPdf}><i className="fas fa-print"></i> Print Result</span> */}
                      </h2>
                      <div className="custom-title-border-left" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <di className="col-md-12">

                    {this.props.loaderType === 'tableLoadOn' ? centerTableLoader() :

                      <div className="table-responsive custom-table">
                        <Table
                          responsive
                          className="section-wise-attendance-table attendance-symbol"
                        >
                          <thead>
                            <tr>
                              <th>Photo</th>
                              <th>Student ID</th>
                              <th>Roll No.</th>
                              <th>Student Name</th>
                              <th>Total Marks</th>
                              <th>Failed Subject</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              failList ?
                                failList.map((item, index) =>
                                  <tr>
                                    <td><center className="attendance failed">{item.photo ? <img src={"data:image/*;base64," + item.photo} /> : <img src={donorImage} />}</center></td>
                                    <td className="text-center">{item.customStudentId}</td>
                                    <td>{item.studentRoll}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.totalMarks}</td>
                                    <td>{item.numOfFailedSubjects}</td>
                                  </tr>
                                )

                                : <tr><td colSpan='6'>No Data Found</td></tr>
                            }

                          </tbody>
                        </Table>
                      </div>
                    }
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
                <div className="custom-title-border-center mb-2" />
              </div>
            </div>
          </div>

        </AppLayout>
      </div>
    );
  }
}

FailList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func,
  failList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  failList: makeSelectFailListData(),
  academicYearList: makeSelectAcademicYearList(),
  sectionList: makeSelectSectionList(),
  examList: makeSelectExamList(),

  academicYear: makeSelectAcademicYear(),
  classConfigId: makeSelectClassConfigId(),
  examConfigId: makeSelectExamConfigId(),
  globalSections: makeSelectGlobalSectionList(),
  loaderType: makeSelectFailListLoaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeAcademicYear: (evt) => { dispatch(makeChangeAcademicYear(evt.target.value)) },
    onChangeSection: (evt) => { dispatch(makeChangeSection(evt.target.value)) },
    onChangeExamType: (evt) => { dispatch(makeChangeExamType(evt.target.value)) },
    onSubmitSearch: () => { dispatch(submitSearchHandle()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'failList', reducer });
const withSaga = injectSaga({ key: 'failList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FailList);
