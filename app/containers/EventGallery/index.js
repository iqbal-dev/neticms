/**
 *
 * EventGallery
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import makeSelectEventGallery, {
  makeSelectModalVisiableStatus,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import eventGallery from '../../assets/img/event-gallery-1.png';
import image from './slider-image.png';
import { setModalVisiableStatus } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EventGallery extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>EventGallery</title>
          <meta name="description" content="Description of EventGallery" />
        </Helmet>
        <BreadcrumComponent
          pageTitle="Event Gallery"
          menuStepFirst="Home"
          menuStepSenond="Administration"
          menuStepThird="Event Gallery"
        />
        <div className="container p-t-60 content-wrapper ">
          <div className="row">
            <div className="col-md-4">
              <div className="book-list-wrapper m-b-30">
                <div className="book-list-image">
                  <img
                    src={eventGallery}
                    className="img-fluid w-100"
                    alt="Event Gallery"
                  />
                  <Button
                    className="book-image-zoom"
                    onClick={this.props.onChangemodalVisiable}
                  >
                    <i className="fas fa-search" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-t-40">
            <div className="col-md-12">
              <div className="text-center m-t-40">
                <button className="btn explore-btn">
                  Explore all <i className="fas fa-angle-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="event-gallery-modal modal-dialog-centered"
          isOpen={this.props.modalVisiable}
          toggle={this.props.onChangemodalVisiable}
        >
          <Button
            className="close-btn"
            onClick={this.props.onChangemodalVisiable}
          >
            <i className="fas fa-times" />
          </Button>
          <ModalBody>
            <div className="content-wrapper content-padding-sm pt-0 pb-0">
              <div className="row">
                <div className="col-md-12">
                  <div className="no-thumble no-radius">
                    <Carousel>
                      <div>
                        <img src={image} alt="Event Gallery one" />
                      </div>
                      <div>
                        <img src={image} alt="Event Gallery two" />
                      </div>
                      <div>
                        <img src={image} alt="Event Gallery three" />
                      </div>
                      <div>
                        <img src={image} alt="Event Gallery four" />
                      </div>
                    </Carousel>
                  </div>
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

EventGallery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalVisiable: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  eventGallery: makeSelectEventGallery(),
  modalVisiable: makeSelectModalVisiableStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangemodalVisiable: () =>
      dispatch(setModalVisiableStatus('modalVisiable')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'eventGallery', reducer });
const withSaga = injectSaga({ key: 'eventGallery', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EventGallery);
