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
import makeSelectDonorMembers, { makeSelectDonorloaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';

import { makeSelectDonorMembersList } from './selectors';
import { AppLayout } from '../AppLayout';
import staticImg from '../../assets/img/avatar.png';
import { centerTableLoader } from '../../utils/contentLoader';

export class DonorMembers extends React.PureComponent {

  render() {
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>DonorMembers</title>
            <meta name="description" content="Description of DonorMembers" />
          </Helmet>
          <BreadcrumComponent pageTitle="Donor Members" menuStepFirst="Institute Info" menuStepSenond="Administration" menuStepThird="Donor Members" />
          <section>
            <div className="container-fluid">
              <div className="container p-t-60">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2 className="text-orange">Donor Members</h2>
                      <div className="custom-title-border-left"></div>
                    </div>
                  </div>
                </div>

                {this.props.loaderType === 'autoLoadOn' ? centerTableLoader() :

                  <div className="row">
                    {this.props.donorMembersList && this.props.donorMembersList.map((item, index) => (
                      <div className="col-md-4">
                        <div className="grid-list-wrapper">
                          <div className="grid-image">
                            {
                              item.memberImg ?
                                <img src={"data:image/*;base64," + item.memberImg} className="rounded mx-auto d-block" /> :
                                <img src={staticImg} />
                            }
                          </div>
                          <div className="grid-content text-center">
                            <div className="grid-title">
                              <h3>{item.memberName}</h3>
                            </div>
                            <div className="grid-subtitle-title">
                              <h4>{item.memberDesignation}</h4>
                            </div>
                          </div>
                          <div className="grid-social">
                            <ul className="d-flex justify-content-center w-100 nav">
                              <li><a className={!item.memberEmail ? '' : "email"} email={item.memberEmail}><i class="fas fa-envelope"></i></a></li>
                              <li><a className={!item.facebookProfile ? '' : "facebook"} facebook={item.facebookProfile}><i class="fab fa-facebook-f"></i></a></li>
                              <li><a className={!item.linkedinProfile ? '' : "linkedin"} linkedin={item.linkedinProfile}><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }

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

DonorMembers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  donorMembersList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  donorMembers: makeSelectDonorMembers(),
  donorMembersList: makeSelectDonorMembersList(),
  loaderType: makeSelectDonorloaderType(),
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
