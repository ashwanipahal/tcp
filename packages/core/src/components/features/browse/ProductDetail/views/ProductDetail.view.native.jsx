import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';

class ProductDetailView extends React.PureComponent {
  render() {
    const { currentProduct } = this.props;
    const { name, shortDescription } = currentProduct;
    return (
      <View>
        <Text>{name}</Text>
        <Text>{shortDescription}</Text>
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
