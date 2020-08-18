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
import makeSelectSyllabusInfo, { makeSelectSyllabusList, makeSelectSyllabusFile, makeSelectSyllabusRowdata, makeSelectLoaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';
import { setRowData, submitForFetchFile, setSyllabusFile } from './actions';
import { getFileContentType } from '../../utils/FileHandler'
import { centerTableLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */
export class SyllabusInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      exploreBtnShow: true,
    }

    this.showTableColumnsFirstFive = this.showTableColumnsFirstFive.bind(this);
    this.showTableColumnsAll = this.showTableColumnsAll.bind(this);

  }

  showTableColumnsFirstFive() {

    return this.props.allSyllabusList && this.props.allSyllabusList.slice(0, 5).map(item => (

      <tr>
        <td>{item.className}</td>
        <td>{item.groupName}</td>
        {/* <td>20th Sep, 2020</td> */}
        <td className="text-center">
          {
            !item.syllabusFileName ? "No Attachment Found" :
              <button className="btn explore-btn" onClick={e => this.props.downloadFile(e, item)}>
                <i className="fas fa-download pr-2" />
                DOWNLOAD
              </button>
          }
        </td>
      </tr>
    ))

  }

  showTableColumnsAll() {

    return this.props.allSyllabusList && this.props.allSyllabusList.map(item => (

      <tr>
        <td>{item.className}</td>
        <td>{item.groupName}</td>
        {/* <td>20th Sep, 2020</td> */}
        <td className="text-center">
          {
            !item.syllabusFileName ? "No Attachment Found" :
              <button className="btn explore-btn" onClick={e => this.props.downloadFile(e, item)}>
                <i className="fas fa-download pr-2" />
                DOWNLOAD
              </button>
          }
        </td>
      </tr>

    ))
  }

  setBtnVisibleStatus = (visibleStatus) => {
    this.setState({ exploreBtnShow: visibleStatus })
  }

  render() {

    let downloadFileContent = this.props.syllabusFile;

    if (!downloadFileContent == '') {

      let contentType = getFileContentType(this.props.syllabusRowdata.syllabusFileName);
      let a = document.createElement("a");

      a.href = contentType + downloadFileContent;
      a.download = this.props.syllabusRowdata.syllabusFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      this.props.reSetSyllabusFile();
    }

    let syllabusList = this.props.allSyllabusList;

    return (
      <div>
        <AppLayout>

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
                      {this.props.loaderStatus === 'tableLoadOn' ? centerTableLoader() :
                        <Table striped className="download-corner-table">
                          <thead>
                            <tr>
                              <th>Class Name</th>
                              <th>Group Name</th>
                              {/* <th>Published Date</th> */}
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>

                            {this.state.exploreBtnShow ?

                              this.showTableColumnsFirstFive()
                              :
                              this.showTableColumnsAll()
                            }

                          </tbody>
                        </Table>
                      }
                    </div>
                  </di>
                </div>
                <div className="row m-t-40">
                  <div className="col-md-12">
                    <div className="text-center m-t-40">

                      {this.state.exploreBtnShow ?
                        <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(false)}>
                          Load More <i className="fas fa-angle-right" />
                        </button>
                        :
                        <button className="btn explore-btn" onClick={() => this.setBtnVisibleStatus(true)}>
                          Load Less <i className="fas fa-angle-right" />
                        </button>
                      }

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
        </AppLayout>
      </div>
    );
  }
}

SyllabusInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allSyllabusList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  allSyllabusList: makeSelectSyllabusList(),
  syllabusRowdata: makeSelectSyllabusRowdata(),
  syllabusFile: makeSelectSyllabusFile(),
  loaderStatus: makeSelectLoaderType()

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    downloadFile: (e, rowdata) => {
      dispatch(setRowData(rowdata)),
        dispatch(submitForFetchFile(e, rowdata));
    },
    reSetSyllabusFile: () => { dispatch(setSyllabusFile('')) }
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
