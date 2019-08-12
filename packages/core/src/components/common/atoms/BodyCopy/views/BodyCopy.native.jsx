// @flow
import React from 'react';
import { Text } from 'react-native';
import BodyCopyStyles from '../BodyCopy.style.native';
import withStyles from '../../../hoc/withStyles.native';
import { getLocator } from '../../../../../utils/index.native';

type Props = {
  text?: string,
  locator?: string,
  accessibilityText?: string,
};

const BodyCopy = (props: Props) => {
  const { text, locator, accessibilityText, ...otherProps } = props;
  return (
    <Text
      {...otherProps}
      testID={getLocator(locator)}
      accessibilityRole="text"
      accessibilityLabel={accessibilityText}
    >
      {text}
    </Text>
  );
};

BodyCopy.defaultProps = {
  text: '',
  locator: '',
  accessibilityText: '',
};

export default withStyles(BodyCopy, BodyCopyStyles);
export { BodyCopy as BodyCopyVanilla };
