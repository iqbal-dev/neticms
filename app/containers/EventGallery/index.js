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
  makeSelectModalVisiableStatus, makeSelectGalleryImageList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import staticImg from '../../assets/img/blank-image.png';
import image from './slider-image.png';
import { setModalVisiableStatus } from './actions';
import { AppLayout } from '../AppLayout';

let dialogImageContent = ''
/* eslint-disable react/prefer-stateless-function */
export class EventGallery extends React.PureComponent {

  state = {
    imageCounter: 0,
    type: ''
  }

  getAttr = (e, index, type) => {
    console.log('e:::', e, index)

    this.state.imageCounter = index
    this.state.type = type

    // let link = document.querySelector('#image_' + index);
    //     if (link) {
    //         let target = link.getAttribute('src');
    //         console.log(target);
    //     }
  }
  render() {

    let galleryImageLists = this.props.galleryImageList;
    let unique = galleryImageLists.map(item => item.photoType).filter((value, index, self) => self.indexOf(value) === index)
    // console.log('unique', unique);

    let assigned = {}
    unique.map((uniqueItem, index) => {
      let filteredEle = galleryImageLists.filter(galleryItem => galleryItem.photoType == uniqueItem)
      // console.log('filteredEle', filteredEle);
      // assigned.push(filteredEle)
      assigned[uniqueItem] = filteredEle
    })

    console.log("assigned", assigned);
    

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>PhotoGallery</title>
            <meta name="description" content="Description of EventGallery" />
          </Helmet>
          <BreadcrumComponent
            pageTitle="Photo Gallery"
            menuStepFirst="More"
            menuStepSenond="Gallery"
            menuStepThird="Photo Gallery"
          />
          <div className="container p-t-60 content-wrapper ">
            <div className="row">
              {
                Object.keys(assigned).map((item, index) =>

                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="page-inner-title mb-4">
                      <h2 className="text-orange">{item}</h2>
                      <div className="custom-title-border-left"></div>
                    </div>
                    <div className="image-section">
                      {assigned && assigned[item].map((item1, index1) => {
                        let image = ''
                        item1.fileContent ? image = "data:image/*;base64," + item1.fileContent : image = staticImg
                        return (
                          <div className="image-section-inside" onClick={e => this.getAttr(e, index1, item)}>
                            <img id={"image_" + index1} className="img-fluid event-gallery-image w-100" src={image} width="100%" />
                            <Button
                              className="book-image-zoom"
                              onClick={this.props.onChangemodalVisiable}
                            >
                              <i className="fas fa-search" />
                            </Button>
                          </div>
                        )

                      })
                      }
                    </div>
                  </div>

                )}
            </div>

            {/* <hr/>
            <div className="row">
              {
                Object.keys(assigned).map((item, index) => 
                  <div className="col-md-12">
                    <h4>{item}</h4>
                    <hr/>
                    <div className="row">
                    {
                      assigned && assigned[item].map((item1, index1) =>{
                        let image = ''
                        item1.fileContent ? image = "data:image/*;base64," + item1.fileContent : image = staticImg
                        return(
                          
                          <div className="col-sm-6 col-md-3">
                            <div className="book-list-wrapper event-gallery-wrapper m-b-30">
                              <div className="book-list-image event-gallery-inside" onClick={e => this.getAttr(e, index)}>
                                <img id={"image_" + index} className="img-fluid event-gallery-image" src={image} width="100%" />
                                <Button
                                  className="book-image-zoom"
                                  onClick={this.props.onChangemodalVisiable}
                                >
                                  <i className="fas fa-search" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                    
                  </div>
                )
              }
            </div> */}

            <br/>
            <br/>

            {/* <h4>All Gallery Images</h4>
            <hr/> */}
            <div className="page-inner-title mb-4">
              <h2 className="text-orange">All Gallery Images</h2>
              <div className="custom-title-border-left"></div>
            </div>
            <div className="row">
              
              {galleryImageLists && galleryImageLists.map((item, index) => {

                let image = ''
                item.fileContent ? image = "data:image/*;base64," + item.fileContent : image = staticImg

                return (
                  <div className="col-sm-6 col-md-3">
                    <div className="book-list-wrapper event-gallery-wrapper m-b-30">
                      <div className="book-list-image event-gallery-inside" onClick={e => this.getAttr(e, index, 'all')}>
                        <img id={"image_" + index} className="img-fluid event-gallery-image w-100" src={image} width="100%" />
                        <Button
                          className="book-image-zoom"
                          onClick={this.props.onChangemodalVisiable}
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )

              }

              )}
            </div>
            {/* <div className="row m-t-40">
              <div className="col-md-12">
                <div className="text-center m-t-40">
                  <button className="btn explore-btn">
                    Explore all <i className="fas fa-angle-right" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <Modal
            className="event-gallery-modal modal-dialog-centered"
            isOpen={this.props.modalVisiable}
            toggle={this.props.onChangemodalVisiable}
          // style={{ height : '100%'}}
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
                      <Carousel selectedItem={this.state.imageCounter}>
                        {
                          assigned && assigned[this.state.type] && assigned[this.state.type].length>0 ?
                          assigned && assigned[this.state.type].map((item) =>
                            <div>
                              <img src={item.fileContent ? "data:image/*;base64," + item.fileContent : staticImg} alt="Event Gallery one" width="200px" />
                            </div>

                          )
                          :
                          galleryImageLists && galleryImageLists.map((item) =>
                            <div>
                              <img src={item.fileContent ? "data:image/*;base64," + item.fileContent : staticImg} alt="Event Gallery one" width="200px" />
                            </div>

                          )
                        }
                        {/* <div>
                        <img src={image} alt="Event Gallery two" />
                      </div>
                      <div>
                        <img src={image} alt="Event Gallery three" />
                      </div>
                      <div>
                        <img src={image} alt="Event Gallery four" />
                      </div> */}
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
        </AppLayout>
      </div>
    );
  }
}

EventGallery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalVisiable: PropTypes.any,
  galleryImageList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  eventGallery: makeSelectEventGallery(),
  modalVisiable: makeSelectModalVisiableStatus(),
  galleryImageList: makeSelectGalleryImageList()
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
