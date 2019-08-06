// @flow
import React from 'react';
import { connect } from 'react-redux';
import style from './NavBar.style';
import SecondAppPeekABooView from '../../../../navigation/SecondAppPeekABooView';

type Props = {
  renderIcon: Function,
  getLabelText: Function,
  onTabPress: Function,
  onTabLongPress: Function,
  navigation: Object,
  labels: Object,
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
 * This Component creates custom Bottom Nav Bar for the app
 * @param {*} props Props passed from BottomTabNavigator react native feature
 */
const NavBar = (props: Props) => {
  const { renderIcon, getLabelText, onTabPress, onTabLongPress, navigation, labels } = props;

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

          if (labels) {
            label = labels[getLabelText({ route })];
          } else {
            label = getDefaultLabels(getLabelText({ route }));
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
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityRole="link"
              accessibilityLabel={label}
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
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.MobileApp && state.Labels.MobileApp.navigation,
  };
};

export default connect(mapStateToProps)(NavBar);
