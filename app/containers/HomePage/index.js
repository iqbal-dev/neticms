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
  makeSelectHomeSliderList
} from './selectors';
import { getFullMonthName, getTotalDaysDifference_TillToday } from '../../utils/dateFormat';
import { AppLayout } from '../AppLayout';
import staticImg from '../../assets/img/avatar.png';
/* eslint-disable react/prefer-stateless-function */
import { MyCalendar } from './AdminEventInfoCalendar'
import ReadMoreReact from 'read-more-react';

//

let speechIndex = 0;
let welComeSpeechObj = {};
let fileContent = "";
let speakerDesignation = '';
let speakerName = '';
let welComeSpeech = '';
let imageContent = '';

export class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usefullExploreBtnShow: true,
    }

    this.showUseFullLinksFirstFive = this.showUseFullLinksFirstFive.bind(this);
    this.showUseFullLinksAll = this.showUseFullLinksAll.bind(this);
    this.topScrollFunction = this.topScrollFunction.bind(this);
  }

  onChange = date => this.setState({ date });

  formatEventStartDate = (evtDetails) => {

    if (evtDetails) {

      let formatDate = new Date(evtDetails.eventStartDate);
      const formatDate2 = formatDate.toLocaleDateString('en-GB');

      const splitDateArr = formatDate2.split('/');
      let eventStartDate = getFullMonthName(splitDateArr[1] - 1) + ' ' + splitDateArr[0] + ', ' + splitDateArr[2];
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
    // console.log('increse-speechIndex', speechIndex);

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

    // console.log('decrese-speechIndex', speechIndex);

  }

  getPlainTextToHtml = (html) => {

    // console.log('speecg-html', html);

    var temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent;
  }

  showUseFullLinksFirstFive() {

    return this.props.useFullLinks && this.props.useFullLinks.slice(0, 5).map(useFullLink => (
      <li key={useFullLink.linkId}>
        <span><i className="fas fa-angle-right" /></span>
        <a href={useFullLink.linkUrl} target='_blank'>{useFullLink.linkTitle}</a>
      </li>
    ))

  }

  showUseFullLinksAll() {

    return this.props.useFullLinks && this.props.useFullLinks.map(useFullLink => (
      <li key={useFullLink.linkId}>
        <span><i className="fas fa-angle-right" /></span>
        <a href={useFullLink.linkUrl} target='_blank'>{useFullLink.linkTitle}</a>
      </li>
    ))
  }

  setBtnVisibleStatus = (visibleStatus) => {
    this.setState({ usefullExploreBtnShow: visibleStatus })
  }

  topScrollFunction() {
    document.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {

    let instituteName = '';
    if (this.props.urlInfo) {
      instituteName = this.props.urlInfo.instituteName;
    }

    if (!this.props.welComeInfo == '') {

      imageContent = this.props.welComeInfo[speechIndex].fileContent ? "data:image/*;base64," + this.props.welComeInfo[speechIndex].fileContent : staticImg;
      speakerDesignation = this.props.welComeInfo[speechIndex].speakerDesignation;
      speakerName = this.props.welComeInfo[speechIndex].speakerName;
      welComeSpeech = this.props.welComeInfo[speechIndex].speechDetails;

    }

    let instituteTopEventList = [];

    if (!this.props.instituteTopEvents == '') {
      instituteTopEventList = this.props.instituteTopEvents;
    }

    // top scroll btn task below

    var mybutton = document.getElementById("scrollTopBtn");
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
      if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    // institute history
    let instituteHistory = '';
    let historyImageContent = '';
    if (this.props.instituteHistory && this.props.instituteHistory.aboutusDetails) {
      instituteHistory = this.props.instituteHistory.aboutusDetails;
      historyImageContent = this.props.instituteHistory.aboutusImg ? "data:image/*;base64," + this.props.instituteHistory.aboutusImg : staticImg;
    }

    // history read more btn
    let historyMoreBtn = <div className="content-btn">
      <button className="btn btn-orange" style={{ marginTop: '12px' }}>
        Read More <i className="fas fa-angle-right" />
      </button>
    </div>

    return (
      <div>
        <AppLayout>
          <Slider notice={this.props.noticeList} slider={this.props.homeSliderList} />
          <section className="speech-wrapper section-space-60">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <div className="speech-slider-wrapper">
                      <div className="slider-item">
                        <div className="slider-content">

                          {this.props.instituteHistory ? <img id="speechImg" align="left" className="fileContent" src={imageContent} /> : ''}

                          {/* <img
                            src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg"
                            align="left"
                          /> */}
                          <h4 className="designation">{speakerDesignation}</h4>
                          <h1 className="employe-name">{speakerName}</h1>
                          <p className='speechDetails'>

                            {this.props.welComeInfo ?

                              <ReadMoreReact text={this.getPlainTextToHtml(welComeSpeech)}
                                min={235}
                                ideal={236}
                                max={2000}
                                readMoreText={historyMoreBtn} />
                              : ''
                            }

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
                        <h2>Useful Links</h2>
                      </div>
                      <ul className="links-lists">

                        {this.state.usefullExploreBtnShow ?

                          this.showUseFullLinksFirstFive()
                          :
                          this.showUseFullLinksAll()
                        }

                      </ul>

                      <div className="text-center">

                        {this.state.usefullExploreBtnShow ?
                          <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(false)}>
                            Explore all <i className="fas fa-angle-right" />
                          </button>
                          :
                          <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(true)}>
                            Explore less <i className="fas fa-angle-right" />
                          </button>
                        }
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
                      <h1>Welcome To</h1>
                    </div>
                  </div>
                  <div className="offset-md-1 col-md-10 p-b-100">
                    <div className="section-sub-title text-center">
                      <p style={{ textAlign: 'justify' }}>
                        {instituteName} website.
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
                        <h4>History of our Institute</h4>
                      </div>
                      <div className="content">

                        <p>

                          {this.props.instituteHistory ?

                            < ReadMoreReact text={this.getPlainTextToHtml(instituteHistory)}
                              min={200}
                              ideal={201}
                              max={1000}
                              readMoreText={historyMoreBtn} />
                            : ''
                          }

                        </p>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="video-wrapper m-b-30">

                      <img width="100%" height="380" src={this.props.instituteHistory.aboutusImg ? "data:image/*;base64," + this.props.instituteHistory.aboutusImg : staticImg} />

                      {/* <iframe
                        width="100%"
                        height="380"
                        src="https://www.youtube.com/embed/RFjLWGtA3R8"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      /> */}

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
                              <h5>Class Routine</h5>
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
                              <h5>Exam Routine</h5>
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
                        <h3>Event Calender</h3>
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

                <button onClick={() => this.topScrollFunction()} id="scrollTopBtn" title="Go to top">
                  <i class="fal fa-arrow-to-top"></i>                  {/* <i class="fal fa-arrow-alt-circle-up"></i> */}
                </button>

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
  homeSliderList: makeSelectHomeSliderList(),
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
