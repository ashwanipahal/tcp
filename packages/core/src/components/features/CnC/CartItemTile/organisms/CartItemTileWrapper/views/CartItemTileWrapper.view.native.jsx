import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';
import CartItemTile from '../../../molecules/CartItemTile/views/CartItemTile.view.native';
import { getProductName, getProductDetails } from '../../../container/CartItemTile.selectors';

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight>
    <Text>Button 1</Text>
  </TouchableHighlight>,
  <TouchableHighlight>
    <Text>Button 2</Text>
  </TouchableHighlight>,
];

const CartItemTileWrapper = props => {
  const { orderItems, labels, pageView } = props;
  return (
    <View style={{ flex: 1 }}>
      {orderItems &&
        orderItems.size > 0 &&
        orderItems.map(tile => {
          const productDetail = getProductDetails(tile);

          return (
            <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
              <CartItemTile
                labels={labels}
                productDetail={productDetail}
                key={`${getProductName(tile)}`}
                pageView={pageView}
              />
            </Swipeable>
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
