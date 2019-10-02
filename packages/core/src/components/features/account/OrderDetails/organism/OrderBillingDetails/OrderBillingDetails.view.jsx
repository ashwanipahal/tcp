import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from './styles/OrderBillingDetails.style';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const OrderBillingDetails = ({ className }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        Billing
      </BodyCopy>
    </BodyCopy>
  );
};
OrderBillingDetails.propTypes = {
  className: PropTypes.string,
};

OrderBillingDetails.defaultProps = {
  className: '',
};

export default withStyles(OrderBillingDetails, styles);
export { OrderBillingDetails as OrderBillingDetailsVanilla };
