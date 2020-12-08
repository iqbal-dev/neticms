/**
 *
 * ExamRoutine
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
import makeSelectExamRoutine, {
  makeSelectClassId,
  makeSelectExamRoutineListData,
  makeSelectClassList,
  makeSelectDataTableLoader,
  makeSelectClassLoader, makeSelectExamTypeLoader, makeSelectExamSessionLoader, makeSelectExamSessionList, makeSelectExamTypeList, makeSelectExamTypeId, makeSelectExamSessionId
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { AppLayout } from '../AppLayout';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { submitSearchHandle, setClassId, setExamTypeId, setExamSessionId } from './actions';
import { centerTableLoader, inputFieldLoader } from '../../utils/contentLoader';

let showingResultValue = '';

export class ExamRoutine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChangeClass = (e) => {
    this.props.onChangeClassId(e);
    this.clearErrorMsg(e.target.name);
  }
  // onChangeExamTypeId
  onChangeExamType = (e) => {
    this.props.onChangeExamTypeId(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeExamSession = (e) => {
    this.props.onChangeExamSessionId(e);
    this.clearErrorMsg(e.target.name);
  }

  clearErrorMsg = (name) => {
    let { errors } = this.state;
    errors[name] = ''
    this.setState({ errors })
  }

  emptyFieldCheck() {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (!this.props.classId) {
      fieldIsEmpty = true;
      errors["section"] = "section can't left empty.";
    }

    this.setState({ errors });
    return fieldIsEmpty;
  }

  onSearch = (e) => {
    e.preventDefault();
    if (true) {
      this.getClassName();
      this.props.onSubmitSearch();
    }
  }

  getClassName = () => {

    let className = '';
    let examName = '';
    let sessionName = '';

    if (this.props.classList && this.props.classList.length) {
      this.props.classList.filter(item => {
        if (item.id == this.props.classId) { className = item.name }
      })
    }

    if (this.props.examTypeList && this.props.examTypeList.length) {
      this.props.examTypeList.filter(item => {
        if (item.examConfigId == this.props.examConfigId) { examName = item.examObject.name }
      })
    }

    if (this.props.examSessionList && this.props.examSessionList.length) {
      this.props.examSessionList.filter(item => {
        if (item.sessionId == this.props.examSessionId) { sessionName = item.sessionName }
      })
    }

    // console.log('className', className, 'examName', examName, 'sessionName', sessionName);

    showingResultValue = className.concat(" - ").concat(examName).concat(" - ").concat(sessionName);

    return showingResultValue;

  }

  render() {

    let { errors } = this.state;
    let { classList, examTypeList, examSessionList, examRoutineListData, classLoader, examSessionLoader } = this.props;

    // console.log("classList", classList);
    // console.log("examTypeList-index", examTypeList);
    // console.log("examSessionLoader", examSessionLoader);

    let filterTable = (event, index) => {
      var filter = event.target.value.toUpperCase();
      var rows = document.querySelector("#myTable tbody").rows;
      for (var i = 0; i < rows.length; i++) {
        var firstCol = rows[i].cells[1].textContent.toUpperCase();
        var secondCol = rows[i].cells[3].textContent.toUpperCase();
        var thirdCol = rows[i].cells[4].textContent.toUpperCase();
        if ((firstCol.indexOf(filter) > -1 && index == 0)
          || (secondCol.indexOf(filter) > -1 && index == 1)
          || (thirdCol.indexOf(filter) > -1 && index == 2)) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }

    document.querySelectorAll('input.filter-datatable').forEach((el, idx) => {
      el.addEventListener('keyup', (e) => {
        filterTable(e, idx);
      }, false);
    });

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>ExamRoutine</title>
            <meta name="description" content="Description of ExamRoutine" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Exam Routine"
            menuStepFirst="Academic Info"
            menuStepSenond="Routine"
            menuStepThird="Exam Routine"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside py-4 no-box-shadow bg-gray-light">

                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          <div className="col-md-6 col-lg-3">
                            {this.props.classLoader ? inputFieldLoader() :
                              <FormGroup className="custom-dropdown">
                                <Input className=" bg-white" type="select" name="examType" onChange={this.onChangeClass}>
                                  <option value=''>Select Class</option>
                                  {classList && classList.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                  ))}
                                </Input>
                                <span className="error-message"> {errors['class']}</span>
                              </FormGroup>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            {this.props.examTypeLoader ? inputFieldLoader() :
                              <FormGroup className="custom-dropdown">
                                <Input className=" bg-white" type="select" name="examType" onChange={this.onChangeExamType}>
                                  <option value=''>Select Exam Type</option>
                                  {examTypeList && examTypeList.map(item => (
                                    <option key={item.examConfigId} value={item.examConfigId}>{item.examObject.name}</option>
                                  ))}
                                </Input>
                                <span className="error-message"> {errors['examType']}</span>
                              </FormGroup>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            {this.props.examSessionLoader ? inputFieldLoader() :
                              <FormGroup className="custom-dropdown">
                                <Input className=" bg-white" type="select" name="examType" onChange={this.onChangeExamSession}>
                                  <option value=''>Select Session</option>
                                  {examSessionList && examSessionList.map(item => (
                                    <option key={item.sessionId} value={item.sessionId}>{item.sessionName}</option>
                                  ))}
                                </Input>
                                <span className="error-message"> {errors['examType']}</span>
                              </FormGroup>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup>
                              <Button
                                className="btn explore-btn all-border-radious"
                                onClick={this.onSearch}
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
                    <div className="page-inner-title with-print mb-4">
                      <h2 className="bg-gray-light px-4 py-2">
                        <span className="font-18">
                          Showing Result of <span className="ml-1 text-orange">{showingResultValue}</span>
                        </span>
                        <span>
                          <span className="font-18">Total found:<span className="text-orange mx-2">({examRoutineListData && examRoutineListData.length ? examRoutineListData.length : 0})</span> </span>
                          {/* <Button className="btn btn-success bg-primary-color-dark"><i className="fas fa-download"></i> Download</Button> */}
                        </span>
                      </h2>
                      {/* <div className="custom-title-border-left my-4" /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {this.props.dataTableLoader ? centerTableLoader() :
                      <div className="table-responsive custom-table">
                        <Table striped className="class-routine-table exam" id="myTable">
                          <thead>
                            <tr>
                              <th className="">Date</th>
                              <th className="">Day
                                <Input
                                  type="text"
                                  name="studentID"
                                  placeholder="Write a day"
                                  className="filter-datatable"
                                // onChange={this.onChangeStudentId}
                                />
                              </th>
                              <th className="">Time</th>
                              <th className="">Room
                                <Input
                                  type="text"
                                  name="studentID"
                                  placeholder="Write a room no."
                                  className="filter-datatable"
                                // onChange={this.onChangeStudentId}
                                />
                              </th>
                              <th className="">Subject
                                <Input
                                  type="text"
                                  name="studentID"
                                  placeholder="Write a subject name"
                                  className="filter-datatable"
                                // onChange={this.onChangeStudentId}
                                />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              examRoutineListData && examRoutineListData.length ? examRoutineListData.map((item, index) =>
                                <tr>
                                  <td>{item.examDate}</td>
                                  <td>{item.examDay}</td>
                                  <td>{item.examTime}</td>
                                  <td>{item.roomNo}</td>
                                  <td>{item.subjectName}</td>
                                </tr>
                              )
                                : <tr><td colSpan='5'>No Data Found</td></tr>
                            }

                            {/* <tr>
                              <td>05/09/2020</td>
                              <td>Saturday</td>
                              <td>09.00 AM - 10.00 AM</td>
                              <td>210</td>
                              <td>English</td>
                            </tr>

                            <tr>
                              <td>05/09/2020</td>
                              <td>Saturday</td>
                              <td>09.00 AM - 10.00 AM</td>
                              <td>210</td>
                              <td>English</td>
                            </tr>

                            <tr>
                              <td>05/09/2020</td>
                              <td>Saturday</td>
                              <td>09.00 AM - 10.00 AM</td>
                              <td>210</td>
                              <td>English</td>
                            </tr> */}

                          </tbody>
                        </Table>
                      </div>
                    }
                  </div>
                </div>
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

ExamRoutine.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  examRoutine: makeSelectExamRoutine(),

  classList: makeSelectClassList(),
  classId: makeSelectClassId(),

  examTypeList: makeSelectExamTypeList(),
  examConfigId: makeSelectExamTypeId(),

  examSessionList: makeSelectExamSessionList(),
  examSessionId: makeSelectExamSessionId(),

  examRoutineListData: makeSelectExamRoutineListData(),

  dataTableLoader: makeSelectDataTableLoader(),
  classLoader: makeSelectClassLoader(),
  examTypeLoader: makeSelectExamTypeLoader(),
  examSessionLoader: makeSelectExamSessionLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeClassId: (evt) => { dispatch(setClassId(evt.target.value)) },
    onChangeExamTypeId: (evt) => { dispatch(setExamTypeId(evt.target.value)) },
    onChangeExamSessionId: (evt) => { dispatch(setExamSessionId(evt.target.value)) },
    onSubmitSearch: () => { dispatch(submitSearchHandle()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'examRoutine', reducer });
const withSaga = injectSaga({ key: 'examRoutine', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExamRoutine);
