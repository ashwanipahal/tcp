import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import ThemeWrapperHOC from '../components/common/hoc/ThemeWrapper.container';
import AppNavigator from '../navigation/AppNavigator';
import { initializeStore } from '../reduxStore/store/initializeStore';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export class App extends React.PureComponent {
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
      <Provider store={this.store}>
        <ThemeWrapperHOC>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </ThemeWrapperHOC>
      </Provider>
    );
  }
}

export default App;
