/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import Button from '../../../../common/atoms/Button';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

// @flow

type Props = {
  getUserInfo: () => void,
  onSubmit: Object => void,
  loginInfo: Object,
};

class LoginPageForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      resetPassword: false,
    };
  }

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    onSubmit({
      storeId: '10151',
      logonId1: email,
      logonPassword1: password,
      rememberCheck: true,
      rememberMe: true,
      requesttype: 'ajax',
      reLogonURL: 'TCPAjaxLogonErrorView',
      URL: 'TCPAjaxLogonSuccessView',
      registryAccessPreference: 'Public',
      calculationUsageId: -1,
      createIfEmpty: 1,
      deleteIfEmpty: '*',
      fromOrderId: '*',
      toOrderId: '.',
      updatePrices: 0,
      xCreditCardId: '',
      userId: '-1002',
    });
  };

  /* eslint-disable */
  render() {
    const { loginInfo } = this.props;
    debugger;
    const { resetPassword } = this.state;

    if (Object.keys(loginInfo).length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <h1>Login Page</h1>
        {loginInfo.errorMessage && <p>{loginInfo.errorMessage}</p>}
        {loginInfo.accountStatus === 'Enabled' && (
          <p>{`Welcome ${loginInfo.firstName} ${loginInfo.lastName}`}</p>
        )}
        {loginInfo.accountStatus !== 'Enabled' && (
          <form onSubmit={this.onFormSubmit} noValidate>
            <Row className="marginBottom">
              <Col
                colSize={{
                  large: 12,
                  medium: 12,
                  small: 12,
                }}
              >
                <label htmlFor="email">Email Id</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row className="marginBottom">
              <Col
                colSize={{
                  large: 12,
                  medium: 12,
                  small: 12,
                }}
              >
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                />
              </Col>
            </Row>
            <Row className="marginBottom">
              <Col
                colSize={{
                  large: 12,
                  medium: 12,
                  small: 12,
                }}
              >
                <Button type="submit" fullWidth buttonVariation="variable-width">
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default LoginPageForm;
