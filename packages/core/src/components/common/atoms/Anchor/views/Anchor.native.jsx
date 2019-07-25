// @flow
import React from 'react';
import { Text, Linking } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import { AnchorStyles, AnchorView, AnchorIcon } from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
  text?: string,
  visible?: boolean,
};

/**
 *
 * @param {url} string
 */
const categorizeUrl = url => {
  if (url.includes('/p/')) {
    return '/p/';
  }
  if (url.includes('/c/')) {
    return '/p/';
  }
  return null;
};

/**
 * @param {string} url
 * @param {function} navigation
 * Returns navigation to the parsed URL based on  the url param
 */
const navigateToUrl = (url, navigation) => {
  const { navigate } = navigation;
  const urlType = {
    1: '/p/',
    2: '/c/',
  };
  const category = categorizeUrl(url);
  switch (category) {
    case urlType[1]:
      /**
       * /p/Rainbow--The-Birthday-Girl--Graphic-Tee-2098277-10
       * If url starts with “/p” → Create and navigate to a page in stack for Products (Blank page with a Text - “Product List”)
       */
      return navigate('ProductList', { product: 'New Product Nike' });
    case urlType[2]:
      /**
       * /c/* - If url starts with “/c” (* can be anything in url) → Select “Shop” tab in tabbar and Open Shop page
       */
      return navigate('Plp');
    default:
      return null;
  }
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

const openUrlInBrowser = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

const Anchor = ({ anchorVariation, text, visible, ...otherProps }: Props) => {
  const { url, internal, navigation, onPress } = otherProps;

  const openUrlInExternalBrowser = onPress || (() => openUrlInBrowser(url));
  const openUrl = internal ? () => navigateToUrl(url, navigation) : openUrlInExternalBrowser;
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
