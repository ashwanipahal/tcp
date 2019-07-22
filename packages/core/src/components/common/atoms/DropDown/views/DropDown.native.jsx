import React from 'react';
import { Image, View } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import { style, StyledText, Row } from '../DropDown.style.native';

const icon = require('../../../../../assets/carrot-small-down.png');

// @flow
type Props = {
  title: string,
};

const DropDown = (props: Props) => {
  const { title } = props;
  return (
    <View accessibilityTraits="none" accessibilityComponentType="none" {...props}>
      <Row>
        <StyledText>{title}</StyledText>
        <Image source={icon} />
      </Row>
    </View>
  );
};

export default withStyles(DropDown, style);
export { DropDown as DropDownVanilla };
