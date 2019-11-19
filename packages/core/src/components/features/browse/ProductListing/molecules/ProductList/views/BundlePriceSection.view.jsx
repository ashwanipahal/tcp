import React from 'react';
import { BodyCopy } from '../../../../../../common/atoms';
import { getLocator } from '../../../../../../../utils';

export default function(
  highListPrice,
  highOfferPrice,
  lowListPrice,
  lowOfferPrice,
  currencySymbol,
  merchantTag
) {
  return (
    <div className="container-price">
      {!!highOfferPrice && !!lowOfferPrice && highOfferPrice !== lowOfferPrice ? (
        <BodyCopy
          dataLocator={getLocator('global_Price_text')}
          color="red.500"
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize={['fs15', 'fs18', 'fs20']}
        >
          {`${currencySymbol} ${lowOfferPrice.toFixed(
            2
          )} - ${currencySymbol} ${highOfferPrice.toFixed(2)}`}
        </BodyCopy>
      ) : (
        <BodyCopy
          dataLocator={getLocator('global_Price_text')}
          color="red.500"
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize={['fs15', 'fs18', 'fs20']}
        >
          {`${currencySymbol} ${lowOfferPrice.toFixed(2)}`}
        </BodyCopy>
      )}
      {!!highListPrice && !!lowListPrice && highListPrice !== lowListPrice ? (
        <span className="list-price-container">
          <BodyCopy
            component="span"
            color="gray.700"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize={['fs10', 'fs12', 'fs14']}
            className="list-price"
          >
            {`${currencySymbol} ${lowListPrice.toFixed(2)}`}
          </BodyCopy>
          <BodyCopy
            component="span"
            color="gray.700"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize={['fs10', 'fs12', 'fs14']}
          >
            {` - `}
          </BodyCopy>
          <BodyCopy
            component="span"
            color="gray.700"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize={['fs10', 'fs12', 'fs14']}
            className="list-price"
          >
            {`${currencySymbol} ${highListPrice.toFixed(2)}`}
          </BodyCopy>
        </span>
      ) : (
        lowListPrice &&
        lowListPrice !== lowOfferPrice && (
          <BodyCopy
            component="span"
            color="gray.700"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize={['fs10', 'fs12', 'fs14']}
            className="list-price"
          >
            {currencySymbol + lowListPrice.toFixed(2)}
          </BodyCopy>
        )
      )}
      {!!merchantTag && (
        <BodyCopy
          component="span"
          color="red.500"
          fontFamily="secondary"
          fontWeight="semibold"
          className="merchant-tag"
          fontSize={['fs10', 'fs12', 'fs14']}
        >
          {merchantTag}
        </BodyCopy>
      )}
    </div>
  );
}
