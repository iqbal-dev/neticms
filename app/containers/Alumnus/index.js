/**
 *
 * Alumnus
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
import makeSelectAlumnus from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';

/* eslint-disable react/prefer-stateless-function */
export class Alumnus extends React.Component {
  render() {
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>Alumnus</title>
            <meta name="description" content="Description of Alumnus" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}

          <BreadcrumComponent
            pageTitle="Alumnus"
            menuStepFirst="Alumnus"
            // menuStepSenond="Routine"
            // menuStepThird="Exam Routine"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2 className="text-orange">List of Successful Alumnus Members</h2>
                      <div className="custom-title-border-left"></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 alumnus-member">
                    <div className="alumnus-member-inside">
                      <img src=""/>
                      <div className="info-right">
                        <header>
                          <div className="left">Shahrear Kabir</div>
                          <div className="right">
                            <div className="grid-social">
                              <ul className="d-flex justify-content-center w-100 nav">

                                <li><a ><i class="fas fa-phone"></i></a></li>
                                <li><a ><i class="fas fa-envelope"></i></a></li>
                                <li><a><i class="fab fa-facebook-f"></i></a></li>
                                <li><a><i class="fab fa-linkedin-in"></i></a></li>

                              </ul>
                            </div>
                          </div>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center mb-2" />
              </div>
            </div>
          </div>
          
        </AppLayout>
        
      </div>
    );
  }
}

Alumnus.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  alumnus: makeSelectAlumnus(),
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

const withReducer = injectReducer({ key: 'alumnus', reducer });
const withSaga = injectSaga({ key: 'alumnus', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Alumnus);
