// @flow
import React from 'react';
import { Text } from 'react-native';
import BodyCopyStyles from '../BodyCopy.style.native';
import withStyles from '../../../hoc/withStyles.native';

type Props = {
  text?: string,
};

const BodyCopy = (props: Props) => {
  const { text, ...otherProps } = props;
  return <Text {...otherProps}>{text}</Text>;
};

BodyCopy.defaultProps = {
  text: '',
};

export default withStyles(BodyCopy, BodyCopyStyles);
export { BodyCopy as BodyCopyVanilla };
