/**
 * These are temporary changes for a dummy Bag page
 */
import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import CartItem from '../organisms/CartItem';
import OrderLedgerContainer from '../molecules/OrderLedger';

// @flow

type Props = {
  getOrderDetails: () => void,
  removeCartItem: orderItemId => void,
  cartItems: any,
  updateCartItem: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  getProductSKUInfo: productNumber => void,
  editableProductInfo: any,
};

class CartItemTile extends React.Component<Props> {
  loadGetOrderDetails = () => {
    const { getOrderDetails } = this.props;
    getOrderDetails();
  };

  deleteCartItem = orderItemId => {
    const { removeCartItem } = this.props;
    removeCartItem(orderItemId);
  };

  render() {
    const { cartItems, editableProductInfo, getProductSKUInfo, updateCartItem } = this.props;
    return (
      <div>
        <span>CART ITEM TILE</span>
        <button onClick={this.loadGetOrderDetails}>load data</button>
        <Row tagName="ul" className="cart-items-list">
          {cartItems &&
            cartItems.map(item => (
              <Col tagName="li" className="cart-item" colSize={{ small: 2, medium: 3, large: 12 }}>
                <CartItem
                  updateCartItem={updateCartItem}
                  item={item}
                  deleteCartItem={this.deleteCartItem}
                  getProductSKUInfo={getProductSKUInfo}
                  editableProductInfo={editableProductInfo}
                />
              </Col>
            ))}
        </Row>
        <OrderLedgerContainer />
      </div>
    );
  }
}

export default CartItemTile;
