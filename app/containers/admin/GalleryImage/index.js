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
import Button from '@material-ui/core/Button';
import makeSelectGalleryImage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AdminPrivateLayout } from '../AdminPrivateLayout';
import { Container, Grid } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
export class GalleryImage extends React.PureComponent {
  render() {
    return (
      <AdminPrivateLayout>
        <Container maxWidth="xl"  className="my-0 p-0">
          <Helmet>
            <title>GalleryImage</title>
            <meta name="description" content="Description of GalleryImage" />
          </Helmet>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button variant="contained" color="primary">
                Hello World
              </Button>
            </Grid>
          </Grid>
        </Container>
      </AdminPrivateLayout>
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
