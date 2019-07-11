import React from 'react';
import { SafeAreaView } from 'react-native';
import AccountNative from '@tcp/core/src/components/features/account/Account/container/Account';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView>
        <AccountNative component="addressBookMobile" />
      </SafeAreaView>
    );
  }
}
