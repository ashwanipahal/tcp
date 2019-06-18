/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import LoginPageStyle from '../styles/LoginPage.style';
import TextBox from '../../../../common/atoms/TextBox';
import Button from '../../../../common/atoms/Button';
import Grid from '../../../../common/molecules/Grid';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

class LoginView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  render() {
    const { onSubmit, loginInfo } = this.props;

    if (Object.keys(loginInfo).length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Col
              colSize={{
                large: 6,
                medium: 8,
                small: 12,
              }}
              offsetLeft={{
                large: 3,
                medium: 2,
                small: 0,
              }}
            >
              <LoginPageStyle>
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
                        <TextBox
                          type="email"
                          id="email"
                          name="email"
                          onChangeHandler={this.changeHandler}
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
                        <TextBox
                          type="password"
                          id="password"
                          name="password"
                          onChangeHandler={this.changeHandler}
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
              </LoginPageStyle>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LoginView;
