/**
 *
 * AllNotice
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
import makeSelectAllNotice from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { makeSelectNoticeList } from '../HomePage/selectors';
import { AppLayout } from '../AppLayout';

/* eslint-disable react/prefer-stateless-function */
export class AllNotice extends React.Component {

  render() {

    console.log('noticeList-all ', JSON.parse(sessionStorage.allNoticeList));
    let allNoticeDetails = JSON.parse(sessionStorage.allNoticeList)

    return (
      <AppLayout>
      <div>

        <BreadcrumComponent
          pageTitle="All Notice"
          menuStepFirst="Home"
          menuStepSenond="Basic Infrastructure"
          menuStepThird="All Notice"
        />

        <section>
          <div className="container-fluid">

            <div className="container p-t-10">

              <div className="row" >
                <div className="col-md-12 all-notice-bg">

                  {allNoticeDetails.map(notice => (

                    <div className='all-notice-wrapper m-b-20'>
                      <div className='notice-wrapper'>

                        <div className="row" >

                          <div className="col-md-12">
                            <div className="event-date">Published on  <i className="fas fa-calendar-alt" /> {notice.noticeIssueDate} </div>
                            <h2 className='p-t-20'>{notice.noticeTitle}</h2>
                            <p> {notice.noticeDetails}</p>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}

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
      </div >
      </AppLayout>
    );
  }
}

AllNotice.propTypes = {
  dispatch: PropTypes.func.isRequired,
  noticeList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  allNotice: makeSelectAllNotice(),
  noticeList: makeSelectNoticeList(),
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

const withReducer = injectReducer({ key: 'allNotice', reducer });
const withSaga = injectSaga({ key: 'allNotice', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AllNotice);
