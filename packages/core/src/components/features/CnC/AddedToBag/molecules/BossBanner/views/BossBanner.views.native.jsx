/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { StyledHeading, SubHeading } from '../styles/BossBanner.style.native';

// @flow
type Props = {
  labels: any,
};
const BossBanner = ({ labels }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StyledHeading>
        <BodyCopy
          fontSize="fs12"
          fontWeight={['semibold']}
          textAlign="center"
          text={labels.pickUpText}
        />
      </StyledHeading>
      <SubHeading>
        <Text>{labels.simplyChooseText}</Text>
      </SubHeading>
    </View>
  );
};

export default withStyles(BossBanner);
export { BossBanner as BossBannerVanilla };
