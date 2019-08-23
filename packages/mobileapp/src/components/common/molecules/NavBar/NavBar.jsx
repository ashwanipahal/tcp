// @flow
import React from 'react';
import { connect } from 'react-redux';
import { navigateToNestedRoute, resetNavigationStack } from '@tcp/core/src/utils';

import style from './NavBar.style';
import SecondAppPeekABooView from '../../../../navigation/SecondAppPeekABooView';
import { THEME_WRAPPER_REDUCER_KEY } from '../../hoc/ThemeWrapper.constants';

type Props = {
  renderIcon: Function,
  getLabelText: Function,
  onTabPress: Function,
  onTabLongPress: Function,
  navigation: Object,
  labels: Object,
  appType: String,
  screenProps: Object,
};

/**
 * This function returns default label for specific route in Nav Bar
 * @param {*} label
 */
const getDefaultLabels = label => {
  const labels = {
    home: 'HOME',
    shop: 'SHOP',
    account: 'ACCOUNT',
    wallet: 'WALLET',
    brand_logo: '',
  };
  return labels[label];
};

/**
 *
 * @param {*} props
 */
const getTestID = route => {
  const testIDs = {
    home: 'HOME',
    shop: 'shop_icon_btn',
    account: 'ACCOUNT',
    wallet: 'WALLET',
    brand_logo: '',
  };
  return testIDs[route];
};

/**
 * This Component creates custom Bottom Nav Bar for the app
 * @param {*} props Props passed from BottomTabNavigator react native feature
 */
class NavBar extends React.PureComponent<Props> {
  componentWillReceiveProps(nextProps) {
    const { appType: prevAppType } = this.props;
    const { appType } = nextProps;

    if (appType !== prevAppType && prevAppType) {
      // navigate to home page of home stack when app type is changed
      const { navigation } = this.props;
      resetNavigationStack(navigation);
      const refresh = navigation.getParam('refresh', false);
      navigateToNestedRoute(navigation, 'HomeStack', 'Home', { refresh: !refresh });
    }
  }

  render() {
    const {
      renderIcon,
      getLabelText,
      onTabPress,
      onTabLongPress,
      navigation,
      labels,
      screenProps,
    } = this.props;
    const { toggleBrandAction } = screenProps;

    const { routes, index: activeRouteIndex } = navigation.state;

    const StyledView = style.container;
    const NavContainer = style.navContainer;
    return (
      <NavContainer>
        <StyledView>
          {routes.map((route, routeIndex) => {
            const isRouteActive = routeIndex === activeRouteIndex;
            let label;
            let StyledTouchableOpacity = style.tabButton;
            let StyledText = style.textStyle;
            const routeId = getLabelText({ route });

            if (labels) {
              label = labels[routeId];
            } else {
              label = getDefaultLabels(routeId);
            }

            if (isRouteActive) {
              StyledText = style.highlightedTextStyle;
            }

            if (!label) {
              StyledTouchableOpacity = style.logoStyle;
            }

            return (
              <StyledTouchableOpacity
                // eslint-disable-next-line react/no-array-index-key
                key={`nav-bar_${routeIndex}`}
                onPress={() => {
                  if (route.key === 'BrandSwitchStack') {
                    // show brands switch as an option in view
                    if (toggleBrandAction) toggleBrandAction();
                    return;
                  }
                  onTabPress({ route });
                }}
                onLongPress={() => {
                  onTabLongPress({ route });
                }}
                accessibilityRole="link"
                accessibilityLabel={getTestID(routeId)}
                testID={getTestID(routeId)}
                activeOpacity={1}
              >
                {renderIcon({ route, focused: isRouteActive })}

                <StyledText>{label}</StyledText>
              </StyledTouchableOpacity>
            );
          })}
        </StyledView>
        <SecondAppPeekABooView />
      </NavContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: state.Labels.MobileApp && state.Labels.MobileApp.navigation,
    appType: state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE'),
  };
};

export default connect(mapStateToProps)(NavBar);
