/**
 *
 * ExampleDesign
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
import makeSelectExampleDesign from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ExampleDesign extends React.PureComponent {
  render() {
    return (
      <div>
          <div className="box-1">
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
            <div className="box-2"></div>
          </div>
      </div>
    );
  }
}

ExampleDesign.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  exampleDesign: makeSelectExampleDesign(),
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

const withReducer = injectReducer({ key: 'exampleDesign', reducer });
const withSaga = injectSaga({ key: 'exampleDesign', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExampleDesign);
