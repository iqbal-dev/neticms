/**
 *
 * BasicInfrastucture
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBasicInfrastucture from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import infrastructure from '../../assets/img/Infrustructure.png';

/* eslint-disable react/prefer-stateless-function */
export class BasicInfrastucture extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>BasicInfrastucture</title>
          <meta
            name="description"
            content="Description of BasicInfrastucture"
          />
        </Helmet>
        <BreadcrumComponent
          pageTitle="Basic Infrastructure"
          menuStepFirst="Home"
          menuStepSenond=""
          menuStepThird="Basic Infrastructure"
        />
        <section>
          <div className="container p-t-60 content-wrapper">
            <div className="row align-items-md-center ">
              <div className="col-md-6">
                <div className="infrastructure-content-wrapper">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Dress Code</h2>
                    <div className="custom-title-border-left no-border"></div>
                  </div>
                  <div className="">
                    <div className="content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vnisi ut aliquip ex ehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>
                    <button className="btn explore-btn">
                      Read More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="infrastructure-content-image">
                  <img src={infrastructure} className="img-fluid w-100 box-shadow" alt="infrastructure" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
            <div className="row align-items-md-center ">
              <div className="col-md-6">
                <div className="infrastructure-content-wrapper">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Dress Code</h2>
                    <div className="custom-title-border-left no-border"></div>
                  </div>
                  <div className="">
                    <div className="content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vnisi ut aliquip ex ehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>
                    <button className="btn explore-btn">
                      Read More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="infrastructure-content-image">
                  <img src={infrastructure} className="img-fluid w-100 box-shadow" alt="infrastructure" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
            <div className="row align-items-md-center ">
              <div className="col-md-6">
                <div className="infrastructure-content-wrapper">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Dress Code</h2>
                    <div className="custom-title-border-left no-border"></div>
                  </div>
                  <div className="">
                    <div className="content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vnisi ut aliquip ex ehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>
                    <button className="btn explore-btn">
                      Read More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="infrastructure-content-image">
                  <img src={infrastructure} className="img-fluid w-100 box-shadow" alt="infrastructure" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
            <div className="row align-items-md-center ">
              <div className="col-md-6">
                <div className="infrastructure-content-wrapper">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Dress Code</h2>
                    <div className="custom-title-border-left no-border"></div>
                  </div>
                  <div className="">
                    <div className="content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vnisi ut aliquip ex ehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>
                    <button className="btn explore-btn">
                      Read More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="infrastructure-content-image">
                  <img src={infrastructure} className="img-fluid w-100 box-shadow" alt="infrastructure" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
            <div className="row align-items-md-center ">
              <div className="col-md-6">
                <div className="infrastructure-content-wrapper">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Dress Code</h2>
                    <div className="custom-title-border-left no-border"></div>
                  </div>
                  <div className="">
                    <div className="content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vnisi ut aliquip ex ehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                    </div>
                    <button className="btn explore-btn">
                      Read More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="infrastructure-content-image">
                  <img src={infrastructure} className="img-fluid w-100 box-shadow" alt="infrastructure" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }
}

BasicInfrastucture.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  basicInfrastucture: makeSelectBasicInfrastucture(),
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

const withReducer = injectReducer({ key: 'basicInfrastucture', reducer });
const withSaga = injectSaga({ key: 'basicInfrastucture', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BasicInfrastucture);
