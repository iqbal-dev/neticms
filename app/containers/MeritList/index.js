/**
 *
 * MeritList
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
import makeSelectMeritList, {
  makeSelectMeritListData, makeSelectSectionList, makeSelectAcademicYear, makeSelecAcademicYearList, makeSelectExamConfigId, makeSelectClassConfigId, makeSelectExamList, makeSelectMeritListLoaderType
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import donorImage from '../../assets/img/donor-image.png';
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { setAcademicYear, submitSearchButton, makeChangeSection, makeChangeExamType } from './actions';
import { AppLayout } from '../AppLayout';
import { centerTableLoader, inputFieldLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */
export class MeritList extends React.Component {

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

    let { errors } = this.state;
    let { academicYearList, sectionList, examList, classList, meritList } = this.props;

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>MeritList</title>
            <meta name="description" content="Description of MeritList" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}
          <BreadcrumComponent
            pageTitle="Merit List"
            menuStepFirst="Result Info"
            menuStepSenond="Semester Exam"
            menuStepThird="Merit List"
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
                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoader() :
                              <div>
                                <FormGroup className="custom-dropdown">
                                  <Input
                                    type="select"
                                    name="year"
                                    onChange={(e) => this.onChangeAcYear(e)}
                                  >
                                    <option value=''>Select Academic Year</option>
                                    {academicYearList && academicYearList.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}

                                  </Input>
                                  <div className="error-message"> {errors['year']}</div>
                                </FormGroup>
                              </div>
                            }

                          </div>

                          <div className="col-md-6 col-lg-3">

                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoader() : <div>
                              <FormGroup className="custom-dropdown">
                                <Input type="select" name="section" onChange={this.onChangeSection}
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
                                <Input type="select" name="examType" onChange={this.onChangeExam}
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
                            <FormGroup>
                              <Button
                                className="btn explore-btn all-border-radious"
                                onClick={this.onSubmitSearch}>
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
                        <span>Total Student Found <span className="text-orange">({meritList && meritList.length ? meritList.length : 0})</span></span>
                        {/* <span className="print text-orange"><i className="fas fa-print"></i> Print Result</span> */}
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
                              <th>Merit Position</th>
                              <th>Photo</th>
                              <th>Student ID</th>
                              <th>Roll No.</th>
                              <th>Student Name</th>
                              <th>Total Marks</th>
                              <th>GPA</th>
                              <th>Grade</th>

                            </tr>
                          </thead>
                          <tbody>

                            {
                              meritList ?
                                meritList.map((item, index) =>
                                  <tr>
                                    <td style={{ textAlign: 'center' }}>{item.sectionPosition}</td>
                                    <td><center className="attendance failed">{item.photo ? <img src={"data:image/*;base64," + item.photo} /> : <img src={donorImage} />}</center></td>
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
                <div className="custom-title-border-center mb-2" />
              </div>
            </div>
          </div>
        </AppLayout>
      </div>
    );
  }
}

MeritList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  meritList: makeSelectMeritListData(),
  sectionList: makeSelectSectionList(),
  academicYearList: makeSelecAcademicYearList(),
  examList: makeSelectExamList(),

  academicYear: makeSelectAcademicYear(),
  classConfigId: makeSelectClassConfigId(),
  examConfigId: makeSelectExamConfigId(),
  loaderType: makeSelectMeritListLoaderType(),

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

const withReducer = injectReducer({ key: 'meritList', reducer });
const withSaga = injectSaga({ key: 'meritList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MeritList);
