// @flow
import React from 'react';
import { View, Text } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../Badge.style.native';

// @flow

type Props = {
  children: string,
  className: string,
  showCheckmark: boolean,
  dataLocator: ?string,
};

const Badge = ({ children, className, showCheckmark, dataLocator }: Props): Node => (
  <View>
    {showCheckmark && (
      <View>
        <Text>Yes</Text>
      </View>
    )}
    <View>
      <Text>{children}</Text>
    </View>
  </View>
);

export default withStyles(Badge, styles);
export { Badge as BadgeVanilla };
