import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, getIconPath } from '@tcp/core/src/utils/utils';
import Address from '@tcp/core/src/components/common/molecules/Address';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OrderBillingDetails.style';

/**
 * This function component use for return the OrderBillingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const OrderBillingDetails = ({ className, orderDetailsData, ordersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { checkout } = orderDetailsData;
  const { billing } = checkout;
  const { card } = billing;
  const cardIconMapping = {
    DISC: 'disc-small',
    MC: 'mc-small',
    Amex: 'amex-small',
    Visa: 'visa-bordered',
    GC: 'gift-card-small',
    'PLACE CARD': 'place-card-small',
    VENMO: 'venmo-bordered',
  };

  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        {getLabelValue(ordersLabels, 'lbl_orderDetails_billing')}
      </BodyCopy>
      <BodyCopy component="div" className="card-details">
        <Image src={getIconPath(cardIconMapping[card.cardType])} className="elem-mr-XS" />
        <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="extrabold">
          {`${getLabelValue(ordersLabels, 'lbl_orders_ending')} in ${card.endingNumbers.slice(-4)}`}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" fontSize="fs14" fontFamily="secondary">
        <Address address={billing.billingAddress} showCountry={false} showPhone={false} />
      </BodyCopy>
    </BodyCopy>
  );
};
OrderBillingDetails.propTypes = {
  className: PropTypes.string,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_billing: PropTypes.string,
  }),
  orderDetailsData: PropTypes.shape({}),
};

OrderBillingDetails.defaultProps = {
  className: '',
  ordersLabels: {
    lbl_orderDetails_billing: '',
  },
  orderDetailsData: {},
};

export default withStyles(OrderBillingDetails, styles);
