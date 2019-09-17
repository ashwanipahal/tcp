import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import ProductAddToBagContainer from '../../../../common/molecules/ProductAddToBag';

class ProductDetailView extends React.PureComponent {
  render() {
    const { currentProduct } = this.props;
    const { name, shortDescription, colorFitsSizesMap } = currentProduct;
    return (
      <View>
        <Text>{name}</Text>
        <Text>{shortDescription}</Text>
        <ProductAddToBagContainer colorFitsSizesMap={colorFitsSizesMap} />
      </View>
    );
  }
}

ProductDetailView.propTypes = {
  currentProduct: PropTypes.shape({}),
};

ProductDetailView.defaultProps = {
  currentProduct: {},
};

export default ProductDetailView;
