// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import AnchorStyles from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
};

const Anchor = ({ anchorVariation, ...otherProps }: Props) => (
  <TouchableOpacity accessibilityRole="button">
    <Text anchorVariation={anchorVariation} {...otherProps} />
  </TouchableOpacity>
);

Anchor.defaultProps = {
  anchorVariation: '',
};

export default withStyles(Anchor, AnchorStyles);
