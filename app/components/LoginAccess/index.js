/**
 *
 * LoginAccess
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import login1 from './login-pic-1.jpg';
import login2 from './login-pic-2.jpg';
import login3 from './login-pic-3.jpg';
/* eslint-disable react/prefer-stateless-function */
class LoginAccess extends React.PureComponent {
  render() {
    return (
      <section className="p-b-100">
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 p-t-60">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="section-title text-center">
                        <h1>Events</h1>
                      </div>
                      <div className="section-sub-title text-center p-b-70">
                        <p>Keep eyes on all events and try to join those what related with you It will help you to stay updated and learn many things</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 p-b-60">
                      <div className="login-form-wrapper">
                        <div className="login-image">
                          <img src={login1} className="img-fluid w-100" />
                        </div>
                        <div className="login-btn text-center">
                          <button className="btn">Student login</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="login-form-wrapper p-b-60">
                        <div className="login-image">
                          <img src={login2} className="img-fluid w-100" />
                        </div>
                        <div className="login-btn text-center">
                          <button className="btn">Guardian login</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="login-form-wrapper p-b-60">
                        <div className="login-image">
                          <img src={login3} className="img-fluid w-100" />
                        </div>
                        <div className="login-btn text-center">
                          <button className="btn">Teachers login</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="box-shadow">
                    <div className="admission-wrapper">
                      <div className="icon">
                        <i class="fas fa-quote-left"></i>
                      </div>
                      <div class="text text-center">
                        <h1>Don’t miss the chance to become a proud student of our school</h1>
                      </div>
                    </div>
                    <div className="admission-btn-wrapper text-center">
                      <button class="btn explore-btn mb-0">Get Admission <i class="fas fa-angle-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}

LoginAccess.propTypes = {};

export default LoginAccess;
