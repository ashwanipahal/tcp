import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CartItemTile from '../../../molecules/CartItemTile/views/CartItemTile.view.native';
import { getProductName, getProductDetails } from '../../../container/CartItemTile.selectors';

const CartItemTileWrapper = props => {
  const { orderItems, labels, pageView } = props;
  return (
    <View style={{ flex: 1 }}>
      {orderItems &&
        orderItems.size > 0 &&
        orderItems.map(tile => {
          const productDetail = getProductDetails(tile);

          return (
            <CartItemTile
              labels={labels}
              productDetail={productDetail}
              key={`${getProductName(tile)}`}
              pageView={pageView}
            />
          );
        })}
    </View>
  );
};

CartItemTileWrapper.defaultProps = {
  pageView: '',
};

CartItemTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  pageView: PropTypes.string,
};


export default CartItemTileWrapper;
export { CartItemTileWrapper as CartItemTileWrapperVanilla };
