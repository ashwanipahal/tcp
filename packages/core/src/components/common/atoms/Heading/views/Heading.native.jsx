// @flow
import React from 'react';
import { Text } from 'react-native';
import HeadingStyles from '../Heading.style.native';
import withStyles from '../../../hoc/withStyles.native';
import { getLocator } from '../../../../../utils/index.native';

type Props = {
  text?: string,
  locator?: string,
};

const Heading = (props: Props) => {
  const { text, locator, ...otherProps } = props;
  return (
    <Text {...otherProps} testID={getLocator(locator)}>
      {text}
    </Text>
  );
};

Heading.defaultProps = {
  text: '',
  locator: '',
};

export default withStyles(Heading, HeadingStyles);
export { Heading as HeadingVanilla };
