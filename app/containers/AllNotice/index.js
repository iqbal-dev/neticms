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
import { getNoticeFileContent, reSetDownloadFile } from './actions';
import { getFileContentType } from '../../utils/FileHandler'

import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';

// Import the CSS
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { centerTableLoader, smallTableLoader, tableLoader } from '../../utils/contentLoader';

let allNoticeDetails = '';
let moreOrLessBtnVisibleOption = true;
let downloadFileContent = '';

/* eslint-disable react/prefer-stateless-function */
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
      // console.log('this.props.location.singleNotice', this.props.location.singleNotice);
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
    let viewerBase64File;
    if (this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId) {
      if (this.props.noticeFileContent && this.props.noticeFileContent.file) {
        let contentType = getFileContentType(this.props.noticeFileContent && this.props.noticeFileContent.noticeFileName);
        viewerBase64File = contentType + this.props.noticeFileContent.file
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

                    {/* <button className="btn btn-secondary mr-2" onClick={(e) => this.viewPdf(e, notice) }>pdf</button> */}
                    {this.props.noticeFileContent && this.props.noticeFileContent.file ?
                      <button className="btn btn-primary mr-2" onClick={() => this.downloadPdf(notice, 'single')}>Download</button>
                      : ""
                    }
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <button className="btn btn-secondary mr-2 d-flex ml-auto" onClick={(e) => this.viewPdf(e, notice)}><i className="fa fa-eye m-1 "></i> PDF</button>

                    {/* <button className="btn btn-primary mr-2" onClick={() => downloadPdf(notice, 'all')}>Download PDF</button> */}

                  </React.Fragment>
                }
              </div>
              {
                type == 'single' ?
                  <div className="col-md-12">
                    {
                      this.props.noticeFileContent && this.props.noticeFileContent.file ?
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                          <Viewer
                            fileUrl={this.base64ToBufferAsync(this.props.noticeFileContent.file)}
                          />
                        </Worker>
                        : ''
                    }
                  </div>
                  :
                  <div className="col-md-12">
                  </div>
              }
            </div>
          </div>
        </div>
      ))
    )
  }

  viewPdf = (e, notice) => {
    this.props.getNoticeFileContent(notice)
    this.setState({ pdfVisible: true })
    // let getContent = await this.props.getNoticeFileContent(notice)
    // let {pdfVisible} = this.state
    // pdfVisible[notice.noticeId.toString()] = true
    // this.setState({ pdfVisible })
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

        // this.props.reSetDownloadFile();
      }
    }
    else {

      // this.props.reSetDownloadFile();
      this.props.getNoticeFileContent(notice)

      if (downloadFileContent && downloadFileContent.file) {
        let contentType = getFileContentType(downloadFileContent.noticeFileName);
        let a = document.createElement("a");

        a.href = contentType + downloadFileContent.file;
        a.download = downloadFileContent.noticeFileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // this.props.reSetDownloadFile();
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

    // console.log('this.props.location', this.props.location);
    allNoticeDetails = JSON.parse(sessionStorage.allNoticeList);
    // console.log('allNoticeDetails', allNoticeDetails);

    let filteredNoticeEle;
    if (this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId) {
      filteredNoticeEle = allNoticeDetails.filter(item => item.noticeId == this.props.location.singleNotice.noticeId)
    }

    downloadFileContent = this.props.noticeFileContent;

    // const getDownloadExecute = async (notice) => {
    // console.log("........else notice", notice);
    // this.props.reSetDownloadFile();
    // this.props.getNoticeFileContent(notice)

    // if (downloadFileContent && downloadFileContent.file) {
    //   let contentType = getFileContentType(downloadFileContent.noticeFileName);
    //   let a = document.createElement("a");

    //   a.href = contentType + downloadFileContent.file;
    //   a.download = downloadFileContent.noticeFileName;
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();

    //   this.props.reSetDownloadFile();
    // }
    // }

    const toggle = () => { this.setState({ pdfVisible: !this.state.pdfVisible }) };

    return (
      <AppLayout>
        <div>

          <BreadcrumComponent
            pageTitle="All Notice"
            menuStepFirst="More"
            menuStepSenond="More"
            menuStepThird="All Notice"
          />

          <section>
            <div className="container-fluid">

              <div className="container p-t-10">

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
                    {allNoticeDetails && allNoticeDetails.length && moreOrLessBtnVisibleOption ?

                      <div className="text-center m-t-40">
                        {this.state.exploreBtnVisible ?
                          <button
                            class="btn explore-btn-lg"
                            onClick={this.exploreAllBtnClick}
                          >
                            Explore all <i class="fas fa-angle-right"></i>
                          </button>

                          :
                          <button
                            class="btn explore-btn-lg"
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
                    <div className="custom-title-border-center"></div>
                  </div>
                </div>
              </div>

            </div>

            <div>
              {/* <Button color="danger" onClick={toggle}>check</Button> */}
              <Modal isOpen={this.state.pdfVisible} toggle={toggle} style={{ width: "90%" }}>
                <ModalHeader toggle={toggle}>PDF Viewer</ModalHeader>
                <ModalBody>
                  {
                    this.state.pdfVisible ?

                      <div className="col-md-12">
                        {this.props.loaderType === 'loaderOn' ? tableLoader() :
                          this.props.noticeFileContent && this.props.noticeFileContent.file ?
                            <React.Fragment>
                              <button className="btn btn-primary my-2" onClick={() => this.downloadPdf(this.props.noticeFileContent, 'single')}>Download</button>
                              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                                <Viewer
                                  fileUrl={this.base64ToBufferAsync(this.props.noticeFileContent.file)}
                                />
                              </Worker>
                            </React.Fragment>
                            : ''
                        }
                      </div>

                      :
                      ""
                  }
                </ModalBody>
                <ModalFooter>
                  {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
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
    reSetDownloadFile: () => { dispatch(reSetDownloadFile('')) }
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
