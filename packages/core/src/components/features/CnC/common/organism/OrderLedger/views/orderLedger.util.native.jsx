import React from 'react';
import { StyledRowDataContainer } from '../styles/orderLedger.style.native';
import { Text, View } from 'react-native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

export const renderCouponsAndSavingsTotal = (
  couponsTotal,
  fontSize,
  labels,
  currencySymbol,
  savingsTotal
) => {
  return (
    <>
      {couponsTotal ? (
        <StyledRowDataContainer>
          <Text>
            <BodyCopy
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize={fontSize}
              text={`${labels.couponsLabel}:`}
            />
          </Text>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize={fontSize}
              textAlign="right"
              text={`-${currencySymbol}${couponsTotal.toFixed(2)}`}
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
      {savingsTotal ? (
        <StyledRowDataContainer>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize={fontSize}
              text={`${labels.promotionsLabel}:`}
            />
          </Text>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize={fontSize}
              textAlign="right"
              text={`-${currencySymbol}${savingsTotal.toFixed(2)}`}
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
    </>
  );
};

export const orderHasShipping = (
  isOrderHasShipping,
  fontSize,
  labels,
  shippingTotal,
  currencySymbol
) => {
  return (
    <>
      {isOrderHasShipping ? (
        <StyledRowDataContainer>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize={fontSize}
              text={`${labels.shippingLabel}:`}
            />
          </Text>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize={fontSize}
              textAlign="right"
              text={
                // eslint-disable-next-line no-nested-ternary
                shippingTotal !== undefined
                  ? shippingTotal > 0
                    ? `${currencySymbol}${shippingTotal.toFixed(2)}`
                    : labels.free
                  : '-'
              }
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
    </>
  );
};
