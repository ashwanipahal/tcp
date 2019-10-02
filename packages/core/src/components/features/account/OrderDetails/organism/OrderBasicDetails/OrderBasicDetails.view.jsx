/* eslint-disable no-unused-vars */
// TO DO: Please remove eslint-disable when order work done

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getDateInformation } from '@tcp/core/src//utils/badge.util';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './styles/OrderBasicDetails.style';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const OrderBasicDetails = ({ className, OrderDetailsData, OrdersLabels }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const { pickUpExpirationDate, orderNumber, status } = OrderDetailsData;
  let { orderDate, bossMaxDate, bossMinDate } = OrderDetailsData;
  let pickUpExpirationTime = pickUpExpirationDate && pickUpExpirationDate.split(' ')[1];
  let orderTime = orderDate.split(' ')[1];
  orderDate = moment(orderDate);
  orderTime = orderTime && moment(orderTime, 'HH:mm:ss');
  pickUpExpirationTime = pickUpExpirationTime && moment(orderTime, 'HH:mm:ss');
  bossMinDate = bossMinDate ? getDateInformation(bossMinDate) : '';
  bossMaxDate = bossMaxDate ? getDateInformation(bossMaxDate) : '';
  const bossDate =
    !!(bossMinDate && bossMaxDate) &&
    `${bossMinDate.day}. ${bossMinDate.month}
   ${bossMinDate.date} - ${bossMaxDate.day}. ${bossMaxDate.month} ${bossMaxDate.date}`;

  return (
    <div className={className}>
      <BodyCopy component="div">
        <BodyCopy
          fontSize="fs14"
          fontWeight="extrabold"
          fontFamily="secondary"
          className="elem-mb-MED"
        >
          {getLabelValue(OrdersLabels, 'lbl_orderDetails_orderNumber')}
        </BodyCopy>
        <BodyCopy fontSize="fs14" fontWeight="black" fontFamily="secondary">
          {orderNumber}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" className="elem-mt-XL">
        <BodyCopy
          fontSize="fs14"
          fontWeight="extrabold"
          fontFamily="secondary"
          className="elem-mb-MED"
        >
          {getLabelValue(OrdersLabels, 'lbl_orderDetails_orderDate')}
        </BodyCopy>
        <BodyCopy fontSize="fs14" fontFamily="secondary">
          {orderDate.format('LL')}
          {orderTime && (
            <>
              <BodyCopy
                component="span"
                fontSize="fs14"
                className="elem-mr-XXS elem-ml-XXS"
                fontFamily="secondary"
              >
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_at')}

              </BodyCopy>
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                {orderTime.format('hh:mma')}
              </BodyCopy>
            </>
          )}
        </BodyCopy>
      </BodyCopy>
    </div>
  );
};
OrderBasicDetails.propTypes = {
  className: PropTypes.string,
  OrderDetailsData: PropTypes.shape([]),
  OrdersLabels: PropTypes.shape({}),
};

OrderBasicDetails.defaultProps = {
  className: '',
  OrderDetailsData: [],
  OrdersLabels: {},
};

export default withStyles(OrderBasicDetails, styles);
export { OrderBasicDetails as OrderBasicDetailsVanilla };
