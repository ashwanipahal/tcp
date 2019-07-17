// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import AnchorStyles from '../Anchor.style.native';

type Props = {
  anchorVariation?: string,
};

const parseUrl = (url, navigation) => {
  if (url.includes('/p/')) {
    /**
     * /p/Girls-Birthday-Short-Sleeve-Rainbow--The-Birthday-Girl--Graphic-Tee-2098277-10
     * If url starts with “/p” → Create and navigate to a page in stack for Products (Blank page with a Text - “Product List”)
     */
  } else if (url.includes('/c/')) {
    /**
     * /c/* - If url starts with “/c” (* can be anything in url) → Select “Shop” tab in tabbar and Open Shop page
     */
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductList', { product: 'New Product Nike' })}
      >
        <Text>navigate to this... and lot more......</Text>
      </TouchableOpacity>
    );
  }
  return null;
};

const Anchor = ({ anchorVariation, ...otherProps }: Props) => {
  const { url, external, navigation } = otherProps;
  if (!external)
    return (
      <TouchableOpacity accessibilityRole="button">
        <Text anchorVariation={anchorVariation} {...otherProps} />
        <Text>Click Me</Text>
      </TouchableOpacity>
    );

  return parseUrl(url, navigation);
};

Anchor.defaultProps = {
  anchorVariation: '',
};

export default withStyles(Anchor, AnchorStyles);
