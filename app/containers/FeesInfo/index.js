/**
 *
 * FeesInfo
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
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  Modal,
  Tabs,
  Tab,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardHeader,
} from 'reactstrap';
import makeSelectFeesInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';

/* eslint-disable react/prefer-stateless-function */
export class FeesInfo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Fees Info</title>
          <meta name="description" content="Description of Fees Info" />
        </Helmet>
        <BreadcrumComponent
          pageTitle="Fees Info"
          menuStepFirst="Home"
          menuStepSenond="Administration"
          menuStepThird="Fees Info"
        />
        <section>
          <div className="fees-info-main">
            <div className="container-fluid">
              <div className="container p-t-60">
                <Row>
                  <Col lg="6"> Showing result for class seven</Col>
                  <Col lg="6">button will go here</Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Card border="primary">
                      <CardHeader>Fee Name</CardHeader>
                      <CardBody>
                        <CardText>
                          <table>
                            <tr>
                              <td>Group </td>
                              <td>: Science </td>
                            </tr>
                            <tr>
                              <td>Amount</td>
                              <td>: 5000/-BDT </td>
                            </tr>
                            <tr>
                              <td>Payment Mode</td>
                              <td>: Monthly </td>
                            </tr>
                          </table>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

FeesInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  feesInfo: makeSelectFeesInfo(),
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

const withReducer = injectReducer({ key: 'feesInfo', reducer });
const withSaga = injectSaga({ key: 'feesInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FeesInfo);
