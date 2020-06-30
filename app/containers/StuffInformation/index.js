/**
 *
 * StuffInformation
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
import makeSelectStuffInformation, { makeSelectStuffInfoList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';

import donorImage from '../../assets/img/donor-image.png';
import { Button } from 'reactstrap';
import { onSubmitStuffInfoSearchBtn, onSubmitStuffInfoSetRowData } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class StuffInformation extends React.Component {

  render() {

    console.log('info-list', this.props.staffInfoList);

    return (
      <div>
        <BreadcrumComponent
          pageTitle="Stuff's Information"
          menuStepFirst="Home"
          menuStepSenond="Administration"
          menuStepThird="Stuff's Information"
        />
        <section>
          <div className="container-fluid">
            <div className="container p-t-60">
              <div className="row">

                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">List of Stuff's</h2>
                    <div className="custom-title-border-left" />
                  </div>
                </div>
              </div>

              <div className="row">
                {this.props.staffInfoList.map( (item, index) =>
                  <div className="col-md-4">
                    <div className="grid-list-wrapper">
                      <div className="grid-image">
                        <img src={donorImage} className="mx-auto d-block" />
                      </div>
                      <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>{item.staffName}</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>{item.designationName}</h4>
                        </div>
                      </div>
                      <div className="grid-social">
                        <ul className="d-flex justify-content-center w-100 nav">
                          <li><a className="phone" href="#" phoneNumber={item.staffMobile1}><i className="fas fa-phone" /></a></li>
                          <li><a className="phone" href="#" phoneNumber={item.staffEmail}><i className="fas fa-envelope" /></a></li>
                          <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                          <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

StuffInformation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  staffInfoList: PropTypes.any,
  submitSearch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  stuffInformation: makeSelectStuffInformation(),
  staffInfoList: makeSelectStuffInfoList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitSearch: (evt) => {
      console.log('dispatch',dispatch);
      console.log('evt',evt);
      dispatch(onSubmitStuffInfoSetRowData('rowData')),

      dispatch(onSubmitStuffInfoSearchBtn())
    },

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'stuffInformation', reducer });
const withSaga = injectSaga({ key: 'stuffInformation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StuffInformation);
