/**
 *
 * OnlineClassRoutine
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

import { AppLayout } from '../AppLayout';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  makeSelectClassList,
  makeSelectClassId,
  makeSelectGroupList,
  makeSelectGroupId,
  makeSelectDate,
  makeSelectOnlineClassRoutineList,
  makeSelectLoader
} from './selectors';
import { setClassConfigId, setGroupId, setDate, submitSearch } from './actions';
import { inputFieldLoader, centerTableLoader } from '../../utils/contentLoader';

let sectionName = '';
export class OnlineClassRoutine extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
    }
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  onChangeSection = (e) => {
    this.props.onChangeSection(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeGroup = (e) => {
    this.props.onChangeGroup(e);
    this.clearErrorMsg(e.target.name);
  }

  onChangeDate = (value, name) => {
    this.props.onChangeDate(value);
    this.clearErrorMsg(name);
  }

  onSubmitSearch(e) {

    e.preventDefault();

    if (!this.emptyFieldCheck()) {
      this.getSectionName();
      this.props.submitSearch();
    }

  }

  getSectionName = () => {

    if (this.props.classConfigList && this.props.classConfigList.length) {
      this.props.classConfigList.filter(item => {
        if (item.classConfigId == this.props.classConfigId) { sectionName = item.classShiftSection }
      })
    }
  }

  emptyFieldCheck() {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (this.props.classConfigId === '' || this.props.classConfigId === null) {
      fieldIsEmpty = true;
      errors["section"] = "Class can't left empty.";
    }

    if (this.props.groupId === '' || this.props.groupId === null) {
      fieldIsEmpty = true;
      errors["group"] = "Group can't left empty.";
    }
    if (this.props.date == undefined || this.props.date === null) {
      fieldIsEmpty = true;
      errors["date"] = "Date can't left empty.";
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
    let { classConfigList, groupList, onlineClassRoutineList } = this.props;

    // console.log('classConfig List', this.props.classConfigList);
    // console.log('classConfig Id', this.props.classConfigId);
    // console.log('group List', this.props.groupList);
    // console.log('group Id', this.props.groupId);
    // console.log('date', this.props.date);

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>OnlineClassRoutine</title>
            <meta
              name="description"
              content="Description of OnlineClassRoutine"
            />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Online Class Routine"
            menuStepFirst="More"
            menuStepSenond="Routine"
            menuStepThird="Online Class Routine"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside py-4 no-box-shadow bg-gray-light">

                      <div className="col-md-12 col-lg-12 form">
                        <Form inline method='POST' onSubmit={(e) => this.onSubmitSearch(e)}>
                          <div className="col-md-6 col-lg-3">
                            {this.props.loaderType === 'autoLoadOn' ? inputFieldLoader() :
                              <FormGroup className="custom-dropdown">
                                <Input className="bg-white" type="select" name="section" onChange={this.onChangeSection}>
                                  <option value=''>Select Class</option>
                                  {
                                    classConfigList && classConfigList.map((item) =>
                                      <option key={item.classConfigId} value={item.classConfigId}>{item.classShiftSection}</option>
                                    )
                                  }
                                </Input>
                                <div className="error-message"> {errors['section']}</div>
                              </FormGroup>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            {this.props.loaderType === 'dependendLoadOn' ? inputFieldLoader() :
                              <FormGroup className="custom-dropdown">
                                <Input className=" bg-white" type="select" name="group" onChange={this.onChangeGroup}>
                                  <option value=''>Select Group</option>
                                  {groupList && groupList.map(item => (
                                    <option key={item.groupObject.id} value={item.groupObject.id}>{item.groupObject.name}</option>
                                  ))}
                                </Input>
                                <span className="error-message"> {errors['group']}</span>
                              </FormGroup>
                            }
                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup className="custom-datepicker">
                              <DatePicker
                                placeholderText='select date'
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                isClearable
                                fixedHeight
                                // maxDate={this.props.attendanceToDate}
                                selected={this.props.date}
                                onChange={(e) => this.onChangeDate(e, 'date')}
                                className="dayPicker-custom-input bg-white"
                                name='date'
                              />
                              <span className='error-message'>{errors['date']}</span>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 col-lg-3">
                            <FormGroup>
                              <Button className="btn explore-btn all-border-radious">
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
                          Showing Result of <span className="text-orange">{sectionName}</span>
                        </span>
                        <span>
                          <span className="font-18">Total found:<span className="text-orange mx-2">({
                            onlineClassRoutineList && onlineClassRoutineList.length ? onlineClassRoutineList.length : 0})</span> </span>
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

                    {this.props.loaderType === 'tableLoadOn' ? centerTableLoader() :

                      <div className="table-responsive custom-table">
                        <Table striped className="class-routine-table online">
                          <thead>
                            <tr>
                              <th colSpan="3" className="text-left">Online Class Routine Details</th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              onlineClassRoutineList && onlineClassRoutineList.length ?
                                onlineClassRoutineList.map((item) =>

                                  <tr>
                                    <td><b>{item.startTime + " - " + item.endTime}</b></td>
                                    <td className="pl-5">
                                      <span className="font-16"><b>{item.subjectName}</b></span>
                                      <br />
                                      {item.teacherName}
                                    </td>
                                    <td>
                                      <b>{item.platform}</b>
                                      <br />
                                      <u><a href={item.classLink} target='_blank'>Class Link</a></u>
                                    </td>
                                  </tr>
                                )
                                // <tr>
                                //   <td><b>9.00 AM - 10.00 AM</b></td>
                                //   <td className="pl-5">
                                //     <span className="font-16"><b>English 1st Part</b></span>
                                //     <br />
                                //     MD. Alamin Hossain
                                //   </td>
                                //   <td>
                                //     <b>Google Meet</b>
                                //     <br />
                                //     <u><a href="#">Class Link</a></u>
                                //   </td>
                                // </tr>
                                : <tr><td colSpan='3'>No Data Found</td></tr>
                            }

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

OnlineClassRoutine.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  classConfigList: makeSelectClassList(),
  classConfigId: makeSelectClassId(),
  groupList: makeSelectGroupList(),
  groupId: makeSelectGroupId(),
  date: makeSelectDate(),
  onlineClassRoutineList: makeSelectOnlineClassRoutineList(),
  loaderType: makeSelectLoader()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSection: (evt) => { dispatch(setClassConfigId(evt.target.value)) },
    onChangeGroup: (evt) => { dispatch(setGroupId(evt.target.value)) },
    onChangeDate: (value) => { dispatch(setDate(value)) },

    submitSearch: () => { dispatch(submitSearch()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'onlineClassRoutine', reducer });
const withSaga = injectSaga({ key: 'onlineClassRoutine', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OnlineClassRoutine);
