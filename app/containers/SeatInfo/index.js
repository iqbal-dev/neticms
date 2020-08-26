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
import makeSelectSeatInfo, { makeSelectSeatInfoList, makeSelectLoaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from './../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';
import { centerTableLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */
export class SeatInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      exploreBtnShow: true,
    }

    this.showTableColumnsFirstFive = this.showTableColumnsFirstFive.bind(this);
    this.showTableColumnsAll = this.showTableColumnsAll.bind(this);

  }

  showTableColumnsFirstFive() {

    return this.props.seatInfoList && this.props.seatInfoList.slice(0, 6).map(item => (

      <div className="col-sm-12 col-md-6">
        <div className="seat-info-wrapper seat-info-wrapper-full">
          <ul className="seat-info-list">
            <li className="m-b-40">
              <div className="seat">
                <div className="number">
                  <span>{item.totalSeat}</span>
                  <p>Total Seat</p>
                </div>
                <div className="seat-details">
                  <div className="class-name">
                    <span className='class-title'>Class</span>
                    <span className='class-details'>: {item.className}</span>
                  </div>
                  <div className="group-name">
                    <span className='group-title'>Group</span>
                    <span className='group-details'>: {item.groupName}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ))

  }

  showTableColumnsAll() {

    return this.props.seatInfoList && this.props.seatInfoList.map((item, index) => (
      <div className="col-sm-12 col-md-6">
        <div className="seat-info-wrapper seat-info-wrapper-full">
          <ul className="seat-info-list">
            <li className="m-b-40">
              <div className="seat">
                <div className="number">
                  <span>{item.totalSeat}</span>
                  <p>Total Seat</p>
                </div>
                <div className="seat-details">
                  <div className="class-name">
                    <span className='class-title'>Class</span>
                    <span className='class-details'>: {item.className}</span>
                  </div>
                  <div className="group-name">
                    <span className='group-title'>Group</span>
                    <span className='group-details'>: {item.groupName}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ))

  }

  setBtnVisibleStatus = (visibleStatus) => {
    this.setState({ exploreBtnShow: visibleStatus })
  }

  render() {
    console.log("seatInfoList", this.props.seatInfoList);
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>SeatInfo</title>
            <meta name="description" content="Description of SeatInfo" />
          </Helmet>
          <BreadcrumComponent
            pageTitle="Seat Info"
            menuStepFirst="Academic Info"
            menuStepSenond="Details Info"
            menuStepThird="Seat Info" />

          <section>
            <div className="container-fluid">
              <div className="container p-t-60 p-b-60">
                <div className="row">
                  {this.props.loaderStatus === 'tableLoadOn' ? centerTableLoader() :

                    this.state.exploreBtnShow ?

                      this.showTableColumnsFirstFive()
                      :
                      this.showTableColumnsAll()

                  }
                </div>
                <div className="row m-t-40">
                  <div className="col-md-12">
                    <div className="text-center m-t-40">

                      {this.state.exploreBtnShow ?
                        <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(false)}>
                          Explore all <i className="fas fa-angle-right" />
                        </button>
                        :
                        <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(true)}>
                          Explore less <i className="fas fa-angle-right" />
                        </button>
                      }

                      {/* <button class="btn explore-btn-lg">Explore all <i class="fas fa-angle-right"></i></button> */}
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
        </AppLayout>
      </div>
    );
  }
}

SeatInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  seatInfoList: PropTypes.any,

};

const mapStateToProps = createStructuredSelector({
  seatInfo: makeSelectSeatInfo(),
  seatInfoList: makeSelectSeatInfoList(),
  loaderStatus: makeSelectLoaderType()

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
