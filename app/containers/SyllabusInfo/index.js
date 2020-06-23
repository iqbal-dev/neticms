/**
 *
 * SyllabusInfo
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
import { Table } from 'reactstrap';
import makeSelectSyllabusInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';

/* eslint-disable react/prefer-stateless-function */
export class SyllabusInfo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>SyllabusInfo</title>
          <meta name="description" content="Description of SyllabusInfo" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <BreadcrumComponent
          pageTitle="Syllabus Info"
          menuStepFirst="Academic Info"
          menuStepSenond="Details Info"
          menuStepThird="Syllabus Info"
        />

        <section>
          <div className="container-fluid">
            {/* <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Syllabus</h2>
                    <div className="custom-title-border-left" />
                  </div>
                </div>
              </div>
            </div> */}

            <div className="container m-t-40">
              <div className="row">
                <di className="col-md-12">
                  <div className="table-responsive custom-table">
                    <Table striped className="download-corner-table">
                      <thead>
                        <tr>
                          <th>Class Name</th>
                          <th>Group Name</th>
                          <th>Published Date</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Class Ten</td>
                          <td>Science Group</td>
                          <td>20th Sep, 2020</td>
                          <td className="text-center">
                            <button className="btn explore-btn">
                              <i className="fas fa-download pr-2" />
                              DOWNLOAD
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Science Group</td>
                          <td>20th Sep, 2020</td>
                          <td className="text-center">
                            <button className="btn explore-btn">
                              <i className="fas fa-download pr-2" />
                              DOWNLOAD
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>Science Group</td>
                          <td>20th Sep, 2020</td>
                          <td className="text-center">
                            <button className="btn explore-btn">
                              <i className="fas fa-download pr-2" />
                              DOWNLOAD
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </di>
              </div>
              <div className="row m-t-40">
                <div className="col-md-12">
                  <div className="text-center m-t-40">
                    <button className="btn explore-btn-lg">
                      Load More <i className="fas fa-angle-right" />
                    </button>
                  </div>
                </div>
              </div>
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

SyllabusInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  syllabusInfo: makeSelectSyllabusInfo(),
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

const withReducer = injectReducer({ key: 'syllabusInfo', reducer });
const withSaga = injectSaga({ key: 'syllabusInfo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SyllabusInfo);
