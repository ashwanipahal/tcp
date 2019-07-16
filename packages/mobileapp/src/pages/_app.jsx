import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '@tcp/core/styles/themes/TCP';
import { Provider } from 'react-redux';
import AppNavigator from '../navigation/AppNavigator';
import { initializeStore } from '../reduxStore/store/initializeStore';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

// Config from './brand_config';
export default class App extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    isLoadingComplete: false,
  };

  componentWillMount() {
    this.store = initializeStore();
  }

  _handleLoadingError = error => {
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  _handleFinishLoading = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isLoadingComplete: true });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={this.store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      </ThemeProvider>
    );
  }
}
