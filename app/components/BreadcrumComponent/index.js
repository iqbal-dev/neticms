/**
 *
 * BreadcrumComponent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class BreadcrumComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="page-title-wrapper">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>{this.props.pageTitle}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcrumb-wrapper">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="offset-lg-4 col-lg-8">
                  <Breadcrumb>
                    {this.props.menuStepFirst ? (
                      <BreadcrumbItem>
                        <a href="#">{this.props.menuStepFirst}</a>
                      </BreadcrumbItem>
                    ) : (
                      ''
                    )}
                    {this.props.menuStepSenond ? (
                      <BreadcrumbItem>
                        <a href="#">{this.props.menuStepSenond}</a>
                      </BreadcrumbItem>
                    ) : (
                      ''
                    )}
                    {this.props.menuStepThird ? (
                      <BreadcrumbItem active>
                        {this.props.menuStepThird}
                      </BreadcrumbItem>
                    ) : (
                      ''
                    )}
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BreadcrumComponent.propTypes = {};

export default BreadcrumComponent;
