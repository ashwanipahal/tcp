import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import LineComp from '@tcp/core/src/components/common/atoms/Line';

import formatAmount from '../utils';
import {
  HeadRowDataContainer,
  StyledRowDataContainer,
} from '../styles/OrderSummaryDetails.style.native';

/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */
export const OrderSummaryDetails = ({ ordersLabels, orderDetailsData }) => {
  const { summary } = orderDetailsData || {};
  const {
    // canceledItem,
    couponsTotal,
    currencySymbol,
    grandTotal,
    purchasedItems,
    // returnedItems,
    // returnedTotal,
    // shippedItems,
    shippingTotal,
    subTotal,
    // totalItems,
    totalTax,
  } = summary || {};

  return (
    <>
      {orderDetailsData && (
        <>
          <HeadRowDataContainer>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                fontWeight="semibold"
                textAlign="left"
                spacingStyles="margin-top-MED margin-bottom-XS"
                text={getLabelValue(ordersLabels, 'lbl_orderDetails_orderSummary')}
              />
            </Text>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                fontWeight="semibold"
                textAlign="left"
                spacingStyles="margin-top-MED margin-bottom-XS"
                text={getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}
              />
            </Text>
          </HeadRowDataContainer>
          <StyledRowDataContainer>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                textAlign="left"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={`${getLabelValue(ordersLabels, 'lbl_orders_items')} (${purchasedItems}):`}
              />
            </Text>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                textAlign="left"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={formatAmount(subTotal, currencySymbol)}
              />
            </Text>
          </StyledRowDataContainer>
          <StyledRowDataContainer>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                textAlign="left"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={`${getLabelValue(ordersLabels, 'lbl_orders_couponsPromotions')}:`}
              />
            </Text>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                textAlign="left"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={formatAmount(couponsTotal, currencySymbol)}
              />
            </Text>
          </StyledRowDataContainer>
          <StyledRowDataContainer>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                textAlign="left"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={`${getLabelValue(ordersLabels, 'lbl_orderDetails_shipping')}:`}
              />
            </Text>
            <Text>
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                textAlign="left"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={
                  shippingTotal > 0
                    ? formatAmount(shippingTotal, currencySymbol)
                    : `${getLabelValue(ordersLabels, 'lbl_orders_free')}`
                }
              />
            </Text>
          </StyledRowDataContainer>
          {totalTax && (
            <StyledRowDataContainer>
              <Text>
                <BodyCopyWithSpacing
                  fontFamily="primary"
                  fontSize="fs14"
                  textAlign="left"
                  spacingStyles="margin-top-XS margin-bottom-XS"
                  text={`${getLabelValue(ordersLabels, 'lbl_orders_tax')}:`}
                />
              </Text>
              <Text>
                <BodyCopyWithSpacing
                  fontFamily="primary"
                  fontSize="fs14"
                  textAlign="left"
                  spacingStyles="margin-top-XS margin-bottom-XS"
                  text={`${currencySymbol}${totalTax.toFixed(2)}`}
                />
              </Text>
            </StyledRowDataContainer>
          )}
          <LineComp borderColor="gray.600" borderWidth={1} marginTop={10} marginBottom={10} />
          {grandTotal && (
            <StyledRowDataContainer>
              <Text>
                <BodyCopyWithSpacing
                  fontFamily="primary"
                  fontSize="fs14"
                  textAlign="left"
                  spacingStyles="margin-top-XS margin-bottom-XS"
                  text={`${getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}:`}
                />
              </Text>
              <Text>
                <BodyCopyWithSpacing
                  fontFamily="primary"
                  fontSize="fs14"
                  textAlign="left"
                  spacingStyles="margin-top-XS margin-bottom-XS"
                  text={`${currencySymbol}${grandTotal.toFixed(2)}`}
                />
              </Text>
            </StyledRowDataContainer>
          )}
        </>
      )}
    </>
  );
};

OrderSummaryDetails.propTypes = {
  ordersLabels: PropTypes.shape({ lbl_orderDetails_orderSummary: PropTypes.string }),
  orderDetailsData: PropTypes.shape({}),
};

OrderSummaryDetails.defaultProps = {
  ordersLabels: { lbl_orderDetails_orderSummary: '' },
  orderDetailsData: {},
};

export default OrderSummaryDetails;
