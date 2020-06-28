/**
 *
 * MeritList
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
import makeSelectMeritList, { makeSelectAcademicYear } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import donorImage from '../../assets/img/donor-image.png';
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { makeSelectSectionList } from '../Header/selectors';
import { setAcademicYear, submitSearchButton } from './actions';
import { AppLayout } from '../AppLayout';

/* eslint-disable react/prefer-stateless-function */
export class MeritList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  onchangeAcademicYear(e) {
    this.props.onchangeAcademicYearId(e.target.value)
  };

  render() {


    let academicYearOptions = [
      { key: 2020, value: 2020 },
      { key: 2019, value: 2019 },
    ];

    let sectionList = [
      { key: 'Section-A', value: 'Section-A' },
      { key: 'Section-B', value: 'Section-B' },
    ]

    let examList = [
      { key: 'Exam-A', value: 'Exam-A' },
      { key: 'Exam-B', value: 'Exam-B' },
    ]

    // if (this.props.academicYearList && this.props.academicYearList.lenght) {
    //   key & value bind
    // }


    return (
      <div>
        <AppLayout>
        <Helmet>
          <title>MeritList</title>
          <meta name="description" content="Description of MeritList" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <BreadcrumComponent
          pageTitle="Merit List"
          menuStepFirst="Home"
          menuStepSenond="Administration"
          menuStepThird="Merit List"
        />

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
                            <Input
                              type="select"
                              name="academic-year"
                              onChange={this.onchangeAcademicYear.bind(this)}
                              value={this.props.academicYear}
                            >
                              {academicYearOptions.map(item => (
                                <option value={item.value}>{item.key}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="section-list">
                              {sectionList.map(item => (
                                <option value={item.value}>{item.key}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup className="custom-dropdown">
                            <Input type="select" name="exam-list">
                              {examList.map(item => (
                                <option value={item.value}>{item.key}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </div>

                        <div className="col-md-6 col-lg-3">
                          <FormGroup>
                            <Button className="btn explore-btn all-border-radious" onClick={this.props.submitSearch}>Search</Button>
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
                      <span>Total Student Found<span className="text-orange">(1212)</span></span>
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
                          <th>Merit Position</th>
                          <th>Photo</th>
                          <th>Student ID</th>
                          <th>Roll No.</th>
                          <th>Student Name</th>
                          <th>Total Marks</th>
                          <th>GPA</th>
                          <th>Grade</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>04</td>
                          <td><div className="attendance passed"><img src={donorImage} /></div></td>
                          <td>100024</td>
                          <td>1</td>
                          <td>Md. Shahrear Kabir</td>
                          <td>549.60</td>
                          <td>04</td>
                          <td>A+</td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td><div className="attendance passed"><img src={donorImage} /></div></td>
                          <td>100024</td>
                          <td>2</td>
                          <td>Md. Shahrear Kabir 2</td>
                          <td>549.60</td>
                          <td>02</td>
                          <td>A+</td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td><div className="attendance passed"><img src={donorImage} /></div></td>
                          <td>100024</td>
                          <td>3</td>
                          <td>Md. Shahrear Kabir 3</td>
                          <td>549.60</td>
                          <td>01</td>
                          <td>A+</td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td><div className="attendance failed"><img src={donorImage} /></div></td>
                          <td>100030</td>
                          <td>4</td>
                          <td>Md. Shahrear Kabir 4</td>
                          <td>120.60</td>
                          <td>01</td>
                          <td>A+</td>
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
  </AppLayout>
      </div>
    );
  }
}

MeritList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  submitSearch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  meritList: makeSelectMeritList(),
  sectionList: makeSelectSectionList(),
  academicYear: makeSelectAcademicYear(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onchangeAcademicYearId: (evt) => {
      dispatch(setAcademicYear(evt.value))
    },
    submitSearch: (evt) => dispatch(submitSearchButton()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'meritList', reducer });
const withSaga = injectSaga({ key: 'meritList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MeritList);
