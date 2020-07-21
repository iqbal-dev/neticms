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
import makeSelectWelcomeSpeech, { makeSelectWelcomeSpeechList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';

/* eslint-disable react/prefer-stateless-function */
export class WelcomeSpeech extends React.Component {
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
          menuStepFirst="Home"
          menuStepSenond="Basic Infrastructure"
          menuStepThird="Speech"
        /> 

        <section className="speech-wrapper welcome-speech my-3">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
              {this.props.welcomeSpeechList && this.props.welcomeSpeechList.map((item,index) => (
                <div className="col-lg-12">
                  <div className="speech-slider-wrapper">
                    <div className="slider-item">
                      <div className="slider-content grid-list-wrapper">
                        <div className="grid-image">
                          <img src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg" align="left" className="mx-auto d-block"/>
                          <div className="grid-social">
                            <ul className="d-flex justify-content-center w-100 nav">
                              <li><a href={item.speakerEmail}><i class="fas fa-envelope"></i></a></li>
                              <li><a href={item.speakerFacebookLinke}><i class="fab fa-facebook-f"></i></a></li>
                              <li><a href={item.speakerLinkedinLinke}><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                          </div>
                        </div>
                        {/* <img
                          src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg"
                          align="left"
                        /> */}
                        
                      <h4 className="designation">{item.speakerDesignation}</h4>
                        <h1 className="employe-name">{item.speakerName}</h1>
                        <p>
                          {item.speechDetails}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
                 ))}
              </div>
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
