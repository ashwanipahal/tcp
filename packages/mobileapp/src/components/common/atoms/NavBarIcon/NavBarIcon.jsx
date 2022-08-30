// @flow

import React from 'react';
import { View } from 'react-native';
import Image from '@tcp/core/src/components/common/atoms/Image/index';
import { getIcon } from '../../../../utils/utils';

type Props = {
  iconActive: String,
  iconInactive: String,
  focused: Boolean,
  style?: Object,
  isBrandIcon: Boolean,
  logocomponent: Object,
};

/**
 * This component creates icon used in Bottom Nav Bar
 * @param {*} props Props passed from Stack navigator screen
 */
const NavBarIcon = (props: Props) => {
  const { iconActive, iconInactive, style, focused, isBrandIcon, logocomponent } = props;
  const icon = focused ? iconActive : iconInactive;
  if (isBrandIcon) return logocomponent;
  return (
    <View>
      <Image source={getIcon(icon)} alt="" style={style.icon} />
    </View>
  );
};

NavBarIcon.defaultProps = {
  style: {
    icon: {
      width: 26,
      height: 26,
    },
  },
};

export default NavBarIcon;
