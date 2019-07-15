// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import AnchorStyles from '../Anchor.style.native';
import { AnchorView, AnchorIcon } from '../AnchorViews.style.native';

type Props = {
  anchorVariation?: string,
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

const Anchor = ({ anchorVariation, ...otherProps }: Props) => (
  <TouchableOpacity accessibilityRole="button">
    <AnchorView>
      <Text anchorVariation={anchorVariation} {...otherProps} />
      <AnchorIcon source={Icon} />
    </AnchorView>
  </TouchableOpacity>
);

Anchor.defaultProps = {
  anchorVariation: '',
};

export default withStyles(Anchor, AnchorStyles);
