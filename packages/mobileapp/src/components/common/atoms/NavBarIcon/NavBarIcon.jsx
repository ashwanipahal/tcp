// @flow

import React from 'react';
import { Image, View } from 'react-native';
import { getIcon } from '../../../../utils/utils';

type Props = {
  iconActive: String,
  iconInactive: String,
  focused: Boolean,
  style?: Object,
};

const NavBarIcon = (props: Props) => {
  const { iconActive, iconInactive, style, focused } = props;
  const icon = focused ? iconActive : iconInactive;

  return (
    <View style={style.wrapper}>
      <Image source={getIcon(icon)} style={style.icon} />
    </View>
  );
};

NavBarIcon.defaultProps = {
  style: {
    wrapper: {},
    icon: {
      width: 26,
      height: 26,
    },
  },
};

export default NavBarIcon;
