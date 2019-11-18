import React from 'react';
import PropTypes from 'prop-types';

class PriceCurrency extends React.Component {
  render() {
    const { currency, currencySymbol, price } = this.props;
    return currency === 'USD' || currency === 'CAD'
      ? `${currencySymbol}${(price && price.toFixed(2)) || 0}`
      : `${currencySymbol} ${(price && price.toFixed(2)) || 0}`;
  }
}

PriceCurrency.propTypes = {
  currency: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default PriceCurrency;
export { PriceCurrency as PriceCurrencyVanilla };
