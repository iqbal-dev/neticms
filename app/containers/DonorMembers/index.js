/**
 *
 * DonorMembers
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
import makeSelectDonorMembers from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';

import {makeSelectDonorMembersList} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class DonorMembers extends React.PureComponent {
  render() {

    console.log('members-list', this.props.donorMembersList);
    
    return (
      <div>
        <Helmet>
          <title>DonorMembers</title>
          <meta name="description" content="Description of DonorMembers" />
        </Helmet>
        <BreadcrumComponent pageTitle="Donore Members" menuStepFirst="Home" menuStepSenond="Administration" menuStepThird="Donore Members" />
        <section>
          <div className="container-fluid">
            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Donore Members</h2>
                    <div className="custom-title-border-left"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="grid-list-wrapper">
                    <div className="grid-image">
                      <img src={donorImage} className="rounded mx-auto d-block"/>
                    </div>
                    <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>Munsi Ashik Mahmud</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>Vice President, Brac Bank</h4>
                        </div>
                    </div>
                    <div className="grid-social">
                      <ul className="d-flex justify-content-center w-100 nav">
                        <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="grid-list-wrapper">
                    <div className="grid-image">
                      <img src={donorImage} className="rounded mx-auto d-block"/>
                    </div>
                    <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>Munsi Ashik Mahmud</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>Vice President, Brac Bank</h4>
                        </div>
                    </div>
                    <div className="grid-social">
                      <ul className="d-flex justify-content-center w-100 nav">
                        <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="grid-list-wrapper">
                    <div className="grid-image">
                      <img src={donorImage} className="rounded mx-auto d-block"/>
                    </div>
                    <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>Munsi Ashik Mahmud</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>Vice President, Brac Bank</h4>
                        </div>
                    </div>
                    <div className="grid-social">
                      <ul className="d-flex justify-content-center w-100 nav">
                        <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="grid-list-wrapper">
                    <div className="grid-image">
                      <img src={donorImage} className="rounded mx-auto d-block"/>
                    </div>
                    <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>Munsi Ashik Mahmud</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>Vice President, Brac Bank</h4>
                        </div>
                    </div>
                    <div className="grid-social">
                      <ul className="d-flex justify-content-center w-100 nav">
                        <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="grid-list-wrapper">
                    <div className="grid-image">
                      <img src={donorImage} className="rounded mx-auto d-block"/>
                    </div>
                    <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>Munsi Ashik Mahmud</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>Vice President, Brac Bank</h4>
                        </div>
                    </div>
                    <div className="grid-social">
                      <ul className="d-flex justify-content-center w-100 nav">
                        <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="grid-list-wrapper">
                    <div className="grid-image">
                      <img src={donorImage} className="rounded mx-auto d-block"/>
                    </div>
                    <div className="grid-content text-center">
                        <div className="grid-title">
                          <h3>Munsi Ashik Mahmud</h3>
                        </div>
                        <div className="grid-subtitle-title">
                          <h4>Vice President, Brac Bank</h4>
                        </div>
                    </div>
                    <div className="grid-social">
                      <ul className="d-flex justify-content-center w-100 nav">
                        <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      </ul>
                    </div>
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
      </div>
    );
  }
}

DonorMembers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  donorMembersList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  donorMembers: makeSelectDonorMembers(),
  donorMembersList: makeSelectDonorMembersList(),
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

const withReducer = injectReducer({ key: 'donorMembers', reducer });
const withSaga = injectSaga({ key: 'donorMembers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DonorMembers);
