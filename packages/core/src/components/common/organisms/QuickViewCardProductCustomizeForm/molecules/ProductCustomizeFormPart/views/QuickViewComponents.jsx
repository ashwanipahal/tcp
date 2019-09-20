import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../atoms';

/**
 * @method ProductPricesBopisSection this method component to display
 *  offer price and list price
 * @param {props} props contain price values.
 */
export default function ProductPricesBopisSection(props) {
  const { currencySymbol, listPrice, offerPrice, currentColorEntry } = props;
  const currentColorEntryListPrice =
    (currentColorEntry && currentColorEntry.listPrice) || listPrice;
  const currentColorEntryOfferPrice =
    (currentColorEntry && currentColorEntry.offerPrice) || offerPrice;
  const merchantBadge =
    currentColorEntry && currentColorEntry.miscInfo && currentColorEntry.miscInfo.badge2;
  return (
    <div className="container-price-bopis">
      {currentColorEntryOfferPrice && (
        <BodyCopy color="red.500" fontSize="fs22" fontWeight="black" fontFamily="secondary">
          {currencySymbol + offerPrice.toFixed(2)}
        </BodyCopy>
      )}
      {currentColorEntryListPrice && currentColorEntryOfferPrice !== currentColorEntryListPrice && (
        <BodyCopy fontFamily="secondary" color="gray.800" fontSize="fs14">
          {currencySymbol + currentColorEntryListPrice.toFixed(2)}
        </BodyCopy>
      )}
      <BodyCopy color="red.500" fontSize="fs14" fontWeight="semibold" fontFamily="secondary">
        {merchantBadge}
      </BodyCopy>
    </div>
  );
}

ProductPricesBopisSection.propTypes = {
  listPrice: PropTypes.number,
  offerPrice: PropTypes.number,
  currencySymbol: PropTypes.string,
  currentColorEntry: PropTypes.shape({}),
};

ProductPricesBopisSection.defaultProps = {
  currencySymbol: 'USD',
  listPrice: '',
  offerPrice: '',
  currentColorEntry: '',
};
