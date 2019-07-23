// @flow
import React from 'react';
import { Text } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import { AnchorStyles, AnchorView, AnchorIcon } from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
  text?: string,
  visible?: boolean,
};

/**
 * @param {string} url
 * @param {function} navigation
 * Returns navigation to the parsed URL based on  the url param
 */
const parseUrl = (url, navigation) => {
  const { navigate } = navigation;
  if (url.includes('/p/')) {
    /**
     * /p/Rainbow--The-Birthday-Girl--Graphic-Tee-2098277-10
     * If url starts with “/p” → Create and navigate to a page in stack for Products (Blank page with a Text - “Product List”)
     */
    return navigate('ProductList', { product: 'New Product Nike' });
  }
  if (url.includes('/c/')) {
    /**
     * /c/* - If url starts with “/c” (* can be anything in url) → Select “Shop” tab in tabbar and Open Shop page
     */
    return navigate('Plp');
  }
  return null;
};

const Icon = require('../../../../../assets/carrot-small-rights.png');

const Anchor = ({ anchorVariation, text, visible, ...otherProps }: Props) => {
  const { url, external, navigation } = otherProps;
  return (
    <AnchorView
      accessibilityRole="button"
      onPress={() => (external ? url : parseUrl(url, navigation))}
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
};

export default withStyles(Anchor, AnchorStyles);
export { Anchor as AnchorVanilla };
