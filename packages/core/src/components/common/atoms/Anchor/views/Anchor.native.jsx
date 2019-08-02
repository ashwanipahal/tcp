// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { UrlHandler, navigateToPage } from '../../../../../utils/utils.native';
import withStyles from '../../../hoc/withStyles.native';
import { AnchorStyles, AnchorView, AnchorIcon } from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
  text?: string,
  visible?: boolean,
  variation?: string,
  children?: Object,
  customStyle?: Object,
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

const Anchor = ({
  anchorVariation,
  text,
  visible,
  children,
  customStyle,
  ...otherProps
}: Props) => {
  const { url, external, navigation, onPress } = otherProps;

  const openUrlInExternalBrowser = onPress || (() => UrlHandler(url));
  const openUrl = external ? openUrlInExternalBrowser : () => navigateToPage(url, navigation);

  if (children) {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        onPress={openUrl}
        {...otherProps}
        style={customStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <AnchorView accessibilityRole="button" onPress={openUrl} style={customStyle}>
      <Text anchorVariation={anchorVariation} {...otherProps}>
        {text}
      </Text>
      {visible && <AnchorIcon source={Icon} />}
    </AnchorView>
  );
};
Anchor.defaultProps = {
  anchorVariation: '',
  text: '',
  visible: false,
  variation: '',
  children: null,
  customStyle: {},
};

export default withStyles(Anchor, AnchorStyles);
export { Anchor as AnchorVanilla };
