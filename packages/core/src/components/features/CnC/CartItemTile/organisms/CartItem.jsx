import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import ProductCustomizeForm from './ProductCustomizeForm';

// @flow

type Props = {
  updateCartItem: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  item: any,
  deleteCartItem: orderItemId => void,
  getProductSKUInfo: productNumber => void,
  editableProductInfo: any,
};

type State = {
  isEdit: boolean,
};

class CartItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  handleEditCartItem = productNumber => {
    const productNum = productNumber.slice(0, productNumber.indexOf('_'));
    const { isEdit } = this.state;
    const { getProductSKUInfo } = this.props;
    this.setState({ isEdit: !isEdit });
    getProductSKUInfo(productNum);
  };

  getInitialValuesForEditableForm = item => {
    return {
      // the initial values for the wrapped redux form
      color: item.productInfo.color,
      fit: item.productInfo.fit,
      size: item.productInfo.skuId,
      quantity: item.productInfo.quantity,
    };
  };

  handleSubmit = (itemId, skuId, quantity, itemPartNumber, variantNo) => {
    const { updateCartItem } = this.props;
    const { isEdit } = this.state;
    updateCartItem(itemId, skuId, quantity, itemPartNumber, variantNo);
    this.setState({ isEdit: !isEdit });
  };

  render() {
    const { item, deleteCartItem, editableProductInfo } = this.props;
    const { isEdit } = this.state;
    return (
      <React.Fragment>
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
          <h4 className="upc-number">
            Upc:
            {item.productInfo.upc}
          </h4>
          <p>{item.productInfo.fit}</p>
          <p>{item.productInfo.size}</p>
          <p>{item.productInfo.color.name}</p>
        </div>
        <div className="container-price">
          <span className="text-price product-offer-price">
            {item.itemInfo.offerPrice.toFixed(2)}
          </span>
          {/* changed copy to match VD */}
          {item.itemInfo.listPrice !== item.itemInfo.offerPrice && (
            <span className="text-price product-list-price">
              Was
              {item.itemInfo.listPrice.toFixed(2)}
            </span>
          )}

          <div className="container-price__item-points">
            My Place Rewards Points:
            <span className="user-tier-theme">{item.itemInfo.itemPoints}</span>
          </div>
          <button onClick={() => deleteCartItem(item.itemInfo.itemId)}> Delete</button>
          <button
            className="edit-cart"
            onClick={() => this.handleEditCartItem(item.productInfo.productPartNumber)}
          >
            {' '}
            Edit
          </button>
        </div>
        {isEdit && (
          <ProductCustomizeForm
            item={item}
            colorFitsSizesMap={editableProductInfo && editableProductInfo.colorFitsSizesMap}
            handleSubmit={this.handleSubmit}
            initialValues={this.getInitialValuesForEditableForm(item)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default CartItem;
