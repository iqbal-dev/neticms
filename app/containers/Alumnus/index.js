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
import makeSelectAlumnus, { makeSelectAlumnusList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';

import donorImage from '../../assets/img/donor-image.png';

export class Alumnus extends React.Component {

  render() {

    let { alumnusList } = this.props;

    // console.log('alumnusList', this.props.alumnusList);

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

                <div className="row m-t-28">
                  <div className="col-12 alumnus-member">

                    {alumnusList && alumnusList.length ?
                      alumnusList.map((item, index) => (

                        <div className="alumnus-member-inside align-items-center">
                          {item.imgContent ? <img src={"data:image/*; base64," + item.imgContent} /> : <img src={donorImage} />}
                          <div className="info-right">
                            <header>
                              <div className="row align-items-center">
                                <div className="col-12 col-xl-6 my-3">
                                  <div className="left text-orange name">{item.name}</div>
                                </div>
                                <div className="col-12 col-xl-6 mb-3">

                                  {/* <div className="grid-social">
                                    <ul className="d-flex justify-content-xl-end w-100 nav">

                                      <li><a ><i class="fas fa-phone"></i></a></li>
                                      <li><a ><i class="fas fa-envelope"></i></a></li>
                                      <li><a><i class="fab fa-facebook-f"></i></a></li>
                                      <li><a><i class="fab fa-linkedin-in"></i></a></li>

                                    </ul>
                                  </div> */}

                                  <div className="grid-social">
                                    <ul className="d-flex justify-content-center w-100 nav">
                                      <li><a className={!item.contactNo ? '' : "phone"} phone={item.contactNo}><i class="fas fa-phone"></i></a></li>
                                      <li><a className={!item.email ? '' : "email"} email={item.email}><i class="fas fa-envelope"></i></a></li>
                                      <li><a className={!item.facebookProfile ? '' : "facebook"} facebook={item.facebookProfile}><i class="fab fa-facebook-f"></i></a></li>
                                      <li><a className={!item.linkedinProfile ? '' : "linkedin"} linkedin={item.linkedinProfile}><i class="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                  </div>

                                </div>
                              </div>

                              <div className="row my-3 alumnus-job-details">
                                <div className="col-12 col-xl-4 pl-5">{item.designation}</div>
                                <div className="col-12 col-xl-4 pl-5">{item.organization}</div>
                                <div className="col-12 col-xl-4 pl-5 text-xl-right">Batch Year <br />{item.batch}</div>
                              </div>

                              <div className="row alumnus-details">
                                <div className="col-12"><i>{item.details}"</i></div>
                              </div>
                            </header>
                          </div>
                        </div>

                      ))
                      : ''}

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
  alumnusList: makeSelectAlumnusList(),
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
