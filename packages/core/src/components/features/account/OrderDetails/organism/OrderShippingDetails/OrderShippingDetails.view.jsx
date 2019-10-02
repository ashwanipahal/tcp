import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Address from '@tcp/core/src/components/common/molecules/Address';
import styles from './styles/OrderShippingDetails.style';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const OrderShippingDetails = ({ className, OrderDetailsData }) => {
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
        Shipping
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
};

OrderShippingDetails.defaultProps = {
  className: '',
  OrderDetailsData: [],
};

export default withStyles(OrderShippingDetails, styles);
export { OrderShippingDetails as OrderShippingDetailsVanilla };
