/**
 *
 * StudentInfo
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
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import makeSelectStudentInfo, { makeSelectClassNameDropDownINfo, makeSelectGroupNameDropDownINfo, makeSelectGroupList, makeStudentInfoResult, makeSelectClassNameSelected}  from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import donorImage from '../../assets/img/donor-image.png';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';
import { classNameListDropDown, classNameSelectedMethod, classGroupListDropDown, submitSearchButton, groupNameSelectedMethod } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class StudentInfo extends React.Component {
  constructor(props) {
    super(props);

  }






  render() {


    let classNameDropDown = this.props.classNamesDropDown;
    let classGroupDropDown = this.props.groupList;
    let studentInfiList = this.props.searchResult;
    console.log('classNameSelected', this.props.classNameSelected);
    
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>StudentInfo</title>
            <meta name="description" content="Description of StudentInfo" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Student's Info"
            menuStepFirst="Home"
            menuStepSenond="Administration"
            menuStepThird="Student's Info"
          />

          <section>
            <div className="container-fluid">
              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12 attendance-body-header">
                    <div className="row attendance-body-header-inside">
                      {/* <div className="row"> */}
                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          {/* <div className="row"> */}
                          <div className="col-md-12 col-lg-4">
                            <FormGroup className="custom-dropdown">
                              <Input
                                type="select"
                                name="class"
                                onChange={this.props.onChangeClassName}
                                // value={ this.state.class }
                              >
                                <option value="">Choose a class</option>
                                {
                                  classNameDropDown && classNameDropDown.map(item => {
                                    return(
                                      <option value={item.classConfigId}>{item.classShiftSection}</option>
                                    )
                                  })
                                }
                              </Input>
                            </FormGroup>
                            <div className="error-message"> </div>
                          </div>

                          <div className="col-md-12 col-lg-5">
                            <FormGroup className="custom-dropdown with-search-btn">
                              <Input
                                type="select"
                                name="group"
                                onChange={this.props.onChangeGroupName}
                              >
                                <option value="">Select a group</option>
                                {
                                  classGroupDropDown && classGroupDropDown.map(item => {
                                    return(
                                      <option value={item.groupConfigId}>{item.groupObject.name}</option>
                                    )
                                  })
                                }
                              </Input>

                              <Button
                                className="btn explore-btn"
                                onClick={this.props.submitSearch}
                              >
                                <i className="fas fa-chevron-circle-right" />{' '}
                                Search
                              </Button>
                            </FormGroup>
                            <div className="error-message"> </div>
                          </div>

                          <div className="col-md-12 col-lg-1 d-sm-none d-md-none d-lg-block">
                            <div className="vertical-border" />
                          </div>

                          <div className="col-md-12 col-lg-2">
                            <FormGroup className="">
                              <Button
                                className="btn explore-btn all-border-radious download-btn-dark"
                                // onClick={ this.onSearchStudentInfo}
                              >
                                <i className="fas fa-download" /> Download
                              </Button>
                            </FormGroup>
                          </div>

                          {/* </div> */}
                        </Form>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="offset-md-1 col-md-10">
                    <div className="custom-title-border-center" />
                  </div>
                </div>
              </div>

              <div className="container info-header-title">
                <div className="row">
                  <h5 className="col-lg-12">
                    Showing result for{' '}
                    <span className="text-orange">
                      Class Seven, Group - A (56 Students)
                    </span>
                  </h5>
                </div>
              </div>

              <div className="container">

                <div className="row">
                  <div className="col-md-12 studentlist-data-inside">
                    <div className="description">
                      <div className="col-md-12 description-inside py-4">
                        <div className="col-md-6 col-lg-2 roll-no">
                          <span className="roll-no-title">Roll No.</span>
                          <br />
                          <label className="text-orange">123</label>
                        </div>

                        <div className="col-md-6 col-lg-2 student-img">
                          <div className="img-div">
                            <div className="img-div overlay">
                              <i className="fas fa-search-plus" />
                            </div>
                            <img src={donorImage} width="85px" height="85px" />
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-5">
                          <div className="col-lg-12 student-details">
                            <div className="">
                              <label>Student Name</label>: Shahrear Kabir
                            </div>
                            <div className="">
                              <label>Father's Name</label>: Father's Name
                            </div>
                            <div className="">
                              <label>Mother's Name</label>: Mother's Name
                            </div>
                            <div className="">
                              <label>Student Religion</label>: Islam
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-1 student-gender">
                          <i className="fas fa-male" />
                        </div>
                        <div className="col-md-6 col-lg-2 student-custom-id">
                          <span className="roll-no-title">Student ID</span>
                          <br />
                          <label className="text-orange">321256</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

StudentInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classNamesDropDown: PropTypes.any,
  groupList: PropTypes.any,
  submitSearch: PropTypes.func,
  searchResult: PropTypes.any,
  classNameSelected: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  studentInfo: makeSelectStudentInfo(),
  classNamesDropDown: makeSelectClassNameDropDownINfo(),
  classNameSelected: makeSelectClassNameSelected(),
  groupList: makeSelectGroupList(),
  searchResult: makeStudentInfoResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeClassName: (evt) => { dispatch(classNameSelectedMethod(evt.target.value)) },
    onChangeGroupName: (evt) => { dispatch(groupNameSelectedMethod(evt.target.value)) },
    submitSearch: () => { dispatch(submitSearchButton()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'studentInfo', reducer });
const withSaga = injectSaga({ key: 'studentInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentInfo);
