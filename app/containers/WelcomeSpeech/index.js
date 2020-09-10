/**
 *
 * WelcomeSpeech
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
import makeSelectWelcomeSpeech, { makeSelectWelcomeSpeechList, makeSelectWelcomeSpeechLoader } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';
import staticImg from '../../assets/img/avatar.png';
import { centerTableLoader } from '../../utils/contentLoader';

export class WelcomeSpeech extends React.Component {

  getPlainTextToHtml = (index, html) => {
    setTimeout(() => {
      let speechDetails = document.getElementsByClassName('speechDetails');
      speechDetails && speechDetails[index] ? speechDetails[index].innerHTML = html : ''
    }, 100);
  }

  render() {
    return (
      <div>
        <AppLayout>

          <Helmet>
            <title>WelcomeSpeech</title>
            <meta name="description" content="Description of WelcomeSpeech" />
          </Helmet>
          <BreadcrumComponent
            pageTitle="Welcome Speech"
            menuStepFirst="Institute Info"
            menuStepSenond="Administration"
            menuStepThird="Welcome Speech"
          />

          <section className="speech-wrapper welcome-speech my-3">
            <div className="container-fluid">
              <div className="container">

                {this.props.loaderStatus === 'autoLoadOn' ? centerTableLoader() :

                  <div className="row">
                    {this.props.welcomeSpeechList && this.props.welcomeSpeechList.map((item, index) => (
                      <div className="col-lg-12">
                        <div className="speech-slider-wrapper mb-4">
                          <div className="slider-item">
                            <div className="slider-content grid-list-wrapper">
                              <div className="grid-image">
                                {
                                  item.fileContent ?
                                    <img src={"data:image/*;base64," + item.fileContent} align="left" className="mx-auto d-block" /> :
                                    <img src={staticImg} width="100%" />
                                }
                                <div className="grid-social">
                                  <ul className="d-flex justify-content-center w-100 nav">
                                    <li><a className={!item.speakerMobile ? '' : "phone"} phone={item.speakerMobile}><i class="fas fa-phone"></i></a></li>
                                    <li><a className={!item.speakerEmail ? '' : "email"} email={item.speakerEmail}><i class="fas fa-envelope"></i></a></li>
                                    <li><a className={!item.speakerFacebookLinke ? '' : "facebook"} facebook={item.speakerFacebookLinke}><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a className={!item.speakerLinkedinLinke ? '' : "linkedin"} linkedin={item.speakerLinkedinLinke}><i class="fab fa-linkedin-in"></i></a></li>
                                  </ul>
                                </div>
                              </div>

                              <h4 className="designation">{item.speakerDesignation}</h4>
                              <h1 className="employe-name">{item.speakerName}</h1>
                              {/* <p>{ this.getPlainTextToHtml(item.speechDetails) }</p> */}
                              <div className='speechDetails'>
                                {this.getPlainTextToHtml(index, item.speechDetails)}
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center" />
              </div>
            </div>
          </div>
        </AppLayout>
      </div>
    );
  }
}

WelcomeSpeech.propTypes = {
  dispatch: PropTypes.func.isRequired,
  welcomeSpeechList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  welcomeSpeech: makeSelectWelcomeSpeech(),
  welcomeSpeechList: makeSelectWelcomeSpeechList(),
  loaderStatus: makeSelectWelcomeSpeechLoader()
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

const withReducer = injectReducer({ key: 'welcomeSpeech', reducer });
const withSaga = injectSaga({ key: 'welcomeSpeech', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WelcomeSpeech);
