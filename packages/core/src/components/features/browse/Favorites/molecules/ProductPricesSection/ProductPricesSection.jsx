import React from 'react';
import { PropTypes } from 'prop-types';

const ProductPricesSection = ({ currencySymbol, listPrice, offerPrice }) => {
  return (
    <div className="container-price">
      {offerPrice && <span>{currencySymbol + offerPrice.toFixed(2)}</span>}
      {offerPrice && offerPrice !== listPrice && (
        <span className="">{currencySymbol + listPrice.toFixed(2)}</span>
      )}
    </div>
  );
};

ProductPricesSection.propTypes = {
  currencySymbol: PropTypes.string,
  listPrice: PropTypes.string,
  offerPrice: PropTypes.string,
};

ProductPricesSection.defaultProps = {
  currencySymbol: '',
  listPrice: '',
  offerPrice: '',
};

export default ProductPricesSection;
