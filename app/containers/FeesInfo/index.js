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
  Input,
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
  FormGroup,
} from 'reactstrap';
import makeSelectFeesInfo, { makeSelectClassList, makeSelectOnchangeClassValue, makeSelectFeesInfoList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { AppLayout } from '../AppLayout';
import { submitSearchButton, setOnchangeClassValue } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class FeesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeDetailsDialog: false,
    }

  }

  toggle = () => {
    this.setState({ feeDetailsDialog: true });

  }
  render() {
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>FeesInfo</title>
            <meta name="description" content="Description of FeesInfo" />
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
                    <div className="fees-info-subheader m-b-30">
                      <Col sm="12" lg="6">
                        {' '}
                        Showing result for <span>Class Seven</span>
                      </Col>
                      <Col sm="12" lg="6" className="search-dropdown">
                        <Input
                          type="select"
                          name="class"
                          onChange={this.props.onChangeClass}
                          value={this.props.classValue}

                          id="class-search-dropdown"
                        >
                          <option value=''>Select Class</option>
                          {this.props.classList && this.props.classList.map(item => (<option key={item.classId} value={item.classId}>{item.className}</option>))}
                        </Input>
                        <Button className="btn explore-btn" onClick={this.props.submitSearch}>Search</Button>
                      </Col>
                    </div>
                  </Row>
                  <Row>
                    {this.props.feesInfoList && this.props.feesInfoList.map((item, index) => (

                      <Col md="4">
                        <Card border="primary">
                          <CardHeader>
                            {item.feeName}
                            <span>
                              <i className="fas fa-info pr-2" />
                            </span>
                          </CardHeader>

                          <CardBody>
                            <CardText>
                              <table>
                                <tr>
                                  <td>Group </td>
                                  <td>: {item.groupName} </td>
                                </tr>
                                <tr>
                                  <td>Amount</td>
                                  <td>
                                    : <span>{item.feeAmount} /-BDT</span>{' '}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Payment Mode</td>
                                  <td>: {item.feePaymentMode} </td>
                                </tr>
                              </table>
                            </CardText>
                          </CardBody>
                        </Card>
                        {/* <Popover placement="right" isOpen={this.state.feeDetailsDialog} target="Popover1" toggle={this.toggle}>
                  <PopoverHeader>Popover Title</PopoverHeader>
                  <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover> */}
                      </Col>

                    ))}

                  </Row>
                  {/* <Row>
                  <Col sm={4}>
                    <div className="fees-details-dialog">
                      <h3>Fee Details</h3>
                      <p>
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled
                      </p>
                    </div>
                  </Col>
                </Row> */}

                </div>
              </div>
            </div>
          </section>
        </AppLayout>
      </div>
    );
  }
}

FeesInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  feesInfo: makeSelectFeesInfo(),
  classList: makeSelectClassList(),
  feesInfoList: makeSelectFeesInfoList(),

  classValue: makeSelectOnchangeClassValue(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeClass: (evt) => { dispatch(setOnchangeClassValue(evt.target.value)) },
    submitSearch: () => { dispatch(submitSearchButton()) },

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
