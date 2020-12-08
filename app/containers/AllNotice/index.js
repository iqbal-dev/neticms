/**
 *
 * AllNotice
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
import makeSelectAllNotice, { makeSelectNoticeFileContent, makeSelectAllNoticeLoaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { makeSelectNoticeList } from '../HomePage/selectors';
import { AppLayout } from '../AppLayout';
import { get_YYMMDD_Format_WithHyphen, getFullMonthName } from '../../utils/dateFormat';
import PDFViewer from 'pdf-viewer-reactjs'
import { getNoticeFileContent, reSetDownloadFile, setNoticeFileContent } from './actions';
import { getFileContentType, getFileTypeOnly } from '../../utils/FileHandler'

import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';

// Import the CSS
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { centerTableLoader, smallTableLoader, tableLoader } from '../../utils/contentLoader';
import { BASE_URL_NETI_CMS, fetch_notice_file_content } from '../../utils/serviceUrl';

let allNoticeDetails = '';
let moreOrLessBtnVisibleOption = true;
let downloadFileContent = '';
let viewFileType = '';

export class AllNotice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pdfVisible: false,
      noticeQty: 5,
      exploreBtnVisible: true,
    }
  }

  componentDidMount() {
    if (this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId) {
      this.props.getNoticeFileContent(this.props.location.singleNotice)
    }
  }

  getPlainTextFromHtml = (html) => {
    var temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent;
  }

  formatDate = (evtDetails) => {

    if (evtDetails) {

      let formatDate = get_YYMMDD_Format_WithHyphen(evtDetails);

      const splitDateArr = formatDate.split('-');
      let eventStartDate = getFullMonthName(splitDateArr[1] - 1) + ' ' + splitDateArr[2] + ', ' + splitDateArr[0];
      return eventStartDate;

    }

  }

  nextClick = () => {
    return (
      <button className="btn btn-primary"> test </button>
    )
  }

  getNoticeView = (notice, type) => {

    { type === 'single' ? moreOrLessBtnVisibleOption = false : moreOrLessBtnVisibleOption = true }

    if (this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId) {
      if (this.props.noticeFileContent && this.props.noticeFileContent.file) {
        let contentType = getFileContentType(this.props.noticeFileContent && this.props.noticeFileContent.noticeFileName);
        let viewerBase64File = contentType + this.props.noticeFileContent.file
      }
    }

    return (
      notice.slice(0, this.state.noticeQty).map(notice => (

        <div className='all-notice-wrapper m-b-20'>
          <div className='notice-wrapper' style={{ backgroundColor: "#ffffff" }}>
            <div className="row" >
              <div className="col-md-12 mb-3 px-4">
                <div className="event-date mt-3">Published on  <i className="fas fa-calendar-alt" /> {this.formatDate(notice.noticeIssueDate)} </div>
                <h2 className='p-t-20'>{notice.noticeTitle}</h2>
                <p>{this.getPlainTextFromHtml(notice.noticeDetails)}</p>

                {type == 'single' ?
                  <React.Fragment>
                    {this.props.loaderType === 'loaderOn' ? centerTableLoader() :

                      <div>
                        {this.props.noticeFileContent && this.props.noticeFileContent.file ?

                          viewFileType === 'image' ?
                            <div className='notice-img-view'>
                              <button className="btn btn-primary mr-2 m-b-20 d-flex ml-auto" onClick={() => this.downloadPdf(notice, 'single')}><i className="fas fa-download m-1 "></i>Download</button>
                              <img src={"data:image/*;base64," + this.props.noticeFileContent.file} />
                            </div>
                            : viewFileType === 'pdf' ?
                              <div>
                                <button className="btn btn-primary mr-2 m-b-20 d-flex ml-auto" onClick={() => this.downloadPdf(notice, 'single')}><i className="fas fa-download m-1 "></i>Download</button>
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                                  <Viewer
                                    fileUrl={this.base64ToBufferAsync(this.props.noticeFileContent.file)}
                                  />
                                </Worker>
                              </div>

                              : <button className="btn btn-primary  mr-2 d-flex ml-auto m-b-20" onClick={() => this.downloadPdf(notice, 'single')}><i className="fas fa-download m-1 "></i>Download</button>

                          : 'file content not found'
                        }
                      </div>

                    }
                  </React.Fragment>
                  :
                  <React.Fragment>
                    {getFileTypeOnly(notice.noticeFileName) === 'pdf' || getFileTypeOnly(notice.noticeFileName) === 'image' ?
                      <button className="btn btn-secondary mr-2 d-flex ml-auto" onClick={(e) => this.viewPdf(e, notice)}><i className="fa fa-eye m-1 "></i> View</button>
                      : <button className="btn btn-primary  mr-2 d-flex ml-auto m-b-20" onClick={() => this.downloadDocFromALlNotice(notice)}><i className="fas fa-download m-1 "></i>Download</button>}
                  </React.Fragment>
                }
              </div>

            </div>
          </div>
        </div>
      ))
    )
  }

  viewPdf = (e, notice) => {
    this.props.getNoticeFileContent(notice)
    this.setState({ pdfVisible: true })
  }

  base64ToBufferAsync = (base64) => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  downloadDocFromALlNotice = (notice) => {

    fetch(BASE_URL_NETI_CMS.concat(fetch_notice_file_content).concat('?noticeId=').concat(notice.noticeId), {
      method: 'GET',
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(res => {

      console.log('fetch', res);
      if (res.status === 302) {

        return res.json().then(body => {

          let contentType = getFileContentType(notice.noticeFileName);
          let a = document.createElement("a");

          a.href = contentType + body.file;
          a.download = notice.noticeFileName;
          document.body.appendChild(a);
          a.click();
          a.remove();

        })

      }

    }).catch(error => {
      console.log('file content not fetch', error);
    });

  }

  downloadPdf = (notice, type) => {

    if (type == "single") {

      if (downloadFileContent && downloadFileContent.file) {
        let contentType = getFileContentType(downloadFileContent.noticeFileName);
        let a = document.createElement("a");

        a.href = contentType + downloadFileContent.file;
        a.download = downloadFileContent.noticeFileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

      }
    }
    else {

      this.props.getNoticeFileContent(notice);

      if (downloadFileContent && downloadFileContent.file) {
        let contentType = getFileContentType(downloadFileContent.noticeFileName);
        let a = document.createElement("a");

        a.href = contentType + downloadFileContent.file;
        a.download = downloadFileContent.noticeFileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

      }

    }
  }

  exploreAllBtnClick = () => {
    this.setState({ exploreBtnVisible: false });
    this.setState({ noticeQty: allNoticeDetails.length });
    this.getNoticeView(allNoticeDetails);
  }

  exploreLessBtnClick = () => {
    this.setState({ exploreBtnVisible: true });
    this.setState({ noticeQty: 5 });
    this.getNoticeView(allNoticeDetails);
  }

  render() {

    allNoticeDetails = JSON.parse(sessionStorage.allNoticeList);

    let filteredNoticeEle;
    if (this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId) {
      filteredNoticeEle = allNoticeDetails.filter(item => item.noticeId == this.props.location.singleNotice.noticeId)
    }

    downloadFileContent = this.props.noticeFileContent;

    if (this.props.noticeFileContent) {
      viewFileType = getFileTypeOnly(this.props.noticeFileContent.noticeFileName);
    }
    const toggle = () => {

      this.setState({ pdfVisible: !this.state.pdfVisible });
      this.props.reSetDownloadFileContent();

    };

    return (
      <AppLayout>
        <div>

          <BreadcrumComponent
            pageTitle="All Notice"
            menuStepFirst="More"
            menuStepSenond="All Notice"
          />

          <section>
            <div className="container-fluid">

              <div className="container m-t-40">

                <div className="row" >
                  <div className="col-md-12 all-notice-bg">

                    {
                      filteredNoticeEle ?
                        this.getNoticeView(filteredNoticeEle, 'single')
                        : this.getNoticeView(allNoticeDetails, 'all')
                    }

                  </div>

                </div>

                <div className="row m-t-40">
                  <div className="col-md-12">
                    {allNoticeDetails && allNoticeDetails.length > 5 && moreOrLessBtnVisibleOption ?

                      <div className="text-center m-t-40">
                        {this.state.exploreBtnVisible ?
                          <button
                            class="btn explore-btn"
                            onClick={this.exploreAllBtnClick}
                          >
                            Explore all <i class="fas fa-angle-right"></i>
                          </button>

                          :
                          <button
                            class="btn explore-btn"
                            onClick={this.exploreLessBtnClick}
                          >
                            Explore less <i class="fas fa-angle-right"></i>
                          </button>
                        }

                      </div>
                      : ''
                    }
                  </div>
                </div>

              </div>

              <div className="container">
                <div className="row">
                  <div className="offset-md-1 col-md-10">
                    <div className="custom-title-border-center mb-2"></div>
                  </div>
                </div>
              </div>

            </div>

            <div>

              <Modal isOpen={this.state.pdfVisible} toggle={toggle} style={{ width: "90%" }}>
                <ModalHeader toggle={toggle}>PDF/Image Viewer</ModalHeader>
                <ModalBody>
                  {
                    this.state.pdfVisible ?

                      <div className="col-md-12">
                        {this.props.loaderType === 'loaderOn' ? tableLoader() :
                          this.props.noticeFileContent && this.props.noticeFileContent.file ?
                            <React.Fragment>
                              <button className="btn btn-primary d-flex ml-auto my-2" onClick={() => this.downloadPdf(this.props.noticeFileContent, 'single')}><i className="fas fa-download m-1 "></i>Download</button>
                              {viewFileType === 'image' ?
                                <div className='notice-img-view'> <img src={"data:image/*;base64," + this.props.noticeFileContent.file} /></div>
                                : viewFileType === 'pdf' ?
                                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                                    <Viewer
                                      fileUrl={this.base64ToBufferAsync(this.props.noticeFileContent.file)}
                                    />
                                  </Worker>
                                  : ''
                              }
                            </React.Fragment>
                            : 'no file content available'
                        }
                      </div>

                      :
                      ""
                  }
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>

          </section>
        </div >
      </AppLayout>
    );
  }
}

AllNotice.propTypes = {
  dispatch: PropTypes.func.isRequired,
  noticeList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  allNotice: makeSelectAllNotice(),
  noticeList: makeSelectNoticeList(),
  noticeFileContent: makeSelectNoticeFileContent(),
  loaderType: makeSelectAllNoticeLoaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNoticeFileContent: e => dispatch(getNoticeFileContent(e)),
    reSetDownloadFileContent: () => { dispatch(setNoticeFileContent('')) }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'allNotice', reducer });
const withSaga = injectSaga({ key: 'allNotice', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AllNotice);
