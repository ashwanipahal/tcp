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
  const { orderNumber, pickUpExpirationDate, isBossOrder, status } = orderDetailsData;
  let { orderDate, bossMaxDate, bossMinDate } = orderDetailsData;
  let pickUpExpirationTime = pickUpExpirationDate && pickUpExpirationDate.split(' ')[1];
  let orderTime = orderDate.split(' ')[1];
  orderDate = moment(orderDate);
  orderTime = orderTime && moment(orderTime, 'HH:mm:ss');
  pickUpExpirationTime = pickUpExpirationTime && moment(orderTime, 'HH:mm:ss');
  bossMinDate = getDateInformation(bossMinDate);
  bossMaxDate = getDateInformation(bossMaxDate);
  const bossDate =
    !!(bossMinDate && bossMaxDate) &&
    `${bossMinDate.day}. ${bossMinDate.month} ${bossMinDate.date} - ${bossMaxDate.day}. ${
      bossMaxDate.month
    } ${bossMaxDate.date}`;

  /**
   * @function return  render the JSX of BOSS order pickup details
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  const getExpectedPickupDetails = () => {
    if (isBossOrder && bossDate) {
      return (
        <BodyCopy component="div" className="elem-mt-LRG">
          <BodyCopy
            fontSize="fs14"
            fontWeight="extrabold"
            fontFamily="secondary"
            className="elem-mb-SM"
          >
            {getLabelValue(ordersLabels, 'lbl_orders_expectedPickup')}
          </BodyCopy>
          <BodyCopy fontSize="fs14" fontFamily="secondary">
            {bossDate}
          </BodyCopy>
          <BodyCopy
            fontSize="fs14"
            fontWeight="extrabold"
            fontFamily="secondary"
            className="elem-mb-SM"
          >
            {getLabelValue(ordersLabels, 'lbl_orders_bossStatus')}
          </BodyCopy>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="extrabold"
            className="elem-mb-SM"
          >
            {status}
          </BodyCopy>
        </BodyCopy>
      );
    }
    return <></>;
  };
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
          className="elem-mb-SM"
        >
          {getLabelValue(ordersLabels, 'lbl_orderDetails_orderNumber')}
        </BodyCopy>
        <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
          {orderNumber}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" className="elem-mt-LRG">
        <BodyCopy
          fontSize="fs14"
          fontWeight="extrabold"
          fontFamily="secondary"
          className="elem-mb-SM"
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
      {pickUpExpirationDate && !bossDate && (
        <BodyCopy component="div" className="elem-mt-LRG">
          <BodyCopy
            fontSize="fs14"
            fontWeight="extrabold"
            fontFamily="secondary"
            className="elem-mb-SM"
          >
            {getLabelValue(ordersLabels, 'lbl_orders_expirationDate')}
          </BodyCopy>
          <BodyCopy fontSize="fs14" fontFamily="secondary">
            {pickUpExpirationDate.format('LL')}
            {pickUpExpirationTime && (
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
                  {pickUpExpirationTime.format('hh:mma')}
                </BodyCopy>
              </>
            )}
          </BodyCopy>
        </BodyCopy>
      )}
      {getExpectedPickupDetails()}
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
