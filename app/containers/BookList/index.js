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
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import bookImage from '../../assets/img/book-image.png';
import bookImageBig from '../../assets/img/book-image-big.png';
import { setModalVisibleStatus, setSubmitClassBtn } from './actions';

const modal = false;
const toggle = false;
const className = '';

/* eslint-disable react/prefer-stateless-function */
export class BookList extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('allBookList', this.props.allBookList);

    return (
      <div>
        <Helmet>
          <title>BookList</title>
          <meta name="description" content="Description of BookList" />
        </Helmet>
        <BreadcrumComponent
          pageTitle="Booklist of All Classes"
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
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                        <li>
                          <i className="fas fa-angle-right" /> Class One
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="content-wrapper content-padding-sm">
                    <div className="book-list-wrapper">
                      <div className="table-responsive">
                        <table className="book-list w-100">
                          <tr>
                            <td>
                              <div className="book-image-wrapper">
                                <div className="book-list-image">
                                  <img src={bookImage} className="img-fluid" />
                                  <button
                                    className="book-image-zoom"
                                    onClick={this.props.onChangeModalStatus}
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
                                      Amar Bangla Boi{' '}
                                      <span>(আমার বাংলা বই)</span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Book Type</td>
                                  <td>: Board</td>
                                </tr>
                                <tr>
                                  <td>Publisher</td>
                                  <td>: Khelaghore</td>
                                </tr>
                                <tr>
                                  <td>Published Year</td>
                                  <td>: 2017</td>
                                </tr>
                                <tr>
                                  <td>Price (Approx)</td>
                                  <td>: 50/-BDT</td>
                                </tr>
                                <tr>
                                  <td>Author</td>
                                  <td>
                                    : A.K.S Khan Lodi....
                                    <a href="#">more</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="book-image-wrapper">
                                <div className="book-list-image">
                                  <img src={bookImage} className="img-fluid" />
                                  <button
                                    className="book-image-zoom"
                                    onClick={this.props.onChangeModalStatus}
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
                                      Amar Bangla Boi{' '}
                                      <span>(আমার বাংলা বই)</span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Book Type</td>
                                  <td>: Board</td>
                                </tr>
                                <tr>
                                  <td>Publisher</td>
                                  <td>: Khelaghore</td>
                                </tr>
                                <tr>
                                  <td>Published Year</td>
                                  <td>: 2017</td>
                                </tr>
                                <tr>
                                  <td>Price (Approx)</td>
                                  <td>: 50/-BDT</td>
                                </tr>
                                <tr>
                                  <td>Author</td>
                                  <td>
                                    : A.K.S Khan Lodi....
                                    <a href="#">more</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="book-image-wrapper">
                                <div className="book-list-image">
                                  <img src={bookImage} className="img-fluid" />
                                  <button
                                    className="book-image-zoom"
                                    onClick={this.props.onChangeModalStatus}
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
                                      Amar Bangla Boi{' '}
                                      <span>(আমার বাংলা বই)</span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Book Type</td>
                                  <td>: Board</td>
                                </tr>
                                <tr>
                                  <td>Publisher</td>
                                  <td>: Khelaghore</td>
                                </tr>
                                <tr>
                                  <td>Published Year</td>
                                  <td>: 2017</td>
                                </tr>
                                <tr>
                                  <td>Price (Approx)</td>
                                  <td>: 50/-BDT</td>
                                </tr>
                                <tr>
                                  <td>Author</td>
                                  <td>
                                    : A.K.S Khan Lodi....
                                    <a href="#">more</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
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
                    <tr>
                      <td>
                        <div className="book-image-wrapper">
                          <div className="book-list-image">
                            <img src={bookImageBig} className="img-fluid" />
                            <button
                              className="book-image-zoom"
                              onClick={this.props.onChangeModalStatus}
                            >
                              <i className="fas fa-search" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <table className="book-details">
                          <tr>
                            <td colSpan="2">
                              <span className="title">
                                Amar Bangla Boi <span>(আমার বাংলা বই)</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Book Type</td>
                            <td>: Board</td>
                          </tr>
                          <tr>
                            <td>Publisher</td>
                            <td>: Khelaghore</td>
                          </tr>
                          <tr>
                            <td>Published Year</td>
                            <td>: 2017</td>
                          </tr>
                          <tr>
                            <td>Price (Approx)</td>
                            <td>: 50/-BDT</td>
                          </tr>
                          <tr>
                            <td valign="top">Author</td>
                            <td>
                              : A.K.S Khan Lodi, Shoriful Khan, Rajib Poddar,
                              Sultana Rajia
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
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
      </div>
    );
  }
}

BookList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookList: makeSelectBookList(),
  allBookList: makeSelectAllBookList(),
  modalVisibleStatus: makeSelectModalVisibleStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeModalStatus: () => dispatch(setModalVisibleStatus()),
    onChangeSelectCalss: ()=> dispatch(setSubmitClassBtn()),
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
