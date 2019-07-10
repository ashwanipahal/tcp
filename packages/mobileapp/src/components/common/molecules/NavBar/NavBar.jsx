// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import style from './NavBar.style';

type Props = {
  renderIcon: Function,
  getLabelText: Function,
  activeBackgroundColor: String,
  inactiveBackgroundColor: String,
  onTabPress: Function,
  onTabLongPress: Function,
  getAccessibilityLabel: Function,
  navigation: Object,
  labels: Object,
};

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

const NavBar = (props: Props) => {
  const {
    renderIcon,
    getLabelText,
    activeBackgroundColor,
    inactiveBackgroundColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
    labels,
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View style={style.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const backgroundColor = isRouteActive ? activeBackgroundColor : inactiveBackgroundColor;
        let label;
        let buttonStyle = style.tabButton;

        if (labels) {
          label = labels[getLabelText({ route })];
        } else {
          label = getDefaultLabels(getLabelText({ route }));
        }

        if (isRouteActive) {
          style.textStyle.color = activeBackgroundColor;
        }

        if (!label) {
          buttonStyle = style.logoStyle;
        }

        return (
          <TouchableOpacity
            // eslint-disable-next-line react/no-array-index-key
            key={`nav-bar_${routeIndex}`}
            style={buttonStyle}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityRole="link"
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor: backgroundColor })}

            <Text style={style.textStyle}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    labels: state.labels.MobileApp && state.labels.MobileApp.navigation,
  };
};

export default connect(mapStateToProps)(NavBar);
