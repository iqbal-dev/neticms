/**
 *
 * AllEventsList
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
import makeSelectAllEventsList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from './../../components/BreadcrumComponent';


/* eslint-disable react/prefer-stateless-function */
export class AllEventsList extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AllEventsList</title>
          <meta name="description" content="Description of AllEventsList" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <BreadcrumComponent pageTitle="All Events" menuStepFirst="Basic Infrastructure" menuStepSenond="All Events" menuStepThird="Book List" />
      <section>
        <div className="container-fluid">
          <div className="container p-t-60 p-b-60">
            <div className="row">
              <div className="col-md-12">
                <div className="page-inner-title">
                  <h2 className="text-orange">All Events</h2>
                  <div className="custom-title-border-left"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="event-list-wrapper event-list-wrapper-full">
                  <ul className="event-list">
                    <li className="m-b-40">
                      <div className="event">
                        <div className="date">
                          <span>04</span>
                          <p>Days</p>
                        </div>
                        <div className="event-details">
                          <div className="d-flex align-items-center">
                            <div className="event-name">Event</div>
                            <div className="event-date">
                              on
                              <i className="fas fa-calendar-alt" />
                                April 05, 2020
                              </div>
                          </div>
                          <div className="event-title">
                            <h2>Annual Sports Day will start soon</h2>
                          </div>
                          <div className="event-content">
                            <p>Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="m-b-40">
                      <div className="event">
                        <div className="date">
                          <span>04</span>
                          <p>Days</p>
                        </div>
                        <div className="event-details">
                          <div className="d-flex align-items-center">
                            <div className="event-name">Event</div>
                            <div className="event-date">
                              on
                              <i className="fas fa-calendar-alt" />
                                April 05, 2020
                              </div>
                          </div>
                          <div className="event-title">
                            <h2>Annual Sports Day will start soon</h2>
                          </div>
                          <div className="event-content">
                            <p>Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon Annual Sports Day will start soon </p>
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

AllEventsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allEventsList: makeSelectAllEventsList(),
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

const withReducer = injectReducer({ key: 'allEventsList', reducer });
const withSaga = injectSaga({ key: 'allEventsList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AllEventsList);
