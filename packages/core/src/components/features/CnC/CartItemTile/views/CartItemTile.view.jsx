// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
import React from 'react';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

// @flow

type Props = {
  getOrderDetails: () => void,
  removeCartItem: orderItemId => void,
  cartItems: any,
};

class CartItemTile extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  loadGetOrderDetails = e => {
    const { getOrderDetails } = this.props;
    getOrderDetails();
  };

  deleteCartItem = orderItemId => {
    console.log('delete cart item');
    const { removeCartItem } = this.props;
    removeCartItem(orderItemId);
  };

  render() {
    const { cartItems } = this.props;
    console.log(this.props);
    return (
      <div>
        <span>CART ITEM TILE</span>
        <button onClick={this.loadGetOrderDetails}>load data</button>
        <Row tagName="ul" className="cart-items-list">
          {cartItems &&
            cartItems.map(item => (
              <Col tagName="li" className="cart-item" colSize={{ small: 2, medium: 3, large: 4 }}>
                <div className="product-title">
                  <h4>
                    <a
                      href={item.productInfo.pdpUrl}
                      className="department-name"
                      title={item.productInfo.name}
                    >
                      {item.productInfo.name}
                    </a>
                  </h4>
                  <h4 className="upc-number" tabIndex="0">
                    Upc: {item.productInfo.upc}
                  </h4>
                  <p>{item.productInfo.fit}</p>
                  <p>{item.productInfo.size}</p>
                  <p>{item.productInfo.color.name}</p>
                </div>
                <div className="container-price">
                  <span className="text-price product-offer-price" tabIndex="0">
                    {item.itemInfo.offerPrice.toFixed(2)}
                  </span>
                  {/* changed copy to match VD */}
                  {item.itemInfo.listPrice !== item.itemInfo.offerPrice && (
                    <span className="text-price product-list-price" tabIndex="0">
                      Was {item.itemInfo.listPrice.toFixed(2)}
                    </span>
                  )}

                  <div className="container-price__item-points" tabIndex="0">
                    My Place Rewards Points:
                    <span className="user-tier-theme"> {item.itemInfo.itemPoints}</span>
                  </div>
                  <button onClick={() => this.deleteCartItem(item.itemInfo.itemId)}> Delete</button>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

export default CartItemTile;
