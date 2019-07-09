/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
/* eslint-disable react-native-a11y/has-accessibility-props */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const S = StyleSheet.create({
  container: {
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    elevation: 2,
    flexDirection: 'row',
    height: 55,
  },
  logoStyle: { paddingLeft: 10, paddingRight: 10, position: 'relative', top: -20 },
  tabButton: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  textStyle: { color: '#9b9b9b', fontSize: 8, marginTop: 6 },
});

const getDefaultLabels = label => {
  const labels = {
    home: 'HOME',
    shop: 'SHOP',
    account: 'ACCOUNT',
    wallet: 'WALLET',
    tcp: '',
  };
  return labels[label];
};

const NavBar = props => {
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
    <View style={S.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const backgroundColor = isRouteActive ? activeBackgroundColor : inactiveBackgroundColor;
        let label;
        let style = S.tabButton;

        if (labels) {
          label = labels[getLabelText({ route })];
        } else {
          label = getDefaultLabels(getLabelText({ route }));
        }

        if (isRouteActive) {
          S.textStyle.color = activeBackgroundColor;
        }

        if (!label) {
          style = S.logoStyle;
        }

        return (
          <TouchableOpacity
            key={routeIndex}
            style={style}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor: backgroundColor })}

            <Text style={S.textStyle}>{label}</Text>
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
