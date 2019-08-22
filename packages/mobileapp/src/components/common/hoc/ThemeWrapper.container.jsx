import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components/native';
import themeTcp from '@tcp/core/styles/themes/TCP';
import themeGymboree from '@tcp/core/styles/themes/Gymboree';
import updateAppType from './ThemeWrapper.actions';
import { APP_TYPE } from './ThemeWrapper.constants';
import { getAppType } from './ThemeWrapper.selectors';
import resetReduxStore from '../../../reduxStore/actions/ResetStore.actions';

/**
 * @param {string} appType : Props for app type
 * @desc The ThemeWrapper works as a bridge for the for the TCP and  GYMBOREE thems.
 * It also provide  ThemeProvider
 */
export class ThemeWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const { appType, updateAppTypeHandler } = props;
    updateAppTypeHandler(appType);
  }

  componentWillReceiveProps(nextProps) {
    const { appType: prevAppType } = this.props;
    const { appType, switchBrand, resetReduxStoreData, updateAppTypeHandler } = nextProps;

    // update brand name in utils when app type is changed
    if (appType !== prevAppType && switchBrand) {
      resetReduxStoreData();
      updateAppTypeHandler(appType);
      switchBrand(appType);
    }
  }

  /**
   * @return  {[Object]} JSX of the component. Default tcp theme
   * @desc The getTheme method check current theme type and return theme accordingly
   */
  getTheme = () => {
    const { appType } = this.props;
    if (appType === APP_TYPE.GYMBOREE) {
      return themeGymboree;
    }
    return themeTcp;
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
  switchBrand: PropTypes.func,
  resetReduxStoreData: PropTypes.func,
};

ThemeWrapper.defaultProps = {
  updateAppTypeHandler: () => {},
  switchBrand: null,
  resetReduxStoreData: null,
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
    resetReduxStoreData: () => dispatch(resetReduxStore()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeWrapper);
