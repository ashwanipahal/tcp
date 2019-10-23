/** @module PDP - Product Price
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { PromotionalMessage } from '../../../ProductListing/molecules/ProductList/views/ProductItemComponents';
import { getPromotionalMessage } from '../../../../../../utils';
import { BodyCopy } from '../../../../../common/atoms';
import withStyles from '../../../../../common/hoc/withStyles';
import productPriceStyle from './ProductPrice.style';

const getExchangeValue = currencyExchange => {
  return currencyExchange;
};

const getListPricePostFix = (highListPrice, nonUSCA, currencySymbol) => {
  return highListPrice ? ` - ${nonUSCA ? currencySymbol : ''}${highListPrice.toFixed(2)}` : '';
};

const getHighOfferPrice = (highOfferPrice, nonUSCA, currencySymbol) => {
  return highOfferPrice ? ` - ${nonUSCA ? currencySymbol : ''}${highOfferPrice.toFixed(2)}` : '';
};

class ProductPrice extends React.Component {
  static propTypes = {
    isItemPartNumberVisible: PropTypes.bool.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    listPrice: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
    highOfferPrice: PropTypes.number,
    highListPrice: PropTypes.number,
    itemPartNumber: PropTypes.string,
    priceCurrency: PropTypes.string.isRequired,
    currencyExchange: PropTypes.shape({}),
    promotionalMessage: PropTypes.string,
    isPlcc: PropTypes.bool.isRequired,
    promotionalPLCCMessage: PropTypes.string,
    badge2: PropTypes.string,
    favIconContainer: PropTypes.shape({}),
    customFonts: PropTypes.shape({ listPriceFont: PropTypes.string }),
    className: PropTypes.string,
  };

  static defaultProps = {
    offerPrice: null,
    itemPartNumber: '',
    currencyExchange: {},
    promotionalMessage: '',
    promotionalPLCCMessage: '',
    highOfferPrice: '',
    highListPrice: '',
    badge2: '',
    favIconContainer: null,
    className: '',
    customFonts: {},
  };

  getBadge = badge2 => {
    return badge2 ? (
      <BodyCopy
        className="badge"
        color="red.500"
        fontSize="fs14"
        fontWeight="semibold"
        fontFamily="secondary"
      >
        {badge2}
      </BodyCopy>
    ) : null;
  };

  getPriceMarkUp = () => {
    let { listPrice, offerPrice, highOfferPrice, highListPrice } = this.props;
    const { badge2 } = this.props;
    const {
      className,
      currencySymbol,
      currencyExchange,
      priceCurrency /* , isBundleProduct, isBundleList */,
      customFonts: { listPriceFont },
    } = this.props;
    const currency = currencySymbol === 'USD' ? '$' : currencySymbol;
    const exchangeValue = getExchangeValue(currencyExchange);
    if (exchangeValue) {
      offerPrice *= exchangeValue;
      listPrice *= exchangeValue;
      highOfferPrice *= exchangeValue;
      highListPrice *= exchangeValue;
    }
    const nonUSCA = priceCurrency === 'CAD' || priceCurrency === 'USD';
    const listPricePostFix = getListPricePostFix(highListPrice, nonUSCA, currencySymbol);
    const offerPricePostFix = getHighOfferPrice(highOfferPrice, nonUSCA, currencySymbol);
    const showBothPrice =
      (offerPrice && offerPrice !== listPrice) ||
      (highOfferPrice && highOfferPrice !== highListPrice);
    if (showBothPrice) {
      return (
        <div className={`${className} price-container`}>
          <BodyCopy
            className="price-item actual-price"
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="black"
            color="red.500"
          >
            {currency}
            {offerPrice.toFixed(2)}
            {offerPricePostFix}
          </BodyCopy>
          <div className="list-badge-container">
            <BodyCopy
              className="price-item original-price"
              fontSize={listPriceFont || 'fs13'}
              fontFamily="secondary"
              color="gray.800"
            >
              {/* TODO - fix it with bundle {!(isBundleProduct || isBundleList) ? 'Was' : ''}  */}
              {currency}
              {listPrice.toFixed(2)}
              {listPricePostFix}
            </BodyCopy>
            {this.getBadge(badge2)}
          </div>
        </div>
      );
    }
    if (offerPrice) {
      return (
        <BodyCopy
          className="price-item actual-price"
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="black"
          color="red.500"
        >
          {currency}
          {offerPrice.toFixed(2)}
          {offerPricePostFix}
        </BodyCopy>
      );
    }
    return (
      <BodyCopy
        className="price-item actual-price"
        fontSize="fs13"
        fontFamily="secondary"
        color="gray.500"
      >
        {currency}
        {listPrice.toFixed(2)}
        {listPricePostFix}
      </BodyCopy>
    );
  };

  render() {
    const {
      isItemPartNumberVisible,
      itemPartNumber,
      priceCurrency,
      promotionalMessage,
      // isCanada,
      promotionalPLCCMessage,
      isPlcc,
      // isInternationalShipping,
      // isBundleProduct,
      className,
      // isBundleList,
    } = this.props;

    return (
      <section
        className={`${className} product-price-container`}
        itemScope
        itemType="https://schema.org/Offer"
      >
        <div>
          {this.getPriceMarkUp()}

          {isItemPartNumberVisible && (
            <strong className="number-item">
              Item #:
              {itemPartNumber}
            </strong>
          )}
        </div>
        <meta itemProp="priceCurrency" content={priceCurrency} />
        <link itemProp="availability" href="http://schema.org/InStock" />

        {/* TODO - bundle logic check */}
        {/* {!isBundleProduct && !(isBundleList) && !isCanada && !isInternationalShipping && */}
        {promotionalMessage && (
          <PromotionalMessage
            text={getPromotionalMessage(isPlcc, {
              promotionalMessage,
              promotionalPLCCMessage,
            })}
          />
        )}
        {/* } */}
      </section>
    );
  }
}

export default withStyles(ProductPrice, productPriceStyle);
