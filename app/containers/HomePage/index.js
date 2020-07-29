/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Container, Row, Col } from 'reactstrap';
import Slider from 'components/Slider';
import Calendar from 'react-calendar';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import icon1 from './crown-icon-1.png';
import icon2 from './crown-icon-2.png';
import icon3 from './crown-icon-3.png';
import emergancyImage from './emegancy.png';

import { Footer } from '../Footer';
import { Header } from '../Header';
import Menu from '../../containers/Menu';
import {
  makeSelectUrlInfo,
  makeSelectUrlId,
  makeSelectEmAccessToken,
  makeSelectMenuList,
  makeSelectLatestNewsList,
  makeSelectNoticeList,
  makeSelectWelcomeSpeech,
  makeSelectUseFullLinks,
  makeSelectHistoryDetails,
  makeSelectTopEvents,
  makeSelectLoaderStatus,
} from './selectors';
import { getFullMonthName, getTotalDaysDifference_TillToday } from '../../utils/dateFormat';
import { AppLayout } from '../AppLayout';
import staticImg from '../../assets/img/avatar.png';
/* eslint-disable react/prefer-stateless-function */
import { MyCalendar } from './AdminEventInfoCalendar'

//

let speechIndex = 0;
let welComeSpeechObj = {};
let fileContent = "";
let speakerDesignation = '';
let speakerName = '';
let welComeSpeech = '';

export class HomePage extends React.Component {

  onChange = date => this.setState({ date });

  formatEventStartDate = (evtDetails) => {

    console.log('evtDetails', evtDetails);

    if (evtDetails) {

      let formatDate = new Date(evtDetails.eventStartDate);
      const formatDate2 = formatDate.toLocaleDateString('en-GB');

      const splitDateArr = formatDate2.split('/');
      let eventStartDate = getFullMonthName(splitDateArr[1]) + ' ' + splitDateArr[0] + ', ' + splitDateArr[2];
      console.log('eventStartDate', eventStartDate);
      return eventStartDate;

    }

  }

  onChangeSpeechToIncrease = () => {

    speechIndex += 1;

    if (speechIndex == this.props.welComeInfo.length) { speechIndex = 0; }

    document.getElementById('speechImg').src = this.props.welComeInfo[speechIndex].fileContent ? "data:image/*;base64," + this.props.welComeInfo[speechIndex].fileContent : staticImg
    document.getElementsByClassName('designation')[0].innerHTML = this.props.welComeInfo[speechIndex].speakerDesignation;
    document.getElementsByClassName('employe-name')[0].innerHTML = this.props.welComeInfo[speechIndex].speakerName;
    document.getElementsByClassName('speechDetails')[0].innerHTML = this.props.welComeInfo[speechIndex].speechDetails;

    welComeSpeechObj = this.props.welComeInfo[speechIndex];
    console.log('increse-speechIndex', speechIndex);

  }

  onChangeSpeechToDecrease = () => {

    if (speechIndex == this.props.welComeInfo.length) { speechIndex = 0 }
    else if (speechIndex == 0) { speechIndex = this.props.welComeInfo.length; }

    speechIndex -= 1;

    // console.log("this.props.welComeInfo[speechIndex].fileContent", this.props.welComeInfo[speechIndex].fileContent);

    document.getElementById('speechImg').src = this.props.welComeInfo[speechIndex].fileContent ? "data:image/*;base64," + this.props.welComeInfo[speechIndex].fileContent : staticImg
    document.getElementsByClassName('designation')[0].innerHTML = this.props.welComeInfo[speechIndex].speakerDesignation;
    document.getElementsByClassName('employe-name')[0].innerHTML = this.props.welComeInfo[speechIndex].speakerName;
    document.getElementsByClassName('speechDetails')[0].innerHTML = this.props.welComeInfo[speechIndex].speechDetails;

    console.log('decrese-speechIndex', speechIndex);

  }

