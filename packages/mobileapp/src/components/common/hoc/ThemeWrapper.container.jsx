import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components/native';
import theme from '@tcp/core/styles/themes/TCP';
import themeGymboree from '@tcp/core/styles/themes/Gymboree';
import updateAppType from './ThemeWrapper.actions';
import { APP_TYPE } from './ThemeWrapper.constants';
import { getAppType } from './ThemeWrapper.selectors';

/**
 * @param {string} appType : Props for app type
 * @desc The ThemeWrapper works as a bridge for the for the TCP and  GYMBOREE thems.
 * It also provide  ThemeProvider
 */
export class ThemeWrapper extends React.PureComponent {
  currentAppType = '';

  constructor(props) {
    super(props);
    const { appType, updateAppTypeHandler } = props;
    this.currentAppType = appType;
    updateAppTypeHandler(this.currentAppType);
  }

  componentWillReceiveProps(nextProps) {
    const { appType } = this.props;
    const nextPropsAppType = get(nextProps, 'appType', null);
    if (nextPropsAppType && appType !== nextPropsAppType) {
      this.currentAppType = nextPropsAppType;
    }
  }

  /**
   * @return  {[Object]} JSX of the component. Default tcp theme
   * @desc The getTheme method check current theme type and return theme accordingly
   */
  getTheme = () => {
    if (this.currentAppType === APP_TYPE.GYMBOREE) {
      return themeGymboree;
    }
    return theme;
  };

  render() {
    const { children, appType } = this.props;
    const currentTheme = this.getTheme();
    return (
      <ThemeProvider theme={currentTheme} appType={appType}>
        <React.Fragment>{children}</React.Fragment>
      </ThemeProvider>
    );
  }
}

ThemeWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
  appType: PropTypes.string.isRequired,
  updateAppTypeHandler: PropTypes.func,
};

ThemeWrapper.defaultProps = {
  updateAppTypeHandler: () => {},
};

const mapStateToProps = (state, ownProps) => {
  const { appType } = ownProps;
  const appTypeStoreValue = getAppType(state);
  const appTypeValue = appTypeStoreValue === '' ? appType : appTypeStoreValue;
  return {
    appType: appTypeValue,
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
