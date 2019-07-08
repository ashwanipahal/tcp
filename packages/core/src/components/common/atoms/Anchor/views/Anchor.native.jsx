// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import AnchorStyles from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
};

const Anchor = ({ anchorVariation, ...otherProps }: Props) => (
  // eslint-disable-next-line react-native-a11y/has-accessibility-props
  <TouchableOpacity {...otherProps}>
    <Text anchorVariation={anchorVariation} {...otherProps} />
  </TouchableOpacity>
);

Anchor.defaultProps = {
  anchorVariation: '',
};

export default withStyles(Anchor, AnchorStyles);
