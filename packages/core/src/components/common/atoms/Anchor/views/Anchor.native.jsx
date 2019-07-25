// @flow
import React from 'react';
import { Text } from 'react-native';
import { UrlHandler, navigateToPage } from '../../../../../utils/utils.native';
import withStyles from '../../../hoc/withStyles.native';
import { AnchorStyles, AnchorView, AnchorIcon } from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
  text?: string,
  visible?: boolean,
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

const Anchor = ({ anchorVariation, text, visible, ...otherProps }: Props) => {
  const { url, external, navigation, onPress } = otherProps;

  const openUrlInExternalBrowser = onPress || (() => UrlHandler(url));
  const openUrl = external ? openUrlInExternalBrowser : () => navigateToPage(url, navigation);
  return (
    <AnchorView accessibilityRole="button" onPress={openUrl}>
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
};

export default withStyles(Anchor, AnchorStyles);
export { Anchor as AnchorVanilla };
