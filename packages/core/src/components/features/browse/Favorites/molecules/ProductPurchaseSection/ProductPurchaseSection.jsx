import React from 'react';
import { PropTypes } from 'prop-types';

const ProductPurchaseSection = props => {
  let { purchased, quantity } = props;
  purchased = !purchased ? 0 : purchased;
  quantity = parseInt(quantity, 10);
  return (
    <div className="purchased-status-container count-purchase">
      <span className="purchased-status-content">
        {purchased}
        <span>/</span>
        {quantity}
      </span>
      <span className="purchased-status-flag"> Purchased</span>
    </div>
  );
};

ProductPurchaseSection.propTypes = {
  purchased: PropTypes.string,
  quantity: PropTypes.string,
};

ProductPurchaseSection.defaultProps = {
  purchased: '',
  quantity: '',
};

export default ProductPurchaseSection;
