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

import donorImage from '../../assets/img/avatar.png';
import { Button } from 'reactstrap';
import { onSubmitStuffInfoSearchBtn, onSubmitStuffInfoSetRowData } from './actions';
import { AppLayout } from '../AppLayout';

/* eslint-disable react/prefer-stateless-function */
export class StuffInformation extends React.Component {

  render() {

    console.log('info-list', this.props.staffInfoList);

    return (
      <div>
        <AppLayout>
          <BreadcrumComponent
            pageTitle="Staff's Information"
            menuStepFirst="Institute Info"
            menuStepSenond="List of"
            menuStepThird="Staff's Information"
          />
          <section>
            <div className="container-fluid">
              <div className="container p-t-60">
                <div className="row">

                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2 className="text-orange">List of Staff's</h2>
                      <div className="custom-title-border-left" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  {this.props.staffInfoList.map((item, index) =>
                    <div className="col-md-4">
                      <div className="grid-list-wrapper">
                        <div className="grid-image">
                          {item.image ? <img src={"data:image/*;base64," + item.image} className="mx-auto d-block" /> : <img src={donorImage} className="mx-auto d-block" />}
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

                            <li><a className={!item.staffMobile1 ? '' : "phone"} phone={item.staffMobile1}><i class="fas fa-phone"></i></a></li>
                            <li><a className={!item.staffEmail ? '' : "email"} email={item.staffEmail}><i class="fas fa-envelope"></i></a></li>
                            <li><a className={!item.facebookProfile ? '' : "facebook"} facebook={item.facebookProfile}><i class="fab fa-facebook-f"></i></a></li>
                            <li><a className={!item.linkedinProfile ? '' : "linkedin"} linkedin={item.linkedinProfile}><i class="fab fa-linkedin-in"></i></a></li>

                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
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
      console.log('dispatch', dispatch);
      console.log('evt', evt);
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
