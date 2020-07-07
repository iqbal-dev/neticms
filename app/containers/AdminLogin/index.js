/**
 *
 * AdminLogin
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
import makeSelectAdminLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { setUserName, setPassword, submitLogin } from './actions';
import {
  makeSelectUserName,
  makeSelectPassword,
  makeSelectAdminToken,
  makeSelectAdminInfo
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class AdminLogin extends React.Component {

  constructor(props) {
    super();

    this.state = {
      validated: false,
    };
  }

  handleSubmit = event => {
    console.log('event', event);
    // const form = event.currentTarget;
    // console.log('form', form);
    // console.log('form.checkValidity()', form.checkValidity());

    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // this.setState({ validated: true });
    event.preventDefault();
    this.props.submitLoginForm();
  };

  render() {

    console.log('adminToken, adminInfo', this.props.adminToken, this.props.adminInfo);

    return (
      <div>

        <div className="container fluid">
          <div className="container">
            <div className="row">

              <div className='col-md-3' />

              <div className='col-md-6'>
                <div className='m-t-100' style={{ marginTop: '100px' }}>

                  <Form onSubmit={this.handleSubmit} method='POST'>

                    <FormGroup>
                      <Label for="userName">User Name</Label>
                      <Input
                        type="text"
                        name="userName"
                        placeholder="Enter User Name"
                        value={this.props.userName}
                        onChange={this.props.onChangeUserName}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter Password"
                        value={this.props.password}
                        onChange={this.props.onChangePassword}
                      />
                    </FormGroup>

                    <Button type="submit" color="primary" >Login</Button>
                  </Form>

                </div>

              </div>
              <div className='col-md-3' />

            </div>
          </div>

        </div>
      </div>

    );
  }
}

AdminLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminLogin: makeSelectAdminLogin(),
  userName: makeSelectUserName(),
  passWord: makeSelectPassword(),
  adminToken: makeSelectAdminToken(),
  adminInfo: makeSelectAdminInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeUserName: event => dispatch(setUserName(event.target.value)),
    onChangePassword: event => dispatch(setPassword(event.target.value)),
    submitLoginForm: () => dispatch(submitLogin()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adminLogin', reducer });
const withSaga = injectSaga({ key: 'adminLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminLogin);
