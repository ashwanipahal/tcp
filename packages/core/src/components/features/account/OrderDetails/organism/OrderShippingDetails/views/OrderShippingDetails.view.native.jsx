import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import Address from '@tcp/core/src/components/common/molecules/Address';
import PickUpSummary from '../../PickUpSummary';

/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

export const OrderShippingDetails = ({ orderDetailsData, ordersLabels }) => {
  const { checkout } = orderDetailsData;
  const { shippingAddress, pickUpStore } = checkout;

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
              text={
                shippingAddress
                  ? getLabelValue(ordersLabels, 'lbl_orderDetails_shipping')
                  : getLabelValue(ordersLabels, 'lbl_orderDetails_pickup')
              }
            />
            <Address
              address={shippingAddress}
              showCountry={false}
              showPhone={false}
              showName
              fontSize="fs14"
              regularName
              dataLocatorPrefix="address"
              className="elem-mb-SM elem-mt-XXS"
            />
          </ViewWithSpacing>
          {pickUpStore && <PickUpSummary pickUpStore={pickUpStore} ordersLabels={ordersLabels} />}
        </>
      )}
    </>
  );
};

OrderShippingDetails.propTypes = {
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
};

OrderShippingDetails.defaultProps = {
  ordersLabels: {},
  orderDetailsData: {},
};

export default OrderShippingDetails;
