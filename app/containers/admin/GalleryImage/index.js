/**
 *
 * GalleryImage
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
import makeSelectGalleryImage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {AdminPrivateLayout} from '../AdminPrivateLayout';
import Button from '@material-ui/core/Button';

/* eslint-disable react/prefer-stateless-function */
export class GalleryImage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>GalleryImage</title>
          <meta name="description" content="Description of GalleryImage" />
        </Helmet>
        <AdminPrivateLayout />
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

GalleryImage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  galleryImage: makeSelectGalleryImage(),
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

const withReducer = injectReducer({ key: 'galleryImage', reducer });
const withSaga = injectSaga({ key: 'galleryImage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GalleryImage);
