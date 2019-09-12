/** @module PDP - Product Price
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { PromotionalMessage } from '../../../ProductListing/molecules/ProductList/views/ProductItemComponents';
import { getPromotionalMessage } from '../../../../../../utils';
import { BodyCopy } from '../../../../../common/atoms';
import withStyles from '../../../../../common/hoc/withStyles';

const getExchangeValue = currencyExchange => {
  return currencyExchange && currencyExchange[0] && currencyExchange[0].exchangevalue;
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
    badge2: PropTypes.shape({}),
    favIconContainer: PropTypes.shape({}),
  };

  static defaultProps = {
    offerPrice: null,
    itemPartNumber: '',
    currencyExchange: {},
    promotionalMessage: '',
    promotionalPLCCMessage: '',
    highOfferPrice: '',
    highListPrice: '',
    badge2: null,
    favIconContainer: null,
  };

  getPriceMarkUp = () => {
    let { listPrice, offerPrice, highOfferPrice, highListPrice } = this.props;
    const {
      currencySymbol,
      currencyExchange,
      priceCurrency /* , isBundleProduct, isBundleList */,
    } = this.props;
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
        <React.Fragment>
          <BodyCopy
            className="price-item actual-price"
            fontSize="fs22"
            fontFamily="secondary"
            fontWeight="black"
            color="red.500"
          >
            {currencySymbol}
            {offerPrice.toFixed(2)}
            {offerPricePostFix}
          </BodyCopy>
          <BodyCopy
            className="price-item original-price"
            fontSize="fs13"
            fontFamily="secondary"
            color="gray.600"
          >
            {/* TODO - fix it with bundle {!(isBundleProduct || isBundleList) ? 'Was' : ''}  */}
            {currencySymbol}
            {listPrice.toFixed(2)}
            {listPricePostFix}
          </BodyCopy>
        </React.Fragment>
      );
    }
    if (offerPrice) {
      return (
        <BodyCopy
          className="price-item actual-price"
          fontSize="fs22"
          fontFamily="secondary"
          fontWeight="black"
          color="red.500"
        >
          {currencySymbol}
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
        {currencySymbol}
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
      badge2,
      // isBundleList,
    } = this.props;

    console.log('promotionalMessage', promotionalMessage);
    return (
      <section className="product-price-container" itemScope itemType="https://schema.org/Offer">
        <div>
          {this.getPriceMarkUp()}
          {badge2 && <span className="bundle-badge-container">{badge2}</span>}
          {isItemPartNumberVisible && (
            <strong className="number-item">
              Item #:
              {itemPartNumber}
            </strong>
          )}
        </div>
        <meta itemProp="priceCurrency" content={priceCurrency} />
        <link itemProp="availability" href="http://schema.org/InStock" />

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

export default withStyles(ProductPrice);
