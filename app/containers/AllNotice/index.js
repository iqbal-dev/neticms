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
import makeSelectAllNotice, { makeSelectNoticeFileContent } from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { makeSelectNoticeList } from '../HomePage/selectors';
import { AppLayout } from '../AppLayout';
import { get_YYMMDD_Format_WithHyphen, getFullMonthName } from '../../utils/dateFormat';
import PDFViewer from 'pdf-viewer-reactjs'
import { getNoticeFileContent } from './actions';
import { getFileContentType } from '../../utils/FileHandler'

import { Worker } from '@phuocng/react-pdf-viewer';
import Viewer from '@phuocng/react-pdf-viewer';

// Import the CSS
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

/* eslint-disable react/prefer-stateless-function */
export class AllNotice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfVisible: {}
    }
  }

  getPlainTextFromHtml = (html) => {
    var temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent;
  }

  formatDate = (evtDetails) => {

    if (evtDetails) {

      let formatDate = get_YYMMDD_Format_WithHyphen(evtDetails.eventStartDate);

      const splitDateArr = formatDate.split('-');
      let eventStartDate = getFullMonthName(splitDateArr[1] - 1) + ' ' + splitDateArr[2] + ', ' + splitDateArr[0];
      return eventStartDate;

    }

  }

  nextClick = () =>{
    console.log("next click");
    return(
      <button className="btn btn-primary"> test </button>
    )
  }

  componentDidMount(){
    if(this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId){
      console.log('this.props.location.singleNotice', this.props.location.singleNotice);
      this.props.getNoticeFileContent(this.props.location.singleNotice)
    }
  }

  viewPdf = (e, notice) =>{
    this.props.getNoticeFileContent(notice)
    // let {pdfVisible} = this.state
    // pdfVisible[notice.noticeId.toString()] = true
    // this.setState({ pdfVisible })
  }

  async downloadPdf(e, notice){
    
    let downloadFileContent = await this.props.noticeFileContent;
    let getContent = await this.props.getNoticeFileContent(notice)
    console.log("........", getContent, downloadFileContent);

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

  base64ToBufferAsync(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  getNoticeView = (notice, type) => {
    // console.log("contentType......", contentType+this.props.noticeFileContent.file);
    let viewerBase64File
    if (this.props.noticeFileContent && this.props.noticeFileContent.file) {
      let contentType = getFileContentType(this.props.noticeFileContent && this.props.noticeFileContent.noticeFileName);
      viewerBase64File = contentType + this.props.noticeFileContent.file
      // console.log("contentType......", contentType + this.props.noticeFileContent.file);
    }

    return(
      notice.map(notice => (
        <div className='all-notice-wrapper m-b-20'>
          <div className='notice-wrapper'>
            <div className="row" >
              <div className="col-md-12 mb-3">
                <div className="event-date">Published on  <i className="fas fa-calendar-alt" /> {this.formatDate(notice.noticeIssueDate)} </div>
                <h2 className='p-t-20'>{notice.noticeTitle}</h2>
                <p>{this.getPlainTextFromHtml(notice.noticeDetails)}</p>
                { type == 'single' ? 
                  <React.Fragment>
                    {/* <button className="btn btn-secondary mr-2" onClick={(e) => this.viewPdf(e, notice) }>pdf</button> */}
                    {this.props.noticeFileContent && this.props.noticeFileContent.file ?
                      <button className="btn btn-primary mr-2" onClick={(e) => this.downloadPdf(e, notice)}>Download PDF</button>
                      : ""
                    }
                  </React.Fragment>
                  :""  
                }
              </div>
              {
                type == 'single' ?
                  <div className="col-md-12">
                    { 
                      this.props.noticeFileContent && this.props.noticeFileContent.file? 
                        
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                            <Viewer 
                              fileUrl={ this.base64ToBufferAsync(this.props.noticeFileContent.file) }
                            />
                        </Worker>
                      : ''
                    }
                    
                  </div>
                  : 
                  <div className="col-md-12">
                    { 
                      // Object.keys(this.state.pdfVisible)[notice.noticeId] == notice.noticeId? 
                      //   Object.keys(this.state.pdfVisible)[notice.noticeId]
                      // : Object.keys(this.state.pdfVisible)[notice.noticeId]
                    }
                    
                  </div>
              }
              
            </div>

          </div>

        </div>
      ))
    )
  }

  render() {

    // console.log('noticeList-noticeFileContent ', this.props.noticeFileContent);
    let allNoticeDetails = JSON.parse(sessionStorage.allNoticeList);

    let filteredNoticeEle
    if(this.props.location && this.props.location.singleNotice && this.props.location.singleNotice.noticeId){
      filteredNoticeEle = allNoticeDetails.filter(item => item.noticeId == this.props.location.singleNotice.noticeId)
      // console.log('filteredEle', filteredNoticeEle);
    }
    

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
                        :this.getNoticeView(allNoticeDetails, 'all')
                      
                    }

                  </div>

                </div>

                <div className="row m-t-40">
                  <div className="col-md-12">
                    <div className="text-center m-t-40">
                      <button class="btn explore-btn-lg">Explore all <i class="fas fa-angle-right"></i></button>
                    </div>
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNoticeFileContent: e => dispatch(getNoticeFileContent(e))
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
