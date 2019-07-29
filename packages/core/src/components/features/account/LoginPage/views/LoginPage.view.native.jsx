/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native'; //eslint-disable-line
import LoginTopSection from '../molecules/LoginTopSection';

// @flow
type Props = {
  getUserInfo: () => void,
  onSubmit: Object => void,
};

const gray = '#808080';
const styles = StyleSheet.create({
  childViewStyle: {
    margin: 10,
  },
  parentViewStyle: { flex: 1, justifyContent: 'flex-start', margin: 10 },
  textInputStyle: { borderColor: gray, borderWidth: 1, height: 40 },
  // eslint-disable-next-line
  textStyle: { fontSize: 36, fontWeight: 'bold' },
});

class LoginView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: 'testingnarvar@gmail.com',
      password: 'Password@123',
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
    const { onSubmit } = this.props;
    console.log('this.props: ', this.props);
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
    const { email, password } = this.state;
    return (
      <View style={styles.parentViewStyle}>
        <LoginTopSection />
        {/* <Text style={styles.textStyle}>Login Page</Text> */}
        <View style={styles.childViewStyle}>
          <Text>Email Id</Text>
          <TextInput
            autoCapitalize="none"
            value={email}
            style={styles.textInputStyle}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.childViewStyle}>
          <Text>Password</Text>
          <TextInput
            autoCapitalize="none"
            value={password}
            style={styles.textInputStyle}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <Button title="Login" onPress={this.onFormSubmit} />
      </View>
    );
  }
}

export default LoginView;
