/**
 *
 * FailList
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
import makeSelectFailList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table } from 'reactstrap';
import { Chart } from 'react-google-charts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import donorImage from '../../assets/img/donor-image.png';

/* eslint-disable react/prefer-stateless-function */
export class FailList extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>FailList</title>
          <meta name="description" content="Description of FailList" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}

        <section>
          <div className="container-fluid">

            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12 attendance-body-header">
                  <div className="row attendance-body-header-inside">
                    <div className="col-md-12 col-lg-12 form">
                      <Form inline>
                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="academic-year">
                              <option>Select Academic Year</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="academic-year">
                              <option>Select Exam Type</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="academic-year">
                              <option>Select a Section</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup>
                            <Button className="btn explore-btn all-border-radious">Search</Button>
                          </FormGroup>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title with-print">
                    <h2>
                      <span>Total Failed Student Found<span className="text-orange">(1212)</span></span>
                      <span className="print text-orange"><i className="fas fa-print"></i> Print Result</span>
                    </h2>
                    <div className="custom-title-border-left" />
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <di className="col-md-12">
                  <div className="table-responsive custom-table">
                    <Table
                      responsive
                      className="section-wise-attendance-table attendance-symbol"
                    >
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Student ID</th>
                          <th>Roll No</th>
                          <th>Student Name</th>
                          <th>Total Marks</th>
                          <th>Failed Subject</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><div className="attendance passed"><img src={donorImage} /></div></td>
                          <td>100024</td>
                          <td>1</td>
                          <td>Md. Shahrear Kabir</td>
                          <td>549.60</td>
                          <td>04</td>
                        </tr>
                        <tr>
                          <td><div className="attendance passed"><img src={donorImage} /></div></td>
                          <td>100024</td>
                          <td>2</td>
                          <td>Md. Shahrear Kabir 2</td>
                          <td>549.60</td>
                          <td>02</td>
                        </tr>
                        <tr>
                          <td><div className="attendance passed"><img src={donorImage} /></div></td>
                          <td>100024</td>
                          <td>3</td>
                          <td>Md. Shahrear Kabir 3</td>
                          <td>549.60</td>
                          <td>01</td>
                        </tr>
                        <tr>
                          <td><div className="attendance failed"><img src={donorImage} /></div></td>
                          <td>100030</td>
                          <td>4</td>
                          <td>Md. Shahrear Kabir 4</td>
                          <td>120.60</td>
                          <td>01</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </di>
              </div>
              {/* <div className="row m-t-40">
                <div className="col-md-12">
                  <div className="text-center m-t-40">
                    <button className="btn explore-btn-lg">
                      Load More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="offset-md-1 col-md-10">
              <div className="custom-title-border-center" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

FailList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  failList: makeSelectFailList(),
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

const withReducer = injectReducer({ key: 'failList', reducer });
const withSaga = injectSaga({ key: 'failList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FailList);
