/**
 *
 * Slider
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import messages from './messages';
import Slide_4 from './slider-4.png';
import Slide_1 from './slider-1.jpg';
import Slide_3 from './slider-3.jpg';
import staticImg from '../../assets/img/slider_bg.jpg';
/* eslint-disable react/prefer-stateless-function */
import { Link } from 'react-router-dom';
import { getFullMonthName, get_YYMMDD_Format_WithHyphen, getHHMMSS } from '../../utils/dateFormat';
import { listLoader, sliderLoader } from '../../utils/contentLoader';

class Slider extends React.Component {

  formatDate = (evtDetails) => {

    if (evtDetails) {
      // var dt = new Date(evtDetails);
      // dt.setDate( dt.getDate() - 1 );

      let formatDate = get_YYMMDD_Format_WithHyphen(evtDetails);
      const splitDateArr = formatDate.split('-');
      let eventStartDate = getFullMonthName(splitDateArr[1] - 1) + ' ' + splitDateArr[2] + ', ' + splitDateArr[0];

      return eventStartDate;

    }

  }

  render() {

    let { slider } = this.props
    const items = [];
    if (!slider) {
      let sliderItem = {
        src: staticImg,
        altText: '',
        caption: '',
        header: '',
        key: 0,
      }
      items.push(sliderItem)
    }
    else {
      slider && slider.map((item, index) => {
        let sliderItem = {
          src: "data:image/*;base64," + item.fileContent,
          altText: item.fileName,
          caption: '',
          header: item.photoTitle,
          key: index + 1,
        }
        items.push(sliderItem)
      })
    }

    // console.log('ntc-list-slider', this.props.notice);
    let noticeArrayList = [];
    if (!this.props.notice == '') { noticeArrayList = this.props.notice; }

    return (
      <div className="home-slider-wrapper">
        <Container>   {/*  container   */}
          <Row>
            <div className="col-12 col-xl-8">
              {
                this.props && this.props.homeSliderLoader ? 
                  sliderLoader():
                  <UncontrolledCarousel items={items} />
              }
              
            </div>
            <div className="col-12 col-xl-4">
              <div className="notice-board-wrapper">
                <div className="notice-board-title">
                  <i className="fas fa-comment-alt mr-1" /> Notice Board
                </div>
                <div id="notice-list" className="notice-board">
                  <ul>
                    {
                      this.props.noticeLoader ? 
                      <React.Fragment>
                          <li>
                            {listLoader()}
                          </li>
                          <li>
                            {listLoader()}
                          </li>
                          <li>
                            {listLoader()}
                          </li>
                          <li>
                            {listLoader()}
                          </li>
                          <li>
                            {listLoader()}
                          </li>
                      </React.Fragment>
                      
                      :
                      noticeArrayList.slice(0, 5).map(singleNotice => (
                        <li key={singleNotice.noticeID}>
                          <Link 
                            to={{ 
                              pathname: '/institute/all_notice', 
                              personWiseTokenInfo: noticeArrayList,
                              singleNotice: singleNotice,
                            }} 
                          >
                            <span>Publish on <i className="fas fa-calendar-alt" /> {this.formatDate(singleNotice.noticeIssueDate)}</span>
                            <h4>{singleNotice.noticeTitle}</h4>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                  <Link className="allNotice" to={{ pathname: '/institute/all_notice', personWiseTokenInfo: noticeArrayList }} >Read All</Link>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

Slider.propTypes = {};

export default Slider;
