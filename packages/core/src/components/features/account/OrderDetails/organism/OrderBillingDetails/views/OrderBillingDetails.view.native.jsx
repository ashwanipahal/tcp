import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { getIconCard } from '@tcp/core/src/utils/index.native';

import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import Address from '@tcp/core/src/components/common/molecules/Address';
import { ImageWrapper, ImageStyle } from '../styles/OrderBillingDetails.style.native';

import cardIconMapping from '../OrderBillingDetails.constants';

/**
 * This function component use for return the OrderBillingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

export const OrderBillingDetails = ({ orderDetailsData, ordersLabels }) => {
  const { checkout, appliedGiftCards } = orderDetailsData;
  const { billing } = checkout;
  const { card } = billing;
  const getCardTypeImgUrl = cardType => {
    return getIconCard(cardIconMapping[cardType]);
  };
  return (
    <>
      {orderDetailsData && (
        <>
          <ViewWithSpacing spacingStyles="margin-top-MED">
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs14"
              fontWeight="semibold"
              spacingStyles="margin-top-XS margin-bottom-XS"
              text={getLabelValue(ordersLabels, 'lbl_orderDetails_billing')}
            />
            <ImageWrapper>
              <ImageStyle source={getCardTypeImgUrl(card.cardType)} />
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs12"
                fontWeight="semibold"
                spacingStyles="margin-top-XS margin-bottom-XS"
                text={
                  card.cardType.toUpperCase() !== cardIconMapping.VENMO
                    ? `${getLabelValue(
                        ordersLabels,
                        'lbl_orders_ending'
                      )} ${card.endingNumbers.slice(-4)}`
                    : card.endingNumbers
                }
              />
            </ImageWrapper>
          </ViewWithSpacing>
          {appliedGiftCards &&
            appliedGiftCards.length > 0 &&
            appliedGiftCards.map(giftCard => {
              return (
                <ImageWrapper>
                  <ImageStyle source={getCardTypeImgUrl(giftCard.cardType)} />
                  <BodyCopyWithSpacing
                    fontFamily="primary"
                    fontSize="fs12"
                    fontWeight="semibold"
                    spacingStyles="margin-top-XS margin-bottom-XS"
                    text={`${getLabelValue(
                      ordersLabels,
                      'lbl_orders_ending'
                    )} ${giftCard.endingNumbers.slice(-4)}`}
                  />
                </ImageWrapper>
              );
            })}
          <Address
            address={billing.billingAddress}
            showCountry={false}
            showPhone={false}
            showName
            fontSize="fs14"
            regularName
            dataLocatorPrefix="address"
            className="elem-mb-SM elem-mt-SM"
          />
        </>
      )}
    </>
  );
};

OrderBillingDetails.propTypes = {
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_billing: PropTypes.string,
  }),
  orderDetailsData: PropTypes.shape({}),
};

OrderBillingDetails.defaultProps = {
  ordersLabels: {
    lbl_orderDetails_billing: '',
  },
  orderDetailsData: {},
};

export default OrderBillingDetails;
