/**
 *
 * BookList
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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import makeSelectBookList, {
  makeSelectModalVisibleStatus,
  makeSelectAllBookList,
  makeSelectAllClassList,
  makeSelectBookListByClassId,
  makeSelectBookListLoaderType,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import bookImage from '../../assets/img/demo-book.png';
import bookImageBig from '../../assets/img/demo-book.png';
import { setModalVisibleStatus, setSubmitClassBtn, fetchBookListByClassId } from './actions';
import { AppLayout } from '../AppLayout';
import { centerTableLoader, tableLoader } from '../../utils/contentLoader';

const modal = false;
const toggle = false;
const className = '';
let classId = '';
let booklist = [];
let singleBook = [];

/* eslint-disable react/prefer-stateless-function */
export class BookList extends React.Component {
  constructor() {
    super();
  }

  getBookListHandler = (value) => {
    classId = value;
    this.props.onClickFetchBookList(classId);
  }

  singleBookHandler = (value) => {
    singleBook = [];
    this.props.onChangeModalStatus();
    singleBook.push(booklist[value]);
  }

  render() {
    let classList = this.props.allClassList;
    booklist = this.props.allBookList;

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>BookList</title>
            <meta name="description" content="Description of BookList" />
          </Helmet>
          <BreadcrumComponent
            pageTitle="Book List of All Classes"
            menuStepFirst="Academic Info"
            menuStepSenond="Details Info"
            menuStepThird="Book List"
          />
          <section>
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="sidebar-menu-wrapper">
                      <div className="sidebar-title">
                        <h3>Select Class</h3>
                      </div>
                      <div className="custom-title-border-left">
                        <ul className="nav-item-list">
                          {
                            classList && classList.map(item => {
                              return (
                                <li onClick={() => this.getBookListHandler(item.classId)}>
                                  <i className="fas fa-angle-right" /> {item.className}
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    {this.props.loaderType === 'autoLoadOn' ? <div className='m-t-30'> {tableLoader()}</div> :

                      booklist.length > 0 ? <div className="content-wrapper content-padding-sm">
                        <div className="book-list-wrapper">
                          <div className="table-responsive">
                            <table className="book-list w-100">
                              {
                                booklist && booklist.map((item, index) => {
                                  return (
                                    <tr>
                                      <td>
                                        <div className="book-image-wrapper">
                                          <div className="book-list-image">
                                            <img src={bookImage} className="img-fluid" />
                                            <button
                                              className="book-image-zoom"
                                              onClick={() => this.singleBookHandler(index)}
                                            >
                                              <i className="fas fa-search" />
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <table className="book-details w-100">
                                          <tr>
                                            <td colSpan="2">
                                              <span className="title">
                                                {item.bookName}
                                                {/* Amar Bangla Boi{' '}
                                      <span>(আমার বাংলা বই)</span> */}
                                              </span>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Book Type</td>
                                            <td>: {item.bookType}</td>
                                          </tr>
                                          <tr>
                                            <td>Publisher</td>
                                            <td>: {item.publicationName}</td>
                                          </tr>
                                          <tr>
                                            <td>Published Year</td>
                                            <td>: {item.publicationYear}</td>
                                          </tr>
                                          <tr>
                                            <td>Price (Approx)</td>
                                            <td>: {item.bookPrice ? item.bookPrice : '00:00'} /-BDT</td>
                                          </tr>
                                          <tr>
                                            <td>Author</td>
                                            <td>
                                              : {item.authorName}
                                              {/* <a href="#">more</a> */}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  )
                                })}
                            </table>
                          </div>
                        </div>
                      </div>
                        : <div className="content-wrapper content-padding-sm info-header-title">
                          <div className="row">
                            <h5 className="col-lg-12">
                              <span className="text-orange">
                                Select Class First
                            </span>
                            </h5>
                          </div>
                        </div>}

                  </div>

                </div>
              </div>
            </div>
          </section>

          <Modal
            className="booklist-popup-wrapper modal-dialog-centered"
            isOpen={this.props.modalVisibleStatus}
            toggle={this.props.onChangeModalStatus}
          >
            <button
              className="close-btn"
              onClick={this.props.onChangeModalStatus}
            >
              <i className="fas fa-times" />
            </button>
            <ModalBody>
              <div className="content-wrapper content-padding-sm pt-0 pb-0">
                <div className="book-list-wrapper">
                  <div className="table-responsive">
                    <table className="book-list w-100">

                      {singleBook && singleBook.map(item => {
                        return (
                          <tr>
                            <td>
                              <div className="book-image-wrapper">
                                <div className="book-list-image">
                                  <img src={bookImageBig} className="img-fluid" />
                                </div>
                              </div>
                            </td>
                            <td>
                              <table className="book-details">
                                <tr>
                                  <td colSpan="2">
                                    <span className="title">
                                      {item.bookName}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Book Type</td>
                                  <td>: {item.bookType}</td>
                                </tr>
                                <tr>
                                  <td>Publisher</td>
                                  <td>: {item.publicationName}</td>
                                </tr>
                                <tr>
                                  <td>Published Year</td>
                                  <td>: {item.publicationYear}</td>
                                </tr>
                                <tr>
                                  <td>Price (Approx)</td>
                                  <td>: {item.bookPrice ? item.bookPrice : '00:00'}</td>
                                </tr>
                                <tr>
                                  <td valign="top">Author</td>
                                  <td>
                                    : {item.authorName}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        )

                      })}
                    </table>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
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

BookList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allClassList: PropTypes.any,
  allBookList: PropTypes.any,
  onClickFetchBookList: PropTypes.func,
  onChangeModalStatus: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  bookList: makeSelectBookList(),
  allClassList: makeSelectAllClassList(),
  modalVisibleStatus: makeSelectModalVisibleStatus(),
  onClickFetchBookList: makeSelectBookListByClassId(),
  allBookList: makeSelectAllBookList(),
  loaderType: makeSelectBookListLoaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeModalStatus: () => dispatch(setModalVisibleStatus()),
    onClickFetchBookList: () => dispatch(fetchBookListByClassId(classId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bookList', reducer });
const withSaga = injectSaga({ key: 'bookList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BookList);
