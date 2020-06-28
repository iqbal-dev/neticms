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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectFailListData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';
import {
  makeSelectClassList
} from '../Header/selectors';
import { AppLayout } from '../AppLayout';

import { 
  makeChangeAcademicYear,
  makeChangeSection,
  makeChangeExamType
} from './actions'

/* eslint-disable react/prefer-stateless-function */
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
    if (!this.state.year) {
      errors["year"] = "Year can't left empty"
      formIsValid = false;
    }

    if (!this.state.examType) {
      errors["examType"] = "Exam type can't left empty"
      formIsValid = false;
    }

    if (!this.state.section) {
      errors["section"] = "Section can't left empty"
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
    let { errors } = this.state
    let { classList, failList } = this.props

    console.log("this.props.failList:::::::::::::::::>>>>>>:::::::::", this.props.failList);
    
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
          menuStepSenond="Semister Exam"
          menuStepThird="Fail List"
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
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                            </Input>
                          </FormGroup>
                          <div className="error-message"> { errors['year'] }</div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input
                              type="select"
                              name="section"
                              onChange={this.props.onChangeSection}
                            >
                              <option value=''>Select a Section</option>
                              
                              {
                                classList && classList.map( (item, index) =>
                                  <option 
                                    key={ index }
                                    value={ item.classConfigId }
                                  >
                                    { item.classShiftSection }
                                  </option>
                                )
                              }
                            </Input>
                          </FormGroup>
                          <div className="error-message"> {errors['section']}</div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input
                              type="select"
                              name="examType"
                              onChange={this.props.onChangeExamType}
                            >
                              <option value=''>Select Exam Type</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                            </Input>
                          </FormGroup>
                          <div className="error-message"> {errors['examType']}</div>
                        </div>

                        

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="mb-0">
                            <Button 
                              className="btn explore-btn all-border-radious"
                              onClick={this.onSearchStudentInfo}
                            >
                              Search
                            </Button>
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
                      <span>Total Failed Student Found<span className="text-orange">(1212)</span></span>
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
                          <th>Photo</th>
                          <th>Student ID</th>
                          <th>Roll No</th>
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
                                <td><center className="attendance failed"><img src={donorImage} /></center></td>
                                <td>{item.customStudentId}</td>
                                <td>{item.studentRoll}</td>
                                <td>{item.studentName}</td>
                                <td>{item.totalMarks}</td>
                                <td>{item.numOfFailedSubjects}</td>
                              </tr>
                            )
                            
                            :<tr><td colSpan='5'>No Data Found</td></tr>
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

FailList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func,
  failList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  classList: makeSelectClassList(),
  failList: makeSelectFailListData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeAcademicYear: (evt) => {
      console.log('dispatch year evt', evt.target.value);
      dispatch(makeChangeAcademicYear(evt.target.value))
    },

    onChangeSection: (evt) => {
      console.log('dispatch section evt', evt.target.value);
      dispatch(makeChangeSection(evt.target.value))
    },

    onChangeExamType: (evt) => {
      console.log('dispatch exam evt', evt.target.value);
      dispatch(makeChangeExamType(evt.target.value))
    },
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
