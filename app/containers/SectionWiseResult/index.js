/**
 *
 * SectionWiseResult
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
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import makeSelectSectionWiseResult, {
  makeSelectSectionWiseResultListData, makeSelectSectionList, makeSelectAcademicYear, makeSelecAcademicYearList,
  makeSelectExamConfigId, makeSelectClassConfigId, makeSelectExamList, makeSelectSectionWiseResultLoaderType
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import { AppLayout } from '../AppLayout';
import { setAcademicYear, submitSearchButton, makeChangeSection, makeChangeExamType } from './actions';
import { centerTableLoader, inputFieldLoaderLarge } from '../../utils/contentLoader';

let sectionWiseResultChart = [];

export class SectionWiseResult extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

  onSubmitSearch = (e) => {

    e.preventDefault();
    if (!this.emptyFieldCheck()) {
      this.props.submitSearch();
    }
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

  render() {

    let { errors } = this.state
    let { academicYearList, sectionList, examList, classList, sectionWiseResultList } = this.props;

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>SectionWiseResult</title>
            <meta name="description" content="Description of SectionWiseResult" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Section Wise Result"
            menuStepFirst="Result Info"
            menuStepSenond="Semester Exam"
            menuStepThird="Section Wise"
          />

          <section>
            <div className="container-fluid">
              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside">
                      <div className="col-md-6 col-lg-3">
                        {sectionWiseResultList ?
                          <Chart
                            width="200px"
                            height="200px"
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ['Active', 'count'],
                              ['Total Passed', sectionWiseResultList.filter(b => b.passFailStatus === "Passed").length],
                              ['Total Failed', sectionWiseResultList.filter(b => b.passFailStatus === "Failed").length],
                            ]}
                            options={{
                              chartArea: {
                                left: 10,
                                top: 10,
                                right: 10,
                                bottom: 10,
                              },
                              backgroundColor: 'transparent',
                              legend: 'none',
                              slices: {
                                0: { color: '#1dbc60' },
                                1: { color: '#ff0000' },
                                2: { color: '#002749' },
                              },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                          />
                          :
                          ''}
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="legend-with-percent present">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Passed</span>
                          <span className="percent">{sectionWiseResultList && sectionWiseResultList.length ? `(${+((sectionWiseResultList.filter(b => b.passFailStatus === "Passed").length / sectionWiseResultList.length) * 100).toFixed(2)} %)` : 0}
                          </span>

                        </div>

                        <div className="legend-with-percent absent">
                          {/* <span className="symbol-squire"></span> */}
                          <span className="title">Failed</span>
                          <span className="percent">{sectionWiseResultList && sectionWiseResultList.length ? `(${+((sectionWiseResultList.filter(b => b.passFailStatus === "Failed").length / sectionWiseResultList.length) * 100).toFixed(2)} %)` : 0}</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 form">
                        <Form inline>

                          <FormGroup className="custom-dropdown">
                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoaderLarge() :

                              <Input
                                type="select"
                                name="year"
                                onChange={this.onChangeAcYear}
                              >
                                <option value=''>Select Academic Year</option>
                                {academicYearList && academicYearList.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}
                              </Input>

                            }
                          </FormGroup>
                          <div className="error-message"> {errors['year']}</div>

                          <FormGroup className="custom-dropdown">
                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoaderLarge() :

                              <Input type="select" name="section" onChange={this.onChangeSection}
                              >
                                <option value=''>Select a Section</option>
                                {
                                  sectionList && sectionList.map((item, index) =>
                                    <option key={item.classConfigId} value={item.classConfigId}>{item.classShiftSection}</option>
                                  )
                                }
                              </Input>
                            }
                          </FormGroup>
                          <div className="error-message"> {errors['section']}</div>

                          <FormGroup className="custom-dropdown">
                            {this.props.loaderType === 'dependendLoadOn' ? inputFieldLoaderLarge() :
                              <Input type="select" name="examType" onChange={this.onChangeExam}
                              >
                                <option value=''>Select Exam</option>
                                {examList && examList.map(item => (
                                  <option key={item.examConfigId} value={item.examConfigId}>{item.examObject.name}</option>
                                ))}
                              </Input>
                            }
                          </FormGroup>
                          <div className="error-message"> {errors['examType']}</div>

                          <Button className="btn explore-btn full-width all-border-radious" onClick={this.onSubmitSearch}>
                            <i class="fas fa-chevron-circle-right mr-3" ></i> Search
                        </Button>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title with-print">
                      <h2>
                        <span>Total Student Found <span className="text-orange">({sectionWiseResultList && sectionWiseResultList.length ? sectionWiseResultList.length : 0})</span></span>
                        {/* <span className="print text-orange"><i className="fas fa-print text-secondary"></i> Print Result</span> */}
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
                              {/* <th>Photo</th> */}
                              <th>Student's ID.</th>
                              <th>Roll No.</th>
                              <th>Student's Name</th>
                              <th>Total Marks</th>
                              <th>GPA</th>
                              <th>Grade</th>
                              {/* <th className="text-center">Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {
                              sectionWiseResultList ?
                                sectionWiseResultList.map((item, index) =>
                                  <tr>
                                    {/* <td><center className="attendance failed"><img src={donorImage} /></center></td> */}
                                    <td>{item.customStudentId}</td>
                                    <td>{item.studentRoll}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.totalMarks}</td>
                                    <td>{item.gradingPoint}</td>
                                    <td>{item.letterGrade}</td>
                                  </tr>
                                )

                                : <tr><td colSpan='7'>No Data Found</td></tr>
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
                <div className="custom-title-border-center" />
              </div>
            </div>
          </div>
        </AppLayout>
      </div>
    );
  }
}

SectionWiseResult.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func

};

const mapStateToProps = createStructuredSelector({
  sectionWiseResult: makeSelectSectionWiseResult(),
  sectionWiseResultList: makeSelectSectionWiseResultListData(),
  sectionList: makeSelectSectionList(),
  academicYearList: makeSelecAcademicYearList(),
  examList: makeSelectExamList(),

  academicYear: makeSelectAcademicYear(),
  classConfigId: makeSelectClassConfigId(),
  examConfigId: makeSelectExamConfigId(),
  loaderType: makeSelectSectionWiseResultLoaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeAcademicYear: (evt) => { dispatch(setAcademicYear(evt.target.value)) },
    onChangeSection: (evt) => { dispatch(makeChangeSection(evt.target.value)) },
    onChangeExamType: (evt) => { dispatch(makeChangeExamType(evt.target.value)) },

    submitSearch: () => { dispatch(submitSearchButton()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'sectionWiseResult', reducer });
const withSaga = injectSaga({ key: 'sectionWiseResult', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SectionWiseResult);
