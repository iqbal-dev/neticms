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
import makeSelectAllEventsList, { makeSelectAllEventListFetch } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from './../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';
import { getTotalDaysDifference_TillToday, getFullMonthName } from '../../utils/dateFormat';

/* eslint-disable react/prefer-stateless-function */
export class AllEventsList extends React.PureComponent {

  formatEventStartDate = (evtDetails) => {

    if (evtDetails) {

      let formatDate = new Date(evtDetails.eventStartDate);
      const formatDate2 = formatDate.toLocaleDateString('en-GB');

      const splitDateArr = formatDate2.split('/');
      let eventStartDate = getFullMonthName(splitDateArr[1]) + ' ' + splitDateArr[0] + ', ' + splitDateArr[2];
      return eventStartDate;

    }

  }
  render() {
    let allEvents = this.props.eventsList;
    console.log('allEvents', allEvents);
    return (
      <AppLayout>
        <div>
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
                        {
                          allEvents && allEvents.map((item) => {
                            return (
                              <li className="m-b-40">
                                <div className="event">
                                  <div className="date">
                                    <span>{item.totalDay}</span>
                                    <p>Days</p>
                                  </div>
                                  <div className="event-details">
                                    <div className="d-flex align-items-center">
                                      <div className="event-name">{item.eventType}</div>
                                      <div className="event-date">
                                        on
                                        <i className="fas fa-calendar-alt" />
                                        {this.formatEventStartDate(item)}
                                      </div>
                                    </div>
                                    <div className="event-title">
                                      <h2>{item.eventTitle}</h2>
                                    </div>
                                    <div className="event-content">
                                      <p>{item.eventDetails}</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div className="row m-t-40">
              <div className="col-md-12">
                <div className="text-center m-t-40">
                <button class="btn explore-btn-lg">Explore all <i class="fas fa-angle-right"></i></button>
                </div>
              </div>
            </div> */}
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
      </AppLayout>
    );
  }
}

AllEventsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventsList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  eventsList: makeSelectAllEventListFetch()
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
