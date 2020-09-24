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
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import Slider from 'components/Slider';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import icon1 from './crown-icon-1.png';
import icon2 from './crown-icon-2.png';
import icon3 from './crown-icon-3.png';
import crownIconExam from './crown-icon-exam.png';
import crownIconRoutine from './crown-icon-routine.png';
import crownIconSyllabus from './crown-icon-syllabus.png';
import emergancyImage from './emegancy.png';
import { Link } from 'react-router-dom';

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
  makeSelectHomeSliderList,
  makeSelectInstMappingDialog,
  makeSelectMappingInstId,
  makeSelectHomeSliderLoader,
  makeSelectNoticeLoader,
  makeSelectSpeechLoader,
  makeSelectLinkLoader,
  makeSelectImageLoader,
  makeSelectEventLoader
} from './selectors';
import { getFullMonthName, getTotalDaysDifference_TillToday } from '../../utils/dateFormat';
import { AppLayout } from '../AppLayout';
import staticImg from '../../assets/img/avatar.png';
import blank_image from '../../assets/img/blank-image-2.png';
/* eslint-disable react/prefer-stateless-function */
import { MyCalendar } from './AdminEventInfoCalendar'
import ReadMoreReact from 'read-more-react';
import { hideInstMappingDialog, setMappingInstitute, submitToMapInstitute } from './actions';
import ReadMoreAndLess from 'react-read-more-less';

import { speechLoader, listLoader, threeDotLoader } from '../../utils/contentLoader';
import { unset } from 'lodash';
//

let speechIndex = 0;
let welComeSpeechObj = {};
let fileContent = "";
let speakerDesignation = '';
let speakerName = '';
let welComeSpeech = '';
let imageContent = '';
let speakerMobile = '';
let speakerEmail = '';
let speakerFacebook = '';
let speakerLinkedin = '';

