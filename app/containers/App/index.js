/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Header from 'containers/Header';
import Menu from 'containers/Menu';
import Footer from 'containers/Footer';
import Slider from 'components/Slider';
import AppRoute from '../AppRoute';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 auto;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      {/* <Header /> */}
      {/* <Menu /> */}
      <AppRoute />
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
