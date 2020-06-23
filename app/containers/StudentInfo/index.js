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
import makeSelectStudentInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import donorImage from '../../assets/img/donor-image.png';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';

/* eslint-disable react/prefer-stateless-function */
export class StudentInfo extends React.Component {
  render() {
    return (
      <div>
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
                                <Input type="select" name="academic-year">
                                  <option>Select Academic Year</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </Input>
                              </FormGroup>
                            </div>

                            <div className="col-md-12 col-lg-5">
                              <FormGroup className="custom-dropdown with-search-btn">
                                <Input type="select" name="academic-year">
                                  <option>Select Academic Year</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </Input>
                              
                                <Button className="btn explore-btn">
                                  <i class="fas fa-chevron-circle-right"></i> Search
                                </Button>
                              </FormGroup>
                            </div>

                            <div className="col-md-12 col-lg-1 d-sm-none d-md-none d-lg-block">
                              <div className="vertical-border"></div>
                            </div>

                            <div className="col-md-12 col-lg-2">
                              <FormGroup className="">
                                <Button className="btn explore-btn all-border-radious download-btn-dark">
                                <i class="fas fa-download"></i> Download
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
                  Showing result for  <span className="text-orange">Class Seven, Group - A (56 Students)</span>
                </h5>
              </div>
            </div>

            <div className="container">
              <div className="row">

                  <div class="col-md-12 studentlist-data-inside">
                    <div class="description">
                      <div class="col-md-12 description-inside py-4">
                        <div class="col-md-6 col-lg-2 roll-no">
                          <span class="roll-no-title">Roll No.</span>
                          <br />
                          <label className="text-orange">123</label>
                        </div>

                        <div class="col-md-6 col-lg-2 student-img">
                          <div class="img-div">
                            <div class="img-div overlay">
                              <i class="fas fa-search-plus"></i>
                            </div>
                            <img src={donorImage} width="85px" height="85px" />
                          </div>
                        </div>

                        <div class="col-md-12 col-lg-5">
                          <div class="col-lg-12 student-details">
                            <div className=""><label>Student Name</label>: Shahrear Kabir</div>
                            <div className=""><label>Father's Name</label>: Father's Name</div>
                            <div className=""><label>Mother's Name</label>: Mother's Name</div>
                            <div className=""><label>Student Religion</label>: Islam</div>
                          </div>
                        </div>


                        <div class="col-md-6 col-lg-1 student-gender">
                          <i class="fas fa-male" />
                        </div>
                        <div class="col-md-6 col-lg-2 student-custom-id">
                          <span class="roll-no-title">Student ID</span>
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

      </div>
    );
  }
}

StudentInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentInfo: makeSelectStudentInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
