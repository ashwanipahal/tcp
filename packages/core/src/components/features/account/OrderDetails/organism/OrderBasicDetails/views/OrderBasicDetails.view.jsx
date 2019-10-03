/* eslint-disable no-unused-vars */

// TO DO: Please remove eslint-disable when order work done

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getDateInformation } from '@tcp/core/src//utils/badge.util';
import { getLabelValue } from '@tcp/core/src/utils/utils';

/**
 * This function component use for return the OrderBasicDetails
 * can be passed in the component.
 * @param orderDetailsData - orderDetailsData object used for showing Order Details
 */

const OrderBasicDetails = ({ className, orderDetailsData, ordersLabels }) => {
  const { pickUpExpirationDate, orderNumber, status } = orderDetailsData;
  let { orderDate, bossMaxDate, bossMinDate } = orderDetailsData;
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

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <div className={className}>
      <BodyCopy component="div">
        <BodyCopy
          fontSize="fs14"
          fontWeight="extrabold"
          fontFamily="secondary"
          className="elem-mb-MED"
        >
          {getLabelValue(ordersLabels, 'lbl_orderDetails_orderNumber')}
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
          {getLabelValue(ordersLabels, 'lbl_orderDetails_orderDate')}
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
                {getLabelValue(ordersLabels, 'lbl_orderDetails_at')}
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
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
};

OrderBasicDetails.defaultProps = {
  className: '',
  orderDetailsData: {},
  ordersLabels: {},
};

export default OrderBasicDetails;
