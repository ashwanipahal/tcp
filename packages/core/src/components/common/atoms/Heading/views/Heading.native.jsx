// @flow
import React from 'react';
import { Text } from 'react-native';
import HeadingStyles from '../Heading.style.native';
import withStyles from '../../../hoc/withStyles.native';

type Props = {
  text?: string,
};

const Heading = (props: Props) => {
  const { text, ...otherProps } = props;
  return <Text {...otherProps}>{text}</Text>;
};

Heading.defaultProps = {
  text: '',
};

export default withStyles(Heading, HeadingStyles);
export { Heading as HeadingVanilla };