export class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usefullExploreBtnShow: true,
      emptyErrors: {},
      speechReadMore: false,
      historyReadMore: false
    }

    this.showUseFullLinksFirstFive = this.showUseFullLinksFirstFive.bind(this);
    this.showUseFullLinksAll = this.showUseFullLinksAll.bind(this);
    this.topScrollFunction = this.topScrollFunction.bind(this);
    this.onChangeModalStatus = this.onChangeModalStatus.bind(this);
    this.onChangeInstitute = this.onChangeInstitute.bind(this);
    this.submitToMapInstitute = this.submitToMapInstitute.bind(this);
    this.clearErrorMsg = this.clearErrorMsg.bind(this);

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
    document.getElementById('welcome-speech').innerHTML = this.props.welComeInfo[speechIndex].speechDetails;

    let phoneValue = document.getElementById('phone')
    let emailValue = document.getElementById('email')
    let facebookValue = document.getElementById('facebook')
    let linkedinValue = document.getElementById('linkedin')

    this.addOrRemoveDomAttr(phoneValue, 'phone', this.props.welComeInfo[speechIndex].speakerMobile);
    this.addOrRemoveDomAttr(emailValue, 'email', this.props.welComeInfo[speechIndex].speakerEmail);
    this.addOrRemoveDomAttr(facebookValue, 'facebook', this.props.welComeInfo[speechIndex].speakerFacebookLinke);
    this.addOrRemoveDomAttr(linkedinValue, 'linkedin', this.props.welComeInfo[speechIndex].speakerLinkedinLinke);

    welComeSpeechObj = this.props.welComeInfo[speechIndex];

  }

  onChangeSpeechToDecrease = () => {

    if (speechIndex == this.props.welComeInfo.length) { speechIndex = 0 }
    else if (speechIndex == 0) { speechIndex = this.props.welComeInfo.length; }

    speechIndex -= 1;
    document.getElementById('speechImg').src = this.props.welComeInfo[speechIndex].fileContent ? "data:image/*;base64," + this.props.welComeInfo[speechIndex].fileContent : staticImg
    document.getElementsByClassName('designation')[0].innerHTML = this.props.welComeInfo[speechIndex].speakerDesignation;
    document.getElementsByClassName('employe-name')[0].innerHTML = this.props.welComeInfo[speechIndex].speakerName;
    document.getElementById('welcome-speech').innerHTML = this.props.welComeInfo[speechIndex].speechDetails;

    let phoneValue = document.getElementById('phone')
    let emailValue = document.getElementById('email')
    let facebookValue = document.getElementById('facebook')
    let linkedinValue = document.getElementById('linkedin')

    this.addOrRemoveDomAttr(phoneValue, 'phone', this.props.welComeInfo[speechIndex].speakerMobile);
    this.addOrRemoveDomAttr(emailValue, 'email', this.props.welComeInfo[speechIndex].speakerEmail);
    this.addOrRemoveDomAttr(facebookValue, 'facebook', this.props.welComeInfo[speechIndex].speakerFacebookLinke);
    this.addOrRemoveDomAttr(linkedinValue, 'linkedin', this.props.welComeInfo[speechIndex].speakerLinkedinLinke);
  }

  addOrRemoveDomAttr = (dom, attrVal, data) => {
    if (data) {
      dom.classList.add(attrVal);
      dom.setAttribute(attrVal, data);
    }
    else {
      dom.classList.remove(attrVal)
    }
  }

  getPlainTextToHtml = (html) => {

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

  onChangeModalStatus() {

  }

  onChangeInstitute(evt) {
    this.props.onChangeEmInstitute(evt);
    this.clearErrorMsg();
  }

  submitToMapInstitute() {

    let { emptyErrors } = this.state;
    if (this.props.mappingInstId === '') {
      emptyErrors["mappInstitute"] = "institute can't left empty.";
      this.setState({ emptyErrors });
    } else { this.props.onSubmitToMapp(); }
  }

  clearErrorMsg() {
    let { emptyErrors } = this.state;
    emptyErrors["mappInstitute"] = '';
    this.setState({ emptyErrors })
  }

  render() {

    let { emptyErrors, historyReadMore, speechReadMore } = this.state;
    let instituteName = '';

    let urlInfoDetails = this.props.urlInfo;

    if (this.props.urlInfo) {
      instituteName = this.props.urlInfo.instituteName;
    }

    if (!this.props.welComeInfo == "") {

      imageContent = this.props.welComeInfo[speechIndex].fileContent ? "data:image/*;base64," + this.props.welComeInfo[speechIndex].fileContent : staticImg;
      speakerDesignation = this.props.welComeInfo[speechIndex].speakerDesignation;
      speakerName = this.props.welComeInfo[speechIndex].speakerName;
      welComeSpeech = this.props.welComeInfo[speechIndex].speechDetails;
      speakerMobile = this.props.welComeInfo[speechIndex].speakerMobile;
      speakerEmail = this.props.welComeInfo[speechIndex].speakerEmail;
      speakerFacebook = this.props.welComeInfo[speechIndex].speakerFacebookLinke;
      speakerLinkedin = this.props.welComeInfo[speechIndex].speakerLinkedinLinke;

      document.getElementById('welcome-speech') ? document.getElementById('welcome-speech').innerHTML = welComeSpeech : ''

      // console.log('this.props.welComeInfo[speechIndex].speechDetails', welComeSpeech);

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
      document.getElementById('institute-history') ? document.getElementById('institute-history').innerHTML = this.props.instituteHistory.aboutusDetails : ''

      instituteHistory = this.props.instituteHistory.aboutusDetails;
      historyImageContent = this.props.instituteHistory.fileContent ? "data:image/*;base64," + this.props.instituteHistory.fileContent : blank_image;
    }

    // welcomeSpeech read more btn

    // let speechMoreBtn =
    //   <button className="btn btn-orange" style={{ marginTop: '12px' }}>
    //     Read More <i className="fas fa-angle-right" />
    //   </button>

    // let speechLessBtn = <button className="btn btn-orange" style={{ marginTop: '12px' }}>
    //   Read Less <i className="fas fa-angle-left" />
    // </button>

    // history read more btn
    // let historyMoreBtn =
    //   <button className="btn btn-orange" style={{ marginTop: '12px' }}>
    //     Read More <i className="fas fa-angle-right" />
    //   </button>

    // // <div className="content-btn" style={{ width: '126px' }}>
    // let historyLessBtn = <button className="btn btn-orange" style={{ marginTop: '12px' }}>
    //   Read Less <i className="fas fa-angle-left" />
    // </button>

    // console.log("this.propsloaderStatus HOME.......>>>>>>>>>", this.props.eventLoader);// this.props.homeSliderLoader,

    let readMoreBtn = (id, stateVar) => {
      let speechDiv = document.getElementById(id);

      if (stateVar) {
        if (id == 'welcome-speech') {
          speechDiv.style.webkitLineClamp = '5'
        }
        else if (id == 'institute-history') {
          speechDiv.style.webkitLineClamp = '9'
        }

        speechDiv.style.display = '-webkit-box'
      }
      else {
        speechDiv.style.webkitLineClamp = '50'
        speechDiv.style.display = 'contents'
      }

      if (id == 'welcome-speech') {
        this.setState({ speechReadMore: !stateVar })
      }
      else if (id == 'institute-history') {
        this.setState({ historyReadMore: !stateVar })
      }
    }
    return (
      <div>
        <AppLayout>
          <Slider
            notice={this.props.noticeList}
            slider={this.props.homeSliderList}
            homeSliderLoader={this.props.homeSliderLoader}
            noticeLoader={this.props.noticeLoader}
          />

          <section className="speech-wrapper section-space-60">
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <div className="speech-slider-wrapper">
                      <div className="slider-item">
                        <div className="slider-content grid-list-wrapper welcome-speech">

                          {
                            this.props.speechLoader ?
                              speechLoader() :
                              <React.Fragment>
                                {
                                  this.props.welComeInfo ?

                                    <div className="grid-image">
                                      <img id="speechImg" align="left" className="fileContent" src={imageContent} />
                                      <div className="grid-social">
                                        <ul className="d-flex justify-content-center w-100 nav">
                                          <li><a id='phone' className={!speakerMobile ? '' : "phone"} phone={speakerMobile}><i class="fas fa-phone"></i></a></li>
                                          <li><a id='email' className={!speakerEmail ? '' : "email"} email={speakerEmail}><i class="fas fa-envelope"></i></a></li>
                                          <li><a id='facebook' className={!speakerFacebook ? '' : "facebook"} facebook={speakerFacebook}><i class="fab fa-facebook-f"></i></a></li>
                                          <li><a id='linkedin' className={!speakerLinkedin ? '' : "linkedin"} linkedin={speakerLinkedin}><i class="fab fa-linkedin-in"></i></a></li>
                                          {/* <li><a className={!item.speakerMobile ? '' : "phone"} phone={item.speakerMobile}><i class="fas fa-phone"></i></a></li>
                                          <li><a className={!item.speakerEmail ? '' : "email"} email={item.speakerEmail}><i class="fas fa-envelope"></i></a></li>
                                          <li><a className={!item.speakerFacebookLinke ? '' : "facebook"} facebook={item.speakerFacebookLinke}><i class="fab fa-facebook-f"></i></a></li>
                                          <li><a className={!item.speakerLinkedinLinke ? '' : "linkedin"} linkedin={item.speakerLinkedinLinke}><i class="fab fa-linkedin-in"></i></a></li> */}
                                        </ul>
                                      </div>
                                    </div>
                                    : ''
                                }

                                {/* <img
                                  src="https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg"
                                  align="left"
                                /> */}
                                <h4 className="designation">{speakerDesignation}</h4>
                                <h1 className="employe-name">{speakerName}</h1>
                                <p className='speechDetails m-0'>

                                  {this.props.welComeInfo ?

                                    // <ReadMoreAndLess
                                    //   ref={this.ReadMore}
                                    //   className="read-more-content"
                                    //   charLimit={490}
                                    //   readMoreText={<span style={{ color: '#ff4e31' }}> read more</span>}
                                    //   readLessText={<span style={{ color: '#ff4e31' }}> read less</span>}
                                    // >
                                    <React.Fragment>
                                      <div id="welcome-speech"></div>
                                      <a className="read-more-less-button mt-3" onClick={() => readMoreBtn('welcome-speech', speechReadMore)}>
                                        {
                                          speechReadMore ?
                                            'Read Less' : 'Read More'
                                        }
                                      </a>
                                    </React.Fragment>

                                    // </ReadMoreAndLess>

                                    // <ReadMoreReact text={this.getPlainTextToHtml(welComeSpeech)}
                                    //   min={235}
                                    //   ideal={236}
                                    //   max={2000}
                                    //   readMoreText={historyMoreBtn} />
                                    : ''
                                  }

                                </p>
                              </React.Fragment>
                          }

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

                        {
                          this.props.linkLoader ?
                            <React.Fragment>
                              <li style={{ backgroundColor: "#ffffff" }}>
                                {listLoader()}
                              </li>
                              <li style={{ backgroundColor: "#ffffff" }}>
                                {listLoader()}
                              </li>
                            </React.Fragment>

                            :
                            this.state.usefullExploreBtnShow ?
                              this.showUseFullLinksFirstFive()
                              :
                              this.showUseFullLinksAll()
                        }

                      </ul>

                      <div className="text-center">

                        {this.state.usefullExploreBtnShow ?
                          <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(false)} disabled={this.props.useFullLinks.length < 6 ? true : false}>
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
                  <div className="offset-md-1 col-md-10 pb-5">
                    <div className="section-sub-title text-center">
                      <p style={{ textAlign: 'center' }}>
                        {instituteName}
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

                        <p style={{ overflow: 'unset'}}>

                          {this.props.instituteHistory ?

                            // <ReadMoreAndLess
                            //   ref={this.ReadMore}
                            //   className="read-more-content"
                            //   charLimit={480}
                            //   readMoreText={<span style={{ color: '#ff4e31' }}> read more</span>}
                            //   readLessText={<span style={{ color: '#ff4e31' }}> read less</span>}
                            // >

                            <React.Fragment>
                              <div id="institute-history"></div>
                              <div className="row">
                                <div className="col-12 mt-3">
                                  <button className="btn explore-btn" onClick={() => readMoreBtn('institute-history', historyReadMore)}>
                                    {
                                      historyReadMore ?
                                        'Read Less ' : 'Read More '
                                    }<i className="fas fa-angle-right" />
                                  </button>
                                </div>
                              </div>

                            </React.Fragment>
                            // </ReadMoreAndLess>

                            // < ReadMoreReact text={this.getPlainTextToHtml(instituteHistory)}
                            //   min={200}
                            //   ideal={201}
                            //   max={1000}
                            //   readMoreText={historyMoreBtn} />
                            // <div id="institute-history"></div>

                            : ''
                          }

                        </p>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="video-wrapper m-b-30">
                      {
                        this.props.imageLoader ?
                          <div className="loader-center">
                            {threeDotLoader()}
                          </div>
                          :
                          <img style={{ objectFit: 'cover' }} width="100%" height="380" src={historyImageContent} />
                      }

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
                        <Link to={{ pathname: '/institute/awards' }} >
                          <img src={icon1} />
                        </Link>
                      </div>
                      <div className="icon-title">
                        <Link className="link-decoration-none" to={{ pathname: '/institute/awards' }} >
                          <h5>Awards</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="icon-wrapper">
                      <div className="icon box-shadow">
                        <Link to={{ pathname: '/institute/top_students' }} >
                          <img src={icon2} />
                        </Link>
                      </div>
                      <div className="icon-title">
                        <Link className="link-decoration-none" to={{ pathname: '/institute/top_students' }} >
                          <h5>Top students</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="icon-wrapper">
                      <div className="icon box-shadow">
                        <Link to={{ pathname: '/institute/alumnus' }} >
                          <img src={icon3} />
                        </Link>
                      </div>
                      <div className="icon-title">
                        <Link className="link-decoration-none" to={{ pathname: '/institute/alumnus' }} >
                          <h5>Alumnus</h5>
                        </Link>
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
                  <div className="col-md-9 section-space-60">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="icon-box-border">
                          <div className="icon-wrapper">
                            <div className="icon box-shadow">
                              <Link to={{ pathname: '/institute/syllabus_info' }} >
                                <img src={crownIconSyllabus} />
                              </Link>
                            </div>
                            <div className="icon-title">
                              <Link to={{ pathname: '/institute/syllabus_info' }} ><h5>Syllabus</h5></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        
                          <div className="icon-box-border">
                            <div className="icon-wrapper">
                              <div className="icon box-shadow">
                                <img src={crownIconRoutine} />
                              </div>
                              <div className="icon-title">
                              <Link to={{ pathname: "/institute/class_routine"}}><h5>Class Routine</h5></Link>
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
                              <Link to={{ pathname: '/institute/individual_result' }} >
                                <img src={crownIconExam} />
                              </Link>
                            </div>
                            <div className="icon-title">
                              <Link to={{ pathname: '/institute/individual_result' }} ><h5>Result</h5></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="icon-box-border">
                          <div className="icon-wrapper">
                            <div className="icon box-shadow">
                              <img src={crownIconSyllabus} />
                            </div>
                            <div className="icon-title">
                              <h5>Exam Routine</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-center section-space-60">
                    <img src={emergancyImage} width="auto" height="556px" />
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
                  <div className="offset-md-1 col-md-10 pb-5">
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

                        {
                          this.props.eventLoader ?
                            <React.Fragment>
                              <li><a className="event top">{listLoader()}</a></li>
                              <li><a className="event top">{listLoader()}</a></li>
                              <li><a className="event top">{listLoader()}</a></li>
                              <li><a className="event top">{listLoader()}</a></li>
                            </React.Fragment>

                            :
                            instituteTopEventList.slice(0, 6).map(event => (
                              // console.log('singleNotice in ul', singleNotice);
                              <li key={event.eventID}>
                                <a className="event top" >
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
                      <div className="calender-title mb-4">
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

          <Modal isOpen={this.props.instMappingDialogStatus} toggle={this.onChangeModalStatus} >
            <ModalHeader toggle={this.onChangeModalStatus}>Institute Map</ModalHeader>
            <ModalBody>

              <Input type="select" name="mappInstitute" onChange={this.onChangeInstitute}
              >
                <option value=''>Select Institute to Map</option>
                {urlInfoDetails.edumanInstituteList && urlInfoDetails.edumanInstituteList.map(item => (
                  <option key={item.edumanInstituteId} value={item.edumanInstituteId}>{item.edumanInstituteName}</option>
                ))}
              </Input>

              <span className="error-message">{emptyErrors["mappInstitute"]}</span>

            </ModalBody>
            <ModalFooter>
              <Button className="btn explore-btn all-border-radious" onClick={this.submitToMapInstitute}>Submit</Button>
            </ModalFooter>
          </Modal>

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
  instMappingDialogStatus: makeSelectInstMappingDialog(),
  mappingInstId: makeSelectMappingInstId(),
  homeSliderLoader: makeSelectHomeSliderLoader(),
  noticeLoader: makeSelectNoticeLoader(),
  speechLoader: makeSelectSpeechLoader(),
  linkLoader: makeSelectLinkLoader(),
  imageLoader: makeSelectImageLoader(),
  eventLoader: makeSelectEventLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeEmInstitute: (evt) => {
      dispatch(setMappingInstitute(evt.target.value));
    },
    onSubmitToMapp: () => {
      dispatch(submitToMapInstitute());
    }
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
