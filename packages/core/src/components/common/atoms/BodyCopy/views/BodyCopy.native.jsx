// @flow
import React from 'react';
import { Text } from 'react-native';
import BodyCopyStyles from '../BodyCopy.style.native';
import withStyles from '../../../hoc/withStyles.native';
import { getLocator } from '../../../../../utils/index.native';

type Props = {
  text?: string,
  locator?: string,
};

const BodyCopy = (props: Props) => {
  const { text, locator, ...otherProps } = props;
  return (
    <Text {...otherProps} testID={getLocator(locator)}>
      {text}
    </Text>
  );
};

BodyCopy.defaultProps = {
  text: '',
  locator: '',
};

export default withStyles(BodyCopy, BodyCopyStyles);
export { BodyCopy as BodyCopyVanilla };
