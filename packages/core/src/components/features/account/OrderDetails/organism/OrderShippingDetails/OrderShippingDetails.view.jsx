import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Address from '@tcp/core/src/components/common/molecules/Address';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './styles/OrderShippingDetails.style';

/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param OrdersLabels - OrdersLabels object used for showing Orders Labels
 */

const OrderShippingDetails = ({ className, OrderDetailsData, OrdersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { checkout } = OrderDetailsData;
  const { shippingAddress } = checkout;

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy
        fontSize="fs14"
        fontWeight="extrabold"
        fontFamily="secondary"
        className="elem-mb-MED"
      >
        {getLabelValue(OrdersLabels, 'lbl_orderDetails_shipping')}
      </BodyCopy>
      <BodyCopy component="div" fontSize="fs14" fontFamily="secondary">
        <Address address={shippingAddress} showCountry={false} showPhone={false} />
      </BodyCopy>
    </BodyCopy>
  );
};
OrderShippingDetails.propTypes = {
  className: PropTypes.string,
  OrderDetailsData: PropTypes.shape([]),
  OrdersLabels: PropTypes.shape({
    lbl_orderDetails_shipping: PropTypes.string,
  }),
};

OrderShippingDetails.defaultProps = {
  className: '',
  OrderDetailsData: [],
  OrdersLabels: {
    lbl_orderDetails_shipping: '',
  },
};

export default withStyles(OrderShippingDetails, styles);
export { OrderShippingDetails as OrderShippingDetailsVanilla };
