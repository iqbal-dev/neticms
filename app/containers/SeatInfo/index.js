/**
 *
 * SeatInfo
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
import makeSelectSeatInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from './../../components/BreadcrumComponent';

/* eslint-disable react/prefer-stateless-function */
export class SeatInfo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>SeatInfo</title>
          <meta name="description" content="Description of SeatInfo" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <BreadcrumComponent pageTitle="Seat Info" menuStepFirst="Home" menuStepSenond="Administration" menuStepThird="Seat Info" />
        <section>
        <div className="container-fluid">
          <div className="container p-t-60 p-b-60">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="seat-info-wrapper seat-info-wrapper-full">
                  <ul className="seat-info-list">
                    <li className="m-b-40">
                      <div className="seat">
                        <div className="number">
                          <span>250</span>
                          <p>Total Seat</p>
                        </div>
                        <div className="seat-details">
                          <div className="class-name">
                            <span className='class-title'>Class</span>
                            <span className='class-details'>: Hsc Preperation</span>
                          </div>
                          <div className="group-name">
                            <span className='group-title'>Group</span>
                            <span className='group-details'>: Science</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="seat-info-wrapper seat-info-wrapper-full">
                  <ul className="seat-info-list">
                    <li className="m-b-40">
                      <div className="seat">
                        <div className="number">
                          <span>250</span>
                          <p>Total Seat</p>
                        </div>
                        <div className="seat-details">
                          <div className="class-name">
                            <span className='class-title'>Class</span>
                            <span className='class-details'>: Hsc Preperation</span>
                          </div>
                          <div className="group-name">
                            <span className='group-title'>Group</span>
                            <span className='group-details'>: Science</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="seat-info-wrapper seat-info-wrapper-full">
                  <ul className="seat-info-list">
                    <li className="m-b-40">
                      <div className="seat">
                        <div className="number">
                          <span>250</span>
                          <p>Total Seat</p>
                        </div>
                        <div className="seat-details">
                          <div className="class-name">
                            <span className='class-title'>Class</span>
                            <span className='class-details'>: Hsc Preperation</span>
                          </div>
                          <div className="group-name">
                            <span className='group-title'>Group</span>
                            <span className='group-details'>: Science</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="seat-info-wrapper seat-info-wrapper-full">
                  <ul className="seat-info-list">
                    <li className="m-b-40">
                      <div className="seat">
                        <div className="number">
                          <span>250</span>
                          <p>Total Seat</p>
                        </div>
                        <div className="seat-details">
                          <div className="class-name">
                            <span className='class-title'>Class</span>
                            <span className='class-details'>: Hsc Preperation</span>
                          </div>
                          <div className="group-name">
                            <span className='group-title'>Group</span>
                            <span className='group-details'>: Science</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="seat-info-wrapper seat-info-wrapper-full">
                  <ul className="seat-info-list">
                    <li className="m-b-40">
                      <div className="seat">
                        <div className="number">
                          <span>250</span>
                          <p>Total Seat</p>
                        </div>
                        <div className="seat-details">
                          <div className="class-name">
                            <span className='class-title'>Class</span>
                            <span className='class-details'>: Hsc Preperation</span>
                          </div>
                          <div className="group-name">
                            <span className='group-title'>Group</span>
                            <span className='group-details'>: Science</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="seat-info-wrapper seat-info-wrapper-full">
                  <ul className="seat-info-list">
                    <li className="m-b-40">
                      <div className="seat">
                        <div className="number">
                          <span>250</span>
                          <p>Total Seat</p>
                        </div>
                        <div className="seat-details">
                          <div className="class-name">
                            <span className='class-title'>Class</span>
                            <span className='class-details'>: Hsc Preperation</span>
                          </div>
                          <div className="group-name">
                            <span className='group-title'>Group</span>
                            <span className='group-details'>: Science</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row m-t-40">
              <div className="col-md-12">
                <div className="text-center m-t-40">
                <button class="btn explore-btn-lg">Explore all <i class="fas fa-angle-right"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
            <div className="offset-md-1 col-md-10">
              <div className="custom-title-border-center"></div>
            </div>
          </div>
        </div>
        </div>
      </section>
      </div>
    );
  }
}

SeatInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  seatInfo: makeSelectSeatInfo(),
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

const withReducer = injectReducer({ key: 'seatInfo', reducer });
const withSaga = injectSaga({ key: 'seatInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SeatInfo);
