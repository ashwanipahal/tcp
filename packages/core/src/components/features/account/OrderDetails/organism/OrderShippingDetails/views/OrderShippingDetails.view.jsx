import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import Address from '@tcp/core/src/components/common/molecules/Address';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PickUpSummary from '../../PickUpSummary';
/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const OrderShippingDetails = ({ className, orderDetailsData, ordersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { checkout } = orderDetailsData;
  const { shippingAddress, pickUpStore } = checkout;

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
        className="elem-mb-MED"
      >
        {shippingAddress
          ? getLabelValue(ordersLabels, 'lbl_orderDetails_shipping')
          : getLabelValue(ordersLabels, 'lbl_orderDetails_pickup')}
      </BodyCopy>
      <BodyCopy component="div" fontSize="fs14" fontFamily="secondary">
        <Address address={shippingAddress} showCountry={false} showPhone={false} />
      </BodyCopy>
      {pickUpStore && <PickUpSummary pickUpStore={pickUpStore} ordersLabels={ordersLabels} />}
    </BodyCopy>
  );
};
OrderShippingDetails.propTypes = {
  className: PropTypes.string,
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_shipping: PropTypes.string,
  }),
};

OrderShippingDetails.defaultProps = {
  className: '',
  orderDetailsData: {},
  ordersLabels: {
    lbl_orderDetails_shipping: '',
  },
};

export default OrderShippingDetails;
