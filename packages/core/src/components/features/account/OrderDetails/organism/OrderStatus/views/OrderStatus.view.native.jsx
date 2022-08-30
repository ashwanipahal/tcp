import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Button } from '@tcp/core/src/components/common/atoms';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';

import { getLabelValue, getOrderGroupLabelAndMessage } from '@tcp/core/src/utils/utils';
import constants from '../../../OrderDetails.constants';
import { ContentWrapper } from '../../../styles/OrderDetails.style.native';
import ClickTracker from '../../../../../../../../../mobileapp/src/components/common/atoms/ClickTracker';

const AnalyticsData = {
  pageName: 'myplace:orders:order details',
  pageType: 'myplace',
  pageSection: 'myplace',
  pageSubSection: 'myplace',
  customEvents: 'event118',
};
/**
 * This function component use for return the Order Status
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderStatus = props => {
  const { isBopisOrder, trackingNumber, trackingUrl, ordersLabels } = props;
  const { label, message } = getOrderGroupLabelAndMessage(props);
  return (
    <>
      <ContentWrapper>
        <BodyCopy fontSize="fs14" fontFamily="secondary" text={label} />
        <BodyCopy fontSize="fs14" fontFamily="secondary" fontWeight="semibold" text={message} />
      </ContentWrapper>
      {!isBopisOrder && trackingNumber && trackingNumber !== constants.STATUS_CONSTANTS.NA && (
        <ContentWrapper>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            text={getLabelValue(ordersLabels, 'lbl_orders_trackingNumber')}
          />
          <BodyCopy
            fontSize="fs14"
            fontWeight="semibold"
            fontFamily="secondary"
            text={trackingNumber}
          />
        </ContentWrapper>
      )}
      {!isBopisOrder && trackingUrl && trackingUrl !== constants.STATUS_CONSTANTS.NA && (
        <ContentWrapper>
          <ClickTracker
            as={Button}
            clickData={AnalyticsData}
            name="order_tracking"
            module="account"
            width="100%"
            buttonVariation="fixed-width"
            fill="BLUE"
            color="white"
            onPress={() => UrlHandler(trackingUrl)}
            data-locator="orders-shop-now-btn"
            text={getLabelValue(ordersLabels, 'lbl_orders_trackit')}
          />
        </ContentWrapper>
      )}
    </>
  );
};
OrderStatus.propTypes = {
  trackingNumber: PropTypes.string,
  trackingUrl: PropTypes.string,
  isBopisOrder: PropTypes.bool.isRequired,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_shipping: PropTypes.string,
  }),
};

OrderStatus.defaultProps = {
  trackingNumber: '',
  trackingUrl: '',
  ordersLabels: {
    lbl_orderDetails_shipping: '',
  },
};

export default OrderStatus;
