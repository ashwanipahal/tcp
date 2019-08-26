// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { UrlHandler, navigateToPage, validateExternalUrl } from '../../../../../utils/index.native';
import withStyles from '../../../hoc/withStyles.native';
import { AnchorStyles, AnchorView, AnchorIcon } from '../Anchor.style.native';
import { getLocator } from '../../../../../utils';

type Props = {
  anchorVariation?: string,
  text?: string,
  visible?: boolean,
  children?: Object,
  customStyle?: Object,
  locator?: string,
  accessibilityLabel?: string,
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

/**
 * @param {object} props : Props for Anchor
 * @desc This is a Anchor component to manage the internal or external .
 */
const Anchor = ({
  anchorVariation,
  text,
  visible,
  children,
  customStyle,
  locator,
  accessibilityLabel,
  ...otherProps
}: Props) => {
  const { url, navigation } = otherProps;

  const openUrl = () => {
    if (validateExternalUrl(url)) {
      UrlHandler(url);
    } else {
      navigateToPage(url, navigation);
    }
  };

  if (children) {
    return (
      <TouchableOpacity
        accessibilityRole="link"
        onPress={openUrl}
        {...otherProps}
        style={customStyle}
        testID={getLocator(locator)}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <AnchorView
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel || text}
      onPress={openUrl}
      style={customStyle}
      testID={getLocator(locator)}
    >
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
  children: null,
  customStyle: {},
  locator: '',
  accessibilityLabel: '',
};

export default withStyles(Anchor, AnchorStyles);
export { Anchor as AnchorVanilla };
