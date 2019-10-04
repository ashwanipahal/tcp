import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';

/**
 * This function component use for return the OrderBillingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const OrderBillingDetails = ({ className, ordersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        {getLabelValue(ordersLabels, 'lbl_orderDetails_billing')}
      </BodyCopy>
    </BodyCopy>
  );
};
OrderBillingDetails.propTypes = {
  className: PropTypes.string,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_billing: PropTypes.string,
  }),
};

OrderBillingDetails.defaultProps = {
  className: '',
  ordersLabels: {
    lbl_orderDetails_billing: '',
  },
};

export default OrderBillingDetails;
