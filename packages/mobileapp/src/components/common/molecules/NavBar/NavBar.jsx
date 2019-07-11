// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import style from './NavBar.style';

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

  return (
    <View style={style.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        let label;
        let buttonStyle = style.tabButton;
        let txtStyle = style.textStyle;

        if (labels) {
          label = labels[getLabelText({ route })];
        } else {
          label = getDefaultLabels(getLabelText({ route }));
        }

        if (isRouteActive) {
          txtStyle = style.highlightedTextStyle;
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
            accessibilityLabel={label}
          >
            {renderIcon({ route, focused: isRouteActive })}

            <Text style={txtStyle}>{label}</Text>
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
