/**
 *
 * ProgressBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Container, Grid, Box } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

/* eslint-disable react/prefer-stateless-function */
class ProgressBar extends React.Component {
  render() {
    return (
      <Grid container spacing={3} className="px-3 py-3">
            <Grid item xs={12}>
              <Box className="">
                <LinearProgress variant="determinate" value={this.props.value} />
              </Box>
            </Grid>
          </Grid>
    );
  }
}

ProgressBar.propTypes = {};

export default ProgressBar;
