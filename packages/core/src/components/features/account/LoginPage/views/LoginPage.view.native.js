/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { View, Button, TextInput, Text } from 'react-native'; //eslint-disable-line
// @flow
type Props = {
  getUserInfo: () => void,
  onSubmit: Object => void,
  loginInfo: Object,
};

class LoginView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: 'sunil.syal@gmail.com',
      password: 'Test@123',
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

  onFormSubmit = () => {
    // e.preventDefault();
    const { onSubmit } = this.props;
    // const email = 'sunil.syal@gmail.com';
    // const password = 'Test@123';

    const { email, password } = this.state;

    if (onSubmit)
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
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', margin: 10 }}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Login Page</Text>
        <View style={{ margin: 10 }}>
          <Text>Email Id</Text>
          <TextInput
            autoCapitalize="none"
            value={this.state.email}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Text>Password</Text>
          <TextInput
            autoCapitalize="none"
            value={this.state.password}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <Button title={'Login'} onPress={this.onFormSubmit} />
      </View>
    );
  }

  /* eslint-disable */
  render1() {
    const { loginInfo } = this.props;

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
