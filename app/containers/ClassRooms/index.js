/**
 *
 * ClassRooms
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
import makeSelectClassRooms from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import image from './slider-image.png';

/* eslint-disable react/prefer-stateless-function */
export class ClassRooms extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>ClassRooms</title>
          <meta name="description" content="Description of ClassRooms" />
        </Helmet>
        <BreadcrumComponent pageTitle="Class Room" menuStepFirst="Home" menuStepSenond="Basic Infrastructure" menuStepThird="Class Room" />
        <section>
          <div className="container-fluid">
            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Class Room</h2>
                    <div className="custom-title-border-left"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="class-rooms-slider">
                    <Carousel>
                      <div>
                        <img src={image} />
                      </div>
                      <div>
                        <img src={image} />
                      </div>
                      <div>
                        <img src={image} />
                      </div>
                      <div>
                        <img src={image} />
                      </div>
                    </Carousel>
                  </div>
                </div>
              </div>
              <div className="row p-t-100">
                <div className="col-md-12">
                  <div className="page-main-text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
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
      </div>
    );
  }
}

ClassRooms.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  classRooms: makeSelectClassRooms(),
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

const withReducer = injectReducer({ key: 'classRooms', reducer });
const withSaga = injectSaga({ key: 'classRooms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClassRooms);
