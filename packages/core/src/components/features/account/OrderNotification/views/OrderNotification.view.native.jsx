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

const navigateToOrderDetail = (orderNumber, navigation, orderLabels) => {
  const router = {
    query: {
      orderId: orderNumber,
    },
  };
  navigation.navigate('OrderDetailPage', {
    title: `${getLabelValue(orderLabels, 'lbl_orderDetail_heading', 'orders')} #${orderNumber}`,
    router,
  });
};
const OrderNotification = ({ labels, orderLabels, order, navigation, separator }) => {
  return (
    <>
      {order && (
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
                getOrderStatusForNotification(order.orderStatus),
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
                underlineWhite
                noLink
                color="white"
                anchorVariation="white"
                fontSize="fs12"
                dataLocator="order-number-value"
                fontFamily="secondary"
                onPress={() => navigateToOrderDetail(order.orderNumber, navigation, orderLabels)}
                text={order.orderNumber}
              />

              <ViewWithSpacing spacingStyles="margin-left-LRG">
                <Anchor
                  fontSize="fs12"
                  fontSizeVariation="medium"
                  anchorVariation="white"
                  underlineWhite
                  onPress={() => navigateToOrderDetail(order.orderNumber, navigation, orderLabels)}
                  text={getLabelValue(labels, 'lbl_global_viewOrderDetails', 'OrderNotification')}
                />
              </ViewWithSpacing>
            </RowContainer>
            {order.orderTrackingUrl && !order.isBOSSOrder && (
              <RowContainer spacingStyles="margin-top-SM">
                <BodyCopy
                  color="white"
                  fontSize="fs12"
                  fontFamily="secondary"
                  text={getLabelValue(labels, 'lbl_global_tracking', 'OrderNotification')}
                />
                {order.orderTrackingUrl !== constants.STATUS_CONSTANTS.NA ? (
                  <Anchor
                    fontSizeVariation="medium"
                    anchorVariation="white"
                    fontSize="fs12"
                    underlineWhite
                    onPress={() => UrlHandler(order.trackingUrl)}
                    text={order.orderTracking}
                  />
                ) : (
                  <BodyCopy
                    color="white"
                    fontSize="fs12"
                    fontFamily="secondary"
                    text={order.orderTracking}
                  />
                )}
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
      )}
    </>
  );
};
OrderNotification.propTypes = {
  order: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  orderLabels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  separator: PropTypes.bool.isRequired,
};

OrderNotification.defaultProps = {
  order: {},
};

export default withNavigation(withStyles(OrderNotification));
export { OrderNotification as OrderNotificationVanilla };
