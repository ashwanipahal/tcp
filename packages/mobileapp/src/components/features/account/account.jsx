import React from 'react';
import { SafeAreaView } from 'react-native';
import AccountNative from '@tcp/core/src/components/features/account/Account/container/Account';

export default class HomeScreen extends React.PureComponent {
  render() {
    return (
      <SafeAreaView>
        <AccountNative component="accountOverview" />
      </SafeAreaView>
    );
  }
}
