/**
 *
 * DownloadCorner
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
import makeSelectDownloadCorner, { makeSelectDownloadList, makeSelectGetDownloadFile, makeSelectLoaderTypee } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Table } from 'reactstrap';
import { AppLayout } from '../AppLayout';
import { concat } from 'lodash';
import {
  makeClickDownloadButton, getDownloadFile
} from "./actions"
import { getFileContentType } from '../../utils/FileHandler'
import { centerTableLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */

let downloadRowData = {}
export class DownloadCorner extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      exploreBtnShow: true,
    }

    this.showTableColumnsFirstFive = this.showTableColumnsFirstFive.bind(this);
    this.showTableColumnsAll = this.showTableColumnsAll.bind(this);

  }

  showTableColumnsFirstFive() {

    return this.props.downloadList && this.props.downloadList.slice(0, 5).map((item, index) => (

      <tr>
        <td>{index > 9 ? index + 1 : '0' + (index + 1)}</td>
        <td>{item.fileTitle}</td>
        <td className="text-center">
          {
            !item.fileName ? "No Attachment Found" :
              <button class="btn explore-btn" onClick={e => this.props.downloadFile(e, item)}>
                <i class="fas fa-download pr-2"></i>DOWNLOAD
              </button>
          }

        </td>
      </tr>

    ))

  }

  showTableColumnsAll() {

    return this.props.downloadList && this.props.downloadList.map((item, index) => (
      <tr>
        <td>{index > 9 ? index + 1 : '0' + (index + 1)}</td>
        <td>{item.fileTitle}</td>
        <td className="text-center">
          {
            !item.fileName ? "No Attachment Found" :
              <button class="btn explore-btn" onClick={e => this.props.downloadFile(e, item)}>
                <i class="fas fa-download pr-2"></i>DOWNLOAD
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

    let downloadLists = this.props.downloadList;
    let downloadFileContent = this.props.getDownloadFile;

    if (!downloadFileContent == '') {

      let contentType = getFileContentType(downloadRowData.fileName);
      let a = document.createElement("a");

      a.href = contentType + downloadFileContent;
      a.download = downloadRowData.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      this.props.reSetDownloadFile();

    }

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>Download Corner</title>
            <meta name="description" content="Description of Download Corner" />
          </Helmet>
          <BreadcrumComponent pageTitle="Download Corner" menuStepFirst="More" menuStepSenond="More" menuStepThird="Download Corner" />
          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title">
                      <h2 className="text-orange">Download Corner</h2>
                      <div className="custom-title-border-left"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {this.props.loaderType === 'autoLoadOn' ? centerTableLoader() :
                      <div className="table-responsive custom-table">
                        <Table striped className="download-corner-table">
                          <thead>
                            <tr>
                              <th>Sl No.</th>
                              <th>Title</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>

                            {this.state.exploreBtnShow ?

                              this.showTableColumnsFirstFive()
                              :
                              this.showTableColumnsAll()
                            }

                            {/* {
                            downloadLists && downloadLists.map((item, index) => {
                              return (
                                <tr>
                                  <td>{index > 9 ? index + 1 : '0' + (index + 1)}</td>
                                  <td>{item.fileTitle}</td>
                                  <td className="text-center">
                                    {
                                      !item.fileName ? "No Attachment Found" :
                                        <button class="btn explore-btn" onClick={e => this.props.downloadFile(e, item)}>
                                          <i class="fas fa-download pr-2"></i>DOWNLOAD
                                      </button>
                                    }

                                  </td>
                                </tr>
                              )
                            }
                            )
                          } */}

                          </tbody>
                        </Table>
                      </div>
                    }

                  </div>

                </div>
                {downloadLists.length > 5 ?
                  <div className="row m-t-40">
                    <div className="col-md-12">
                      <div className="text-center">
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
                  : null
                }
              </div>

              <div className="container">
                <div className="row">
                  <div className="offset-md-1 col-md-10">
                    <div className="custom-title-border-center mb-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AppLayout>
      </div>
    );
  }
}

DownloadCorner.propTypes = {
  dispatch: PropTypes.func.isRequired,
  downloadList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  downloadCorner: makeSelectDownloadCorner(),
  downloadList: makeSelectDownloadList(),
  getDownloadFile: makeSelectGetDownloadFile(),
  loaderType: makeSelectLoaderTypee()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    downloadFile: (e, item) => {
      dispatch(makeClickDownloadButton(e, item));
      downloadRowData = item;
    },
    reSetDownloadFile: () => { dispatch(getDownloadFile('')) }

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'downloadCorner', reducer });
const withSaga = injectSaga({ key: 'downloadCorner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DownloadCorner);
