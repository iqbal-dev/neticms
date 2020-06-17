/**
 *
 * AboutUs
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
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import makeSelectAboutUs from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectUrlId, makeSelectUrlInfo } from '../HomePage/selectors';
import { getUrlInfoLocally } from '../../utils/localStorageMethod';

import { makeSelectHistory } from './selectors';
/* eslint-disable react/prefer-stateless-function */
export class AboutUs extends React.Component {
  constructor(props) {
    super(props);

    if (props.id) {
      console.log('props.postId-', props.id.slice(4));
    }
  }

  render() {

    // console.log('about-page', this.props.urlInfo);
    const info = JSON.parse(getUrlInfoLocally());
    console.log('about-pageget-UrlInfoLocally', info);

    let aboutDetails = '';
    if (this.props.history) {
      aboutDetails = this.props.history.aboutusDetails
    }

    return (
      <div>
        <Helmet>
          <title>AboutUs</title>
          <meta name="description" content="Description of AboutUs" />
        </Helmet>
        <Container className="mt-3">
          <Row xs="1" sm="2" md="12">
            <Col className="col-md-12">
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="#">Home</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>Library</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <section className="post-wrapper">
          <Container>
            <Row xs="1" sm="2" md="12">
              <Col className="col-md-12">
                <div className="post">
                  <h3>About Us</h3>
                  <p>{aboutDetails}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

AboutUs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  aboutUs: makeSelectAboutUs(),
  urlInfo: makeSelectUrlId(),
  history: makeSelectHistory(),
  instituteUrlInfoDetails: makeSelectUrlInfo(),

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

const withReducer = injectReducer({ key: 'aboutUs', reducer });
const withSaga = injectSaga({ key: 'aboutUs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AboutUs);
