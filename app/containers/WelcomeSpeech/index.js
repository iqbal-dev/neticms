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
import makeSelectWelcomeSpeech from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';

/* eslint-disable react/prefer-stateless-function */
export class WelcomeSpeech extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>WelcomeSpeech</title>
          <meta name="description" content="Description of WelcomeSpeech" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
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
                <div className="col-lg-12">
                  <div className="speech-slider-wrapper">
                    <div className="slider-item">
                      <div className="slider-content grid-list-wrapper">
                        <div className="grid-image">
                          <img src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg" align="left" className="mx-auto d-block"/>
                          <div className="grid-social">
                            <ul className="d-flex justify-content-center w-100 nav">
                              <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                              <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                          </div>
                        </div>
                        {/* <img
                          src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg"
                          align="left"
                        /> */}
                        
                        <h4 className="designation">Chairman</h4>
                        <h1 className="employe-name">Md. Samad Sarker</h1>
                        <p>
                          Adamjee Cantonment Public School is one of the most prestigious and important educational institutions in Dhaka. It is located in the heart of the Dhaka Cantonment, comprising of an area of 5.00 acres of land. Adamjee Cantonment Public School was established in 1960 under the patronage of Al-Haj Gul Mohammed Adamjee, a leading industrialist of the then Pakistan. The foundation stone was laid on 13 January 1958 by the spouse of Gul Mohammed Adamjee. Field Marshall Mohammed Ayub Khan, the- then President of Pakistan, formally inaugurated the School on 27 January 1960. The classes started functioning from the same day with only six classes, from class Four to Nine. The first batch of students appeared in the Matriculation Examination in 1962. Subsequently, with further expansion of the institution, it was converted into a college and was renamed as Adamjee Cantonment College. In 1995, for some administrative reasons and effective teaching, the school section was totally bifurcated and shifted to its present location and its original name ''Adamjee Cantonment Public School'' was reinstated. The school is housed in two buildings: six storied and four storied. At present this is a two-shift school with the strength of about 7,000 students. The Day Shift which was discontinued, has been reintroduced on 1st January 2013. This school consists of Bangla version and English version and it's flag is yellow colour and it's monogram is pasted on the flag with four stars, which indicate the motto of the school- discipline, education and character.
                          
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="speech-wrapper welcome-speech my-3">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="speech-slider-wrapper">
                    <div className="slider-item">
                      <div className="slider-content grid-list-wrapper">
                        <div className="grid-image">
                          <img src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg" align="left" className="mx-auto d-block"/>
                          <div className="grid-social">
                            <ul className="d-flex justify-content-center w-100 nav">
                              <li><a href="#"><i class="fas fa-envelope"></i></a></li>
                              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                              <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                          </div>
                        </div>
                        {/* <img
                          src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg"
                          align="left"
                        /> */}
                        
                        <h4 className="designation">Chairman</h4>
                        <h1 className="employe-name">Md. Samad Sarker</h1>
                        <p>
                          Adamjee Cantonment Public School is one of the most prestigious and important educational institutions in Dhaka. It is located in the heart of the Dhaka Cantonment, comprising of an area of 5.00 acres of land. Adamjee Cantonment Public School was established in 1960 under the patronage of Al-Haj Gul Mohammed Adamjee, a leading industrialist of the then Pakistan. The foundation stone was laid on 13 January 1958 by the spouse of Gul Mohammed Adamjee. Field Marshall Mohammed Ayub Khan, the- then President of Pakistan, formally inaugurated the School on 27 January 1960. The classes started functioning from the same day with only six classes, from class Four to Nine. The first batch of students appeared in the Matriculation Examination in 1962. Subsequently, with further expansion of the institution, it was converted into a college and was renamed as Adamjee Cantonment College. In 1995, for some administrative reasons and effective teaching, the school section was totally bifurcated and shifted to its present location and its original name ''Adamjee Cantonment Public School'' was reinstated. The school is housed in two buildings: six storied and four storied. At present this is a two-shift school with the strength of about 7,000 students. The Day Shift which was discontinued, has been reintroduced on 1st January 2013. This school consists of Bangla version and English version and it's flag is yellow colour and it's monogram is pasted on the flag with four stars, which indicate the motto of the school- discipline, education and character.
                          
                        </p>
                      </div>
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
              <div className="custom-title-border-center" />
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

WelcomeSpeech.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  welcomeSpeech: makeSelectWelcomeSpeech(),
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
