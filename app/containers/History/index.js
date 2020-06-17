/**
 *
 * History
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
import makeSelectHistory from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

/* eslint-disable react/prefer-stateless-function */
export class History extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>History</title>
          <meta name="description" content="Description of History" />
        </Helmet>
        <Container className="mt-3">
          <Row xs="1" sm="2" md="12">
            <Col className="col-md-12">
              <Breadcrumb>
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>History</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <section className="post-wrapper">
          <Container>
            <Row xs="1" sm="2" md="12">
              <Col className="col-md-12">
                <div className="post">
                  <h3>History</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer a sem ligula. Mauris blandit nec nisl eu auctor. Nulla
                    eros neque, dignissim eget scelerisque quis, imperdiet nec
                    nisl. Integer mattis turpis id efficitur efficitur. Donec
                    suscipit dolor metus, sodales lobortis sapien aliquet vel.
                    Cras vehicula est lectus, eget luctus erat bibendum fringilla.
                    Aliquam quis urna vitae erat tristique lacinia. Integer mauris
                    diam, scelerisque in sagittis sagittis, malesuada sit amet
                    nulla. Morbi quis vulputate urna. Aliquam erat volutpat. Proin
                    ut interdum libero. Fusce eget est nec magna lobortis pretium
                    in in nisi. In vel orci at ligula lacinia lacinia vitae ac
                    urna.
                </p>
                </div>
              </Col>
            </Row>
          </Container>

        </section>

      </div>
    );
  }
}

History.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  history: makeSelectHistory(),
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

const withReducer = injectReducer({ key: 'history', reducer });
const withSaga = injectSaga({ key: 'history', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(History);
