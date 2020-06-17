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
/* eslint-disable react/prefer-stateless-function */
class Slider extends React.Component {
  render() {
    const items = [
      {
        src: Slide_4,
        altText: '',
        caption: '',
        header: '',
        key: '3',
      },
      {
        src: Slide_1,
        altText: '',
        caption: '',
        header: '',
        key: '4',
      },
      {
        src: Slide_3,
        altText: '',
        caption: '',
        header: '',
        key: '5',
      },
    ];

    console.log('ntc-list', this.props.notice);
    let noticeArrayList = [];
    if (!this.props.notice == '') {
      console.log('ntc-condition-true');
      noticeArrayList = this.props.notice;
      // let listItem = document.getElementById("notice-list");
      // this.props.notice.map((singleNotice) => {
      //   let listValue = document.createElement("li");
      //   listValue.textContent = <a href="#">
      //   <span>
      //     Publish on <i className="fas fa-calendar-alt" />{' '}
      //     Aprill 05, 2020
      //   </span>
      //   <h4>{singleNotice.noticeTitle}</h4>
      // </a>
      //   listItem.appendChild(listValue);
      // })
    }

    return (
      <div className="home-slider-wrapper">
        <Container>
          <Row>
            <div className="col-md-8">
              <UncontrolledCarousel items={items} />
            </div>
            <div className="col-md-4">
              <div className="notice-board-wrapper">
                <div className="notice-board-title">
                  <i className="fas fa-comment-alt mr-1" /> Notice Board
                </div>
                <div id="notice-list" className="notice-board">
                  <ul>
                    {noticeArrayList.map(singleNotice => (
                      // console.log('singleNotice in ul', singleNotice);
                      <li key={singleNotice.noticeID}>
                        <a href="#">
                          <span>
                            Publish on <i className="fas fa-calendar-alt" />{' '}
                            Aprill 05, 2020
                          </span>
                          <h4>{singleNotice.noticeTitle}</h4>
                        </a>
                      </li>
                    ))}

                    {/* <li>
                      <a href="#">
                        <span>
                          Publish on <i className="fas fa-calendar-alt" />{' '}
                          Aprill 05, 2020
                        </span>
                        <h4>School will be close till June 30, 2020</h4>
                      </a>
                    </li>
                     */}
                  </ul>
                  <a className="allNotice" href="#">
                    Read All
                  </a>
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
