import React from 'react';
import { Platform, StatusBar, StyleSheet, View, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import ThemeWrapperHOC from '../components/common/hoc/ThemeWrapper.container';
import AppNavigator from '../navigation/AppNavigator';
import AppSplash from '../navigation/AppSplash';

import { initializeStore } from '../reduxStore/store/initializeStore';
import { APP_TYPE } from '../components/common/hoc/ThemeWrapper.constants';

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
    isSplashVisible: true,
  };

  componentWillMount() {
    this.store = initializeStore();

    // Enable Layout animations for android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  _handleLoadingError = error => {
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  _handleFinishLoading = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isLoadingComplete: true });
  };

  removeSplash = () => {
    this.setState({ isSplashVisible: false });
  };

  render() {
    const { appType } = this.props;
    const { isSplashVisible } = this.state;
    return (
      <Provider store={this.store}>
        <ThemeWrapperHOC appType={appType}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            {isSplashVisible && <AppSplash appType={appType} removeSplash={this.removeSplash} />}
          </View>
        </ThemeWrapperHOC>
      </Provider>
    );
  }
}

App.propTypes = {
  appType: PropTypes.string,
};

App.defaultProps = {
  appType: APP_TYPE.TCP,
};

export default App;
