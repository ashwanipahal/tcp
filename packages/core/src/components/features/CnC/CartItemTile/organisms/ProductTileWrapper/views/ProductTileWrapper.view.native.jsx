import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';

const ProductTileWrapper = props => {
  const { orderItems, bagLabels, isUserLoggedIn } = props;
  if (orderItems && orderItems.size > 0) {
    return (
      <View>
        <Text>Product Tile</Text>
      </View>
    );
  }
  return <EmptyBag bagLabels={bagLabels} isUserLoggedIn={isUserLoggedIn} />;
};

ProductTileWrapper.defaultProps = {
  bagLabels: {},
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  bagLabels: PropTypes.shape(),
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
