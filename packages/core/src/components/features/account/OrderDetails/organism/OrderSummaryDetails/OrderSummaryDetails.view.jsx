import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './styles/OrderSummaryDetails.style';

/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param OrdersLabels - OrdersLabels object used for showing Orders Labels
 */

const OrderShippingDetails = ({ className, OrdersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        {getLabelValue(OrdersLabels, 'lbl_orderDetails_orderSummary')}
      </BodyCopy>
    </BodyCopy>
  );
};
OrderShippingDetails.propTypes = {
  className: PropTypes.string,
  OrdersLabels: PropTypes.shape({
    lbl_orderDetails_orderSummary: PropTypes.string,
  }),
};

OrderShippingDetails.defaultProps = {
  className: '',
  OrdersLabels: {
    lbl_orderDetails_orderSummary: '',
  },
};

export default withStyles(OrderShippingDetails, styles);
export { OrderShippingDetails as OrderShippingDetailsVanilla };
