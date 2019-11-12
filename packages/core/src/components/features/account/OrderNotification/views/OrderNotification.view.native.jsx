import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import {
  BodyCopyWithSpacing,
  ViewWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, getOrderStatusForNotification } from '@tcp/core/src/utils/utils';
import constants from '../../OrderDetails/OrderDetails.constants';
import { MainContainer, RowContainer, Container } from '../styles/OrderNotification.style.native';

/**
 * This function component use for Order Notification
 * can be passed in the component.
 */

const navigateToOrderDetail = (orderNumber, navigation, labels) => {
  const router = {
    query: {
      orderId: orderNumber,
    },
  };
  navigation.navigate('OrderDetailPage', {
    title: `${getLabelValue(labels, 'lbl_orderDetail_heading', 'orders')} #${orderNumber}`,
    router,
  });
};
const OrderNotification = ({ labels, order, navigation, separator }) => {
  return (
    <MainContainer>
      <Container
        separator={separator}
        spacingStyles="margin-left-MED margin-right-MED padding-top-LRG padding-bottom-LRG"
      >
        <BodyCopy
          color="white"
          fontSize="fs18"
          fontWeight="extrabold"
          fontFamily="secondary"
          text={getLabelValue(
            labels,
            getOrderStatusForNotification(order.status),
            'OrderNotification'
          )}
        />

        <RowContainer spacingStyles="margin-top-SM">
          <BodyCopy
            color="white"
            fontSize="fs12"
            fontFamily="secondary"
            text={getLabelValue(labels, 'lbl_global_order', 'OrderNotification')}
          />

          <Anchor
            fontSizeVariation="medium"
            underline
            noLink
            color="white"
            anchorVariation="white"
            fontSize="fs12"
            dataLocator="order-number-value"
            fontFamily="secondary"
            onPress={() => navigateToOrderDetail(order.orderNumber, navigation)}
            text={order.orderNumber}
          />

          <ViewWithSpacing spacingStyles="margin-left-LRG">
            <Anchor
              fontSize="fs12"
              fontSizeVariation="medium"
              anchorVariation="white"
              underline
              onPress={() => navigateToOrderDetail(order.orderNumber, navigation)}
              text={getLabelValue(labels, 'lbl_global_viewOrderDetails', 'OrderNotification')}
            />
          </ViewWithSpacing>
        </RowContainer>
        {order.trackingUrl && order.trackingUrl !== constants.STATUS_CONSTANTS.NA && (
          <RowContainer spacingStyles="margin-top-SM">
            <BodyCopy
              color="white"
              fontSize="fs12"
              fontFamily="secondary"
              text={getLabelValue(labels, 'lbl_global_tracking', 'OrderNotification')}
            />

            <Anchor
              fontSizeVariation="medium"
              anchorVariation="white"
              fontSize="fs12"
              underline
              onPress={() => UrlHandler(order.trackingUrl)}
              texgt={order.orderTracking}
            />
          </RowContainer>
        )}

        <BodyCopyWithSpacing
          spacingStyles="margin-top-SM"
          color="white"
          fontSize="fs12"
          fontFamily="secondary"
          text={`${getLabelValue(labels, 'lbl_global_orderedOn', 'OrderNotification')} ${
            order.orderDate
          }`}
        />
      </Container>
    </MainContainer>
  );
};
OrderNotification.propTypes = {
  order: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  separator: PropTypes.bool.isRequired,
};

OrderNotification.defaultProps = {
  order: {},
};

export default withNavigation(withStyles(OrderNotification));
export { OrderNotification as OrderNotificationVanilla };
