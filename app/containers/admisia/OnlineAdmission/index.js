/**
 *
 * OnlineAdmission
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
import makeSelectOnlineAdmission, { makeSelectClassConfigList, makeSelectDataTableLoader } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AppLayout } from '../../AppLayout';
import BreadcrumComponent from '../../../components/BreadcrumComponent';
import { centerTableLoader } from '../../../utils/contentLoader';
import { Table } from 'reactstrap';
import { getTotalDaysDifference_TillToday, get_DDMMM_YY_Format_WithComma, get_Only_Year } from '../../../utils/dateFormat';
import { Link } from 'react-router-dom';

export class OnlineAdmission extends React.Component {

  render() {

    let { classConfigObj, dataTableLoader } = this.props
    // console.log("classConfigList", classConfigObj, dataTableLoader);

    return (
      <div class="admisia">
        <AppLayout>
          <Helmet>
            <title>OnlineAdmission</title>
            <meta name="description" content="Description of OnlineAdmission" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}
          <BreadcrumComponent
            pageTitle="Online Admission"
            menuStepFirst="Online Admission"
            menuStepSenond="Admission"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2 className="d-flex justify-content-center">
                        <span className="text-orange "> Academic Year - {classConfigObj && classConfigObj.currentAcademicYear} </span>
                      </h2>
                      {/* <div className="custom-title-border-left"></div> */}
                    </div>
                  </div>
                </div>

                {dataTableLoader ? centerTableLoader() :

                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <Table striped bordered className="online-admission-table">
                          <tbody>
                            {classConfigObj && classConfigObj.classConfigList && classConfigObj.classConfigList.map((item, index) => {

                              Object.assign(item, { currentAcademicYear: classConfigObj && classConfigObj.currentAcademicYear })

                              return <tr>
                                <td className="text-center">
                                  <b>
                                    Class - {item.className} <br />
                                    ( {item.groupName} )
                                  </b>
                                </td>
                                <td className="px-5 py-4">
                                  Start Date <br />
                                  <b>{get_DDMMM_YY_Format_WithComma(item.applicationStartDate)}</b> <br />
                                  <br />
                                  End Date <br />
                                  <b>{get_DDMMM_YY_Format_WithComma(item.applicationEndDate)}</b> <br />
                                </td>
                                <td className="px-5 py-4">
                                  <b>
                                    Seat Capacity {item.applicantLimit}<br />
                                    {item.leftDays} Days Left
                                    {/* {getTotalDaysDifference_TillToday(item.applicationEndDate)} Days Left */}
                                  </b>
                                  {item.prevExamInfoRequiredStatus == 1 ?
                                    <p className="text-success"><i className="fas fa-check"></i> Prerequisite</p> : null
                                  }

                                </td>
                                <td className="text-center">
                                  {/* <button class="btn explore-btn">Apply Now</button> */}
                                  <Link
                                    className="btn explore-btn"
                                    to={{
                                      pathname: `/institute/application_form`,
                                      admissionObj: item//{...item} 
                                    }}
                                  >
                                    Apply Now
                                  </Link>
                                </td>
                              </tr>
                            })}
                            {/* <tr>
                              <td className="text-center">
                                <b>
                                  Class - Nine <br/>
                                  ( Humanities )
                                </b>
                              </td>
                              <td className="px-5 py-4">
                                Start Date <br/>
                                <b>15th October, 2020</b> <br/>
                                <br/>
                                End Date <br/>
                                <b>15th October, 2020</b> <br/>
                              </td>
                              <td className="px-5 py-4">
                                <b>
                                  Seat Capacity 70<br/>
                                  30 Days Left
                                </b>
                              </td>
                              <td className="text-center">
                                <button class="btn explore-btn">Apply Now</button>
                              </td>
                            </tr>

                            <tr>
                              <td className="text-center">
                                <b>
                                  Class - Nine <br/>
                                  ( Science )
                                </b>
                              </td>
                              <td className="px-5 py-4">
                                Start Date <br/>
                                <b>15th October, 2020</b> <br/>
                                <br/>
                                End Date <br/>
                                <b>15th October, 2020</b> <br/>
                              </td>
                              <td className="px-5 py-4">
                                <b>
                                  Seat Capacity 54<br/>
                                  30 Days Left
                                </b>
                              </td>
                              <td className="text-center">
                                <button class="btn explore-btn">Apply Now</button>
                              </td>
                            </tr> */}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                }

              </div>

              <div className="container mt-5">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <button class="btn btn-primary bg-primary-color-dark p-4 mx-3 border-0">
                      <i className="fas fa-download"></i><br />
                      Instruction Download
                      </button>
                    {/* </div>

                  <div className="col-md-6"> */}
                    <button class="btn explore-btn px-5 py-4 mx-3">
                      <i className="fas fa-info-circle"></i><br />
                      <span className="px-2">How To Apply</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="offset-md-1 col-md-10">
                    <div className="custom-title-border-center mb-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </AppLayout>
      </div>
    );
  }
}

OnlineAdmission.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  onlineAdmission: makeSelectOnlineAdmission(),
  classConfigObj: makeSelectClassConfigList(),
  dataTableLoader: makeSelectDataTableLoader(),
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

const withReducer = injectReducer({ key: 'onlineAdmission', reducer });
const withSaga = injectSaga({ key: 'onlineAdmission', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OnlineAdmission);
