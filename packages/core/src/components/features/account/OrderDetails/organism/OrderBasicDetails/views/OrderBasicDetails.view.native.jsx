import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { getDateInformation } from '@tcp/core/src//utils/badge.util';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';

export const OrderBasicDetails = ({ orderDetailsData, ordersLabels }) => {
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
        <ViewWithSpacing spacingStyles="margin-top-MED">
          <BodyCopyWithSpacing
            fontFamily="primary"
            fontSize="fs14"
            fontWeight="semibold"
            spacingStyles="margin-top-XS margin-bottom-XS"
            text={getLabelValue(ordersLabels, 'lbl_orders_expectedPickup')}
          />
          <BodyCopyWithSpacing
            fontFamily="primary"
            fontSize="fs14"
            spacingStyles="margin-top-XS margin-bottom-XS"
            text={bossDate}
          />
          <BodyCopyWithSpacing
            fontFamily="primary"
            fontSize="fs14"
            fontWeight="semibold"
            spacingStyles="margin-top-XS margin-bottom-XS"
            text={getLabelValue(ordersLabels, 'lbl_orders_bossStatus')}
          />
          <BodyCopyWithSpacing
            fontFamily="primary"
            fontSize="fs14"
            spacingStyles="margin-top-XS margin-bottom-XS"
            text={status}
          />
        </ViewWithSpacing>
      );
    }
    return <></>;
  };
  return (
    <>
      {orderDetailsData && (
        <>
          <ViewWithSpacing spacingStyles="margin-top-MED">
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs14"
              fontWeight="semibold"
              spacingStyles="margin-top-XS margin-bottom-XS"
              text={getLabelValue(ordersLabels, 'lbl_orderDetails_orderNumber')}
            />
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs14"
              fontWeight="semibold"
              spacingStyles="margin-top-XXS margin-bottom-XS"
              text={orderNumber}
            />
          </ViewWithSpacing>
          <ViewWithSpacing spacingStyles="margin-top-MED">
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs14"
              fontWeight="semibold"
              spacingStyles="margin-top-XXS margin-bottom-XS"
              text={getLabelValue(ordersLabels, 'lbl_orderDetails_orderDate')}
            />
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs14"
              spacingStyles="margin-top-XXS margin-bottom-XS"
              text={`${orderDate.format('LL')} ${getLabelValue(
                ordersLabels,
                'lbl_orderDetails_at'
              )} ${orderTime.format('hh:mma')}`}
            />
          </ViewWithSpacing>
          {pickUpExpirationDate && !bossDate && (
            <ViewWithSpacing spacingStyles="margin-top-MED">
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                fontWeight="semibold"
                spacingStyles="margin-top-XXS margin-bottom-XS"
                text={getLabelValue(ordersLabels, 'lbl_orders_expirationDate')}
              />
              <BodyCopyWithSpacing
                fontFamily="primary"
                fontSize="fs14"
                spacingStyles="margin-top-XXS margin-bottom-XS"
                text={`${pickUpExpirationDate.format('LL')} ${getLabelValue(
                  ordersLabels,
                  'lbl_orderDetails_at'
                )} ${pickUpExpirationTime.format('hh:mma')}`}
              />
            </ViewWithSpacing>
          )}
          {getExpectedPickupDetails()}
        </>
      )}
    </>
  );
};

OrderBasicDetails.propTypes = {
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
};

OrderBasicDetails.defaultProps = {
  ordersLabels: {},
  orderDetailsData: {},
};

export default OrderBasicDetails;
