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
            <div className="row">
              <div className="col-md-6">
                <div className="infrastructure-content-wrapper" />
              </div>
              <div className="col-md-6" />
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
