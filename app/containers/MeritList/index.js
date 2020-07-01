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
import makeSelectMeritList, { makeSelectMeritListData, makeSelectSectionList, makeSelectAcademicYear, makeSelecAcademicYearList,  makeSelectExamConfigId,makeSelectClassConfigId, makeSelectExamList
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

/* eslint-disable react/prefer-stateless-function */
export class MeritList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {}

    }
  }

  render() {
    let { errors } = this.state

   let { academicYearList, sectionList, examList, classList, meritList } = this.props;
   console.log('meritList',meritList);
   console.log('props.academicYear',this.props.academicYear);

 
  

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
          menuStepFirst="Home"
          menuStepSenond="Administration"
          menuStepThird="Merit List"
        />

        <section>
          <div className="container-fluid">

            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12 attendance-body-header">
                  <div className="row attendance-body-header-inside">
                    <div className="col-md-12 col-lg-12 form">
                      <Form inline>
                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input
                              type="select"
                              name="year"
                              onChange={this.props.onChangeAcademicYear}
                            >
                              <option value=''>Select Academic Year</option>
                              {academicYearList && academicYearList.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}

                            </Input>
                          </FormGroup>
                          <div className="error-message"> {errors['year']}</div>

                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="section" onChange={this.props.onChangeSection}
>
                            <option value=''>Select a Section</option>
                                {
                                  sectionList && sectionList.map((item, index) =>
                                    <option key={item.classConfigId} value={item.classConfigId}>{item.classShiftSection}</option>
                                  )
                                }
                            </Input>
                          </FormGroup>
                          <div className="error-message"> {errors['section']}</div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="examType" onChange={this.props.onChangeExamType}
>
                            <option value=''>Select Exam</option>
                                {examList && examList.map(item => (
                                  <option key={item.examConfigId} value={item.examConfigId}>{item.examObject.name}</option>
                                ))}
                            </Input>
                          </FormGroup>
                          <div className="error-message"> {errors['examType']}</div>

                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup>
                            <Button className="btn explore-btn all-border-radious" onClick={this.props.submitSearch}>Search</Button>
                          </FormGroup>
                        </div>
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
                      <span>Total Student Found<span className="text-orange">(1212)</span></span>
                      <span className="print text-orange"><i className="fas fa-print"></i> Print Result</span>
                    </h2>
                    <div className="custom-title-border-left" />
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
                                  <td>{item.meritPosition}</td>
                                  <td><center className="attendance failed"><img src={donorImage} /></center></td>
                                  <td>{item.studentId}</td>
                                  <td>{item.studentRoll}</td>
                                  <td>{item.studentName}</td>
                                  <td>{item.totalMarks}</td>
                                  <td>{item.gradingPoint}</td>
                                  <td>{item.letterGrade}</td>
                                </tr>
                              )

                              : <tr><td colSpan='5'>No Data Found</td></tr>
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
