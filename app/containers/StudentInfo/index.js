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

        <div className="container">
          <div className="row">
            <div className="offset-md-1 col-md-10">
              <div className="custom-title-border-center" />
            </div>
          </div>
        </div>

        <section>
          <div className="container-fluid">

            <div className="container p-t-60">
              <div className="row">

                  <div class="col-md-12 studentlist-data-inside">
                    <div class="description">
                      <div class="col-md-12 description-inside">
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
                          <div class="col-lg-12 ui-g-nopad student-details">
                            <div><label>Student Name</label>: Name</div>
                            <div><label>Father's Name</label>: Name</div>
                            <div><label>Mother's Name</label>: Name</div>
                            <div><label>Student Religion</label>: Name</div>
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
