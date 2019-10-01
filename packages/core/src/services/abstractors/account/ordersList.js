import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { orderConfig, API_CONFIG } from '../../config';
import { getFormattedError } from '../../../utils/errorMessage.util';
import { extractFloat } from '../../../utils/utils';
import { getTranslateDateInformation } from '../../../utils';

const orderReceivedLbl = 'lbl_orders_statusOrderReceived';
const orderCancelledLbl = 'lbl_orders_statusOrderCancelled';

export const orderStatusMapper = {
  'Pending payment approval': orderReceivedLbl,
  'Order In Process': orderReceivedLbl,
  'Order Expired': 'lbl_orders_statusOrderExpired',
  'Order Canceled': orderCancelledLbl,
  'Order Cancelled': orderCancelledLbl,
  'Order Shipped': 'lbl_orders_statusOrderShipped',
  'Partially Shipped': 'lbl_orders_statusOrderPartiallyShipped',
  'Order Partially Shipped': 'lbl_orders_statusOrderPartiallyShipped',
  'Order Received': orderReceivedLbl,
  'Ready for Pickup': 'lbl_orders_statusItemsReadyForPickup',
  'Reservation Received': orderReceivedLbl,
  'Picked Up': 'lbl_orders_statusItemsPickedUp',
  'Order Picked Up': 'lbl_orders_statusItemsPickedUp',
  Confirmed: orderReceivedLbl,
  Expired: 'lbl_orders_statusOrderExpired',
  Completed: orderReceivedLbl,
  Canceled: orderCancelledLbl,
  Cancelled: orderCancelledLbl,
  'N/A': 'lbl_orders_statusNa',
  'Please contact our Customer Service': 'lbl_orders_statusUserCallNeeded',
};

/**
 * @function getOrderStatus
 * @summary
 * @param {String} status -
 * @return orderStatus
 */
export const getOrderStatus = status => {
  let orderStatus = status;
  if (status !== 'USBOSS') {
    orderStatus = orderStatusMapper[status] || status;
  }
  return orderStatus;
};

/**
 * @function getTranslatedDate
 * @summary
 * @param {String} orderdate -
 * @return formatted date
 */
export const getTranslatedDate = dateStr => {
  const dateObj = getTranslateDateInformation(dateStr);
  return `${dateObj.month} ${dateObj.date}, ${dateObj.year}`;
};

/**
 * @function getOrderHistory
 * @summary
 * @param {String, String}
 */
export const getOrderHistory = (siteId, currentSiteId) => {
  const { siteIds, companyIds } = API_CONFIG;
  const payload = {
    header: {
      fromRest: true,
    },
    webService: endpoints.getDetailedOrderHistory,
  };

  if (siteId !== currentSiteId) {
    payload.header.companyId = siteId === siteIds.us ? companyIds.ca : companyIds.us;
  }

  return executeStatefulAPICall(payload)
    .then(res => {
      const orders = res.body.getOrderHistoryResponse.domOrderBeans.map(order => {
        return {
          orderDate: getTranslatedDate(order.orderDate),
          orderNumber: order.orderNumber,
          orderStatus: getOrderStatus(order.orderStatus),
          currencySymbol: order.orderTotal.replace(/[0-9]|\.|,/gi, ''),
          orderTotal: order.orderTotal.replace(/[0-9]|\.|,/gi, '') + extractFloat(order.orderTotal),
          orderTracking: order.orderTrackingNumber,
          orderTrackingUrl: order.orderTrackingURL,
          isEcomOrder: !orderConfig.NON_ECOM_ORDERS.includes(order.orderType),
          // check for orderType BOSS
          isBOSSOrder: order.orderType === 'USBOSS',
          isCanadaOrder: ['CAECOM', 'CAROPIS', 'CABOPIS'].includes(order.orderType),
        };
      });

      return {
        totalPages: 1,
        orders: orders.sort(
          (prev, next) => parseInt(next.orderNumber, 10) - parseInt(prev.orderNumber, 10)
        ),
      };
    })
    .catch(err => {
      throw getFormattedError(err);
    });
};

export default {
  getOrderHistory,
};
