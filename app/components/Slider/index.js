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
import { Link } from 'react-router-dom';

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

    console.log('ntc-list-slider', this.props.notice);
    let noticeArrayList = [];
    if (!this.props.notice == '') { noticeArrayList = this.props.notice; }

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
                    {noticeArrayList.slice(0, 5).map(singleNotice => (
                      <li key={singleNotice.noticeID}>
                        <Link to={{ pathname: '/all_notice', personWiseTokenInfo: noticeArrayList}} target='_blank' >
                          <span>Publish on <i className="fas fa-calendar-alt" />{singleNotice.noticeIssueDate}</span>
                          <h4>{singleNotice.noticeTitle}</h4>
                        </Link>
                      </li>
                    ))}
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
