import React from 'react';
import { PropTypes } from 'prop-types';

const ProductSKUInfo = props => {
  const { color, size, fit } = props;

  if (!color && !size && !fit) {
    return null;
  }

  return (
    <div className="product-sku-info-container">
      {color && <img src={color.imagePath} alt={color.name} className="img-color" />}
      {size && (
        <span className="size-container">
          Size
          {size}
        </span>
      )}
      {size && fit && <i className="separator-bar-icon">|</i>}
      {fit && <span className="fit-container">{fit}</span>}
    </div>
  );
};

ProductSKUInfo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  fit: PropTypes.string,
};

ProductSKUInfo.defaultProps = {
  color: '',
  size: '',
  fit: '',
};

export default ProductSKUInfo;
