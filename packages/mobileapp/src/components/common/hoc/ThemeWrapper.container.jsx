import React from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components/native';
import theme from '@tcp/core/styles/themes/TCP';
import themeGymboree from '@tcp/core/styles/themes/Gymboree';
import updateAppType from './ThemeWrapper.actions';
import { APP_TYPE_TCP, APP_TYPE_GYMBOREE } from './ThemeWrapper.constrants';
import { getAppType } from './ThemeWrapper.selectors';

export class ThemeWrapper extends React.PureComponent {
  currentAppType = '';

  constructor(props) {
    super(props);
    this.currentAppType = props.defaultAppType;
    props.updateAppTypeHandler(this.currentAppType);
  }

  componentWillReceiveProps(nextProps) {
    const { appType } = this.props;
    const nextPropsAppType = get(nextProps, 'appType', null);
    if (nextPropsAppType && appType !== nextPropsAppType) {
      this.currentAppType = nextPropsAppType;
    }
  }

  getTheme = () => {
    if (this.currentAppType === APP_TYPE_GYMBOREE) {
      return themeGymboree;
    }
    return theme;
  };

  onPressLearnMore = () => {
    const { appType, updateAppTypeHandler } = this.props;
    if (appType === APP_TYPE_GYMBOREE) {
      updateAppTypeHandler(APP_TYPE_TCP);
    } else if (appType === APP_TYPE_TCP) {
      updateAppTypeHandler(APP_TYPE_GYMBOREE);
    }
  };

  render() {
    const { children, appType } = this.props;
    const currentTheme = this.getTheme();
    return (
      <ThemeProvider theme={currentTheme} appType={appType}>
        <React.Fragment>
          {/* eslint-disable-next-line */}
          <View style={{ backgroundColor: '#ff0000', marginTop: 100 }}>
            <Button
              onPress={this.onPressLearnMore}
              title={this.currentAppType}
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>

          {children}
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

ThemeWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
  appType: PropTypes.string,
  defaultAppType: PropTypes.string,
  updateAppTypeHandler: PropTypes.func,
};

ThemeWrapper.defaultProps = {
  defaultAppType: '',
  appType: '',
  updateAppTypeHandler: () => {},
};

const mapStateToProps = state => {
  return {
    appType: getAppType(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateAppTypeHandler: _appType => {
      dispatch(updateAppType(_appType));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeWrapper);