  render() {

    const date = new Date();

    console.log('welComeSpeechObj', welComeSpeechObj);
    console.log('urlInfoAll', this.props.urlInfoAll);
    console.log('token-homepage', this.props.accessToken);

    let instituteName = '';
    if (this.props.urlInfo) {
      instituteName = this.props.urlInfo.instituteName;
    }

    if (!this.props.welComeInfo == '') {
      // console.log('this.props.welComeInfo-------------------', this.props.welComeInfo[speechIndex]);
      // fileContent = "data:image/*;base64," + this.props.welComeInfo[speechIndex].fileContent
      speakerDesignation = this.props.welComeInfo[speechIndex].speakerDesignation;
      speakerName = this.props.welComeInfo[speechIndex].speakerName;
      welComeSpeech = this.props.welComeInfo[speechIndex].speechDetails;
    }

    console.log(speakerDesignation, speakerName, welComeSpeech);

    let instituteTopEventList = [];
    // let eventStartDate = '';

    if (!this.props.instituteTopEvents == '') {
      instituteTopEventList = this.props.instituteTopEvents;
    }

    return (
      <div>
        <AppLayout>
          <Slider notice={this.props.noticeList} />
          <section className="speech-wrapper section-space-60">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <div className="speech-slider-wrapper">
                      <div className="slider-item">
                        <div className="slider-content">
                        {/* {
                          item.fileContent ? */}
                            <img id="speechImg" align="left" className="fileContent"/>
                            {/* <img src={staticImg} width="100%"/>
                        } */}
                          {/* <img
                            src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg"
                            align="left"
                          /> */}
                          <h4 className="designation">{speakerDesignation}</h4>
                          <h1 className="employe-name">{speakerName}</h1>
                          <p className='speechDetails'>
                            {welComeSpeech}
                            <a href="#" align="left">
                              See More
                          </a>
                          </p>
                        </div>
                      </div>
                      <div className="slider-indecator">
                        <button className="slider-indecator-btn" onClick={() => this.onChangeSpeechToDecrease(speechIndex)}>
                          <i className="fas fa-angle-left" />
                        </button>
                        <button className="slider-indecator-btn" onClick={() => this.onChangeSpeechToIncrease(speechIndex)}>
                          <i className="fas fa-angle-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="usefull-links-wrapper">
                      <div className="usefull-links-title">
                        <span>
                          <i className="fas fa-link" />
                        </span>
                        <h2>Usefull Links</h2>
                      </div>
                      <ul className="links-lists">

                        {this.props.useFullLinks && this.props.useFullLinks.slice(0, 5).map(useFullLink => (
                          <li key={useFullLink.linkId}>
                            <span><i className="fas fa-angle-right" /></span>
                            <a href={useFullLink.linkUrl} target='_blank'>{useFullLink.linkTitle}</a>
                          </li>
                        ))}

                      </ul>

                      <div className="text-center">
                        <button className="btn explore-btn">
                          Explore all <i className="fas fa-angle-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray p-t-60">
            <div className="container-fluid p-b-100">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title text-center">
                      <h1>Welcome</h1>
                    </div>
                  </div>
                  <div className="offset-md-1 col-md-10 p-b-100">
                    <div className="section-sub-title text-center">
                      <p>
                        to {instituteName} website.
                        You will find here all information and updates about our
                        institute
                    </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="content-wrapper m-b-30">
                      <div className="content-title">
                        <h4>History of our school</h4>
                      </div>
                      <div className="content">
                        <p>
                          {/* <b>
                          Environment is the key fact for a child to grow up
                          with positive and clever attitude. That's where Holy
                          Child.
                        </b> */}
                        </p>
                        <p>{this.props.instituteHistory ? this.props.instituteHistory.aboutusDetails : ''}
                        </p>
                      </div>
                      <div className="content-btn">
                        <button className="btn btn-orange m-t-30">
                          Read More <i className="fas fa-angle-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="video-wrapper m-b-30">
                      <iframe
                        width="100%"
                        height="380"
                        src="https://www.youtube.com/embed/RFjLWGtA3R8"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid icon-orange-bg">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="icon-wrapper">
                      <div className="icon box-shadow">
                        <img src={icon1} />
                      </div>
                      <div className="icon-title">
                        <h5>Awards</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="icon-wrapper">
                      <div className="icon box-shadow">
                        <img src={icon2} />
                      </div>
                      <div className="icon-title">
                        <h5>Top students</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="icon-wrapper">
                      <div className="icon box-shadow">
                        <img src={icon3} />
                      </div>
                      <div className="icon-title">
                        <h5>Alumnus</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 section-space-60">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="icon-box-border">
                          <div className="icon-wrapper">
                            <div className="icon box-shadow">
                              <img src={icon1} />
                            </div>
                            <div className="icon-title">
                              <h5>Syllabus</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="icon-box-border">
                          <div className="icon-wrapper">
                            <div className="icon box-shadow">
                              <img src={icon1} />
                            </div>
                            <div className="icon-title">
                              <h5>Class routine</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="icon-box-border">
                          <div className="icon-wrapper">
                            <div className="icon box-shadow">
                              <img src={icon1} />
                            </div>
                            <div className="icon-title">
                              <h5>Result</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="icon-box-border">
                          <div className="icon-wrapper">
                            <div className="icon box-shadow">
                              <img src={icon1} />
                            </div>
                            <div className="icon-title">
                              <h5>Exam routine</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <img src={emergancyImage} className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray p-t-60">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title text-center">
                      <h1>Events</h1>
                    </div>
                  </div>
                  <div className="offset-md-1 col-md-10 p-b-100">
                    <div className="section-sub-title text-center">
                      <p>
                        Keep eyes on all events and try to join those what related
                        with you It will help you to stay updated and learn many
                        things
                    </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="event-list-wrapper p-b-100">
                      <ul className="event-list">

                        {instituteTopEventList.map(event => (
                          // console.log('singleNotice in ul', singleNotice);
                          <li key={event.eventID}>
                            <a className="event" href="#">
                              <div className="date">
                                <span>{event.totalDay}</span>
                                <p>Days</p>
                              </div>
                              <div className="event-details">
                                <div className="d-flex align-items-center">
                                  <div className="event-name">{event.eventType}</div>
                                  <div className="event-date">
                                    on
                                <i className="fas fa-calendar-alt" />
                                    {this.formatEventStartDate(event)}
                                  </div>
                                </div>
                                <div className="event-title">
                                  <h2>{event.eventTitle}</h2>
                                </div>
                              </div>
                            </a>
                          </li>
                        ))}

                        

                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 p-b-100">
                    <div className="bg-white calender-wrapper">
                      <div className="calender-title">
                        <h3>Event calender</h3>
                      </div>
                      <div className="calender">
                        {/* <Calendar onChange={this.onChange} value={date} /> */}
                        <MyCalendar
                            events={instituteTopEventList}
                        />
                      </div>
                    </div>
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

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  menuList: PropTypes.any,
  welComeInfo: PropTypes.any,
  noticeList: PropTypes.any,
  instituteHistory: PropTypes.any,
  instituteTopEvents: PropTypes.any,
  loaderStatus: PropTypes.any,
  accessToken: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // homePage: makeSelectHomePage(),
  urlInfo: makeSelectUrlInfo(),
  menuList: makeSelectMenuList(),
  noticeList: makeSelectNoticeList(),
  welComeInfo: makeSelectWelcomeSpeech(),
  useFullLinks: makeSelectUseFullLinks(),
  instituteHistory: makeSelectHistoryDetails(),
  instituteTopEvents: makeSelectTopEvents(),
  loaderStatus: makeSelectLoaderStatus(),
  accessToken: makeSelectEmAccessToken(),
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

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
