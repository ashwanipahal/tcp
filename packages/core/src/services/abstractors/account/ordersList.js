import orderConfig from '@tcp/core/src/config/orderConfig';
import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';
import { API_CONFIG } from '../../config';
import { getFormattedError } from '../../../utils/errorMessage.util';
import { getSwatchImgPath } from '../../../components/features/browse/ProductListingPage/util/utility';
import { extractFloat, sanitizeEntity } from '../../../utils/utils';
import { getTranslateDateInformation, parseStoreHours } from '../../../utils';

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

/**
 * @function getOrderInfoByOrderId
 * @summary
 * @param {type} paramName -
 * @return TDB
 */

/* eslint-disable complexity */
// eslint-disable-next-line sonarjs/cognitive-complexity
export const getOrderInfoByOrderId = updatedPayload => {
  const payload = {
    header: {
      orderId: updatedPayload.orderId,
      emailId: updatedPayload.email,
    },
    webService: endpoints.orderLookUp,
  };

  if (!updatedPayload.isGuest) {
    payload.header.fromPage = 'orderHistory';
  }
  return executeStatefulAPICall(payload)
    .then(res => {
      const giftCardType = 'Gift Card';
      const OrderShippedKey = 'Order Shipped';
      const { orderDetails } = res.body.orderLookupResponse;
      const orderShipping = res.body.orderLookupResponse.orderSummary.shippingAddress;
      const orderBillingAddress = res.body.orderLookupResponse.orderSummary.billingAddress;
      const orderBilling = res.body.orderLookupResponse.amountBilled;
      const orderPayment = res.body.orderLookupResponse.paymentSummary.paymentList;
      const orderCart = res.body.orderLookupResponse.shoppingBag;

      const paymentCards = orderPayment.map(card => ({
        endingNumbers:
          (card.cardType === 'VENMO' || card.cardType === 'Venmo') && card.venmoUserId
            ? card.venmoUserId
            : card.accountNo,
        cardType: card.cardType,
        chargedAmount: card.chargedAmount,
        id: null, // we dont get, do we need this?
      }));

      const cartItems = orderCart.items.map(item => ({
        productInfo: {
          fit: null,
          pdpUrl: sanitizeEntity(item.productURL),
          name: sanitizeEntity(item.name),
          imagePath: `//${item.imgURL}`,
          upc: item.upc,
          size: item.size,
          color: {
            name: item.color,
            imagePath: getSwatchImgPath(item.thumbnail),
          },
        },
        itemInfo: {
          listPrice: extractFloat(item.saleUnitPrice),
          offerPrice: extractFloat(item.paidUnitPrice),
          linePrice:
            extractFloat(item.paidUnitPrice) *
            (parseInt(item.quantityShipped, 10) || parseInt(item.quantity, 10)),
          quantity: parseInt(item.quantity, 10),
          quantityCanceled: parseInt(item.quantityCanceled, 10) || 0,
          quantityShipped: parseInt(item.quantityShipped, 10) || 0,
          quantityReturned: parseInt(item.quantityReturned, 10) || 0,
          quantityOOS: 0, // no support from backend
          itemBrand: item.brand ? item.brand : '',
        },
        trackingInfo: item.shipmentAndStatusInfo ? item.shipmentAndStatusInfo : [],
        isShippedItem: parseInt(item.quantity, 10) === parseInt(item.quantityShipped, 10),
      }));

      // Get all shipped items
      const shippedItems = cartItems.filter(
        item => item.trackingInfo !== null || item.isShippedItem
      );

      // Group shipped items by tracking number
      // Object used to prevent duplicates
      const shipmentsObj = {};
      shippedItems.forEach(item => {
        if (item.trackingInfo.length === 0 && orderDetails.orderStatus === OrderShippedKey) {
          item.trackingInfo.push({
            trackingNbr: 'N/A',
            trackingUrl: 'N/A',
            shipDate: 'N/A',
            quantity: item.quantity,
          });
        }
        item.trackingInfo.forEach(shipment => {
          if (
            shipment.status === OrderShippedKey ||
            shipment.status === 'Order Partially Shipped'
          ) {
            const key = shipment.trackingNbr;
            const items = (shipmentsObj[key] && shipmentsObj[key].items) || [];

            items.push({
              itemInfo: {
                ...item.itemInfo,
                quantity: shipment.quantity, // We only want to show quantity included in the shipment
                linePrice: item.itemInfo.offerPrice * parseInt(shipment.quantity, 10),
              },
              productInfo: item.productInfo,
            });

            shipmentsObj[key] = {
              trackingNumber: shipment.trackingNbr,
              trackingUrl: sanitizeEntity(shipment.trackingUrl),
              shippedDate: shipment.shipDate,
              status: OrderShippedKey,
              items,
            };
          }
        });
      });

      // Convert shipmentsObj to an array
      const shipments = Object.keys(shipmentsObj).map(trackingNbr => shipmentsObj[trackingNbr]);

      // For BOPIS orders, remainingItems = uncanceled items
      // For Non-BOPIS orders, remainingItems = unshipped and uncanceled items (i.e. processsing items)
      let remainingItems = [];
      if (orderDetails.orderType === 'ECOM') {
        const processingItems = cartItems.filter(
          ({ itemInfo }) =>
            itemInfo.quantityCanceled + itemInfo.quantityShipped !== itemInfo.quantity
        );
        if (processingItems.length > 0) {
          const trackingInfo = {};
          processingItems.forEach(item => {
            if (item.trackingInfo && item.trackingInfo.length > 0) {
              item.trackingInfo
                .filter(
                  v => v && v.status !== OrderShippedKey && v.status !== 'Order Partially Shipped'
                )
                .forEach(({ trackingUrl, trackingNbr: trackingNumber }) => {
                  if (!trackingInfo[trackingUrl]) {
                    trackingInfo[trackingUrl] = { trackingUrl, trackingNumber, items: [] };
                  }
                  trackingInfo[trackingUrl].items.push(item);
                });
            } else {
              trackingInfo[item.productInfo.upc] = {
                items: [item],
              };
            }
          });
          remainingItems = Object.keys(trackingInfo).map(key => {
            const aTrackingItem = trackingInfo[key];
            return {
              items: aTrackingItem.items.map(item => {
                // We only want to show quantity of processing items
                const quantity =
                  item.itemInfo.quantity -
                  (item.itemInfo.quantityCanceled + item.itemInfo.quantityShipped);
                return {
                  itemInfo: {
                    ...item.itemInfo,
                    linePrice: item.itemInfo.offerPrice * parseInt(quantity, 10),
                    quantity,
                  },
                  productInfo: item.productInfo,
                };
              }),
              status: 'order received',
              trackingNumber: aTrackingItem.trackingNumber || null,
              trackingUrl: sanitizeEntity(aTrackingItem.trackingUrl) || null,
            };
          });
        }
      } else {
        const uncanceledItems = cartItems.filter(
          ({ itemInfo }) => itemInfo.quantityCanceled !== itemInfo.quantity
        );

        if (uncanceledItems.length > 0) {
          remainingItems = [{ items: uncanceledItems }];
        }
      }

      const canceledItems = cartItems
        .filter(({ itemInfo }) => itemInfo.quantityCanceled)
        .map(item => ({
          productInfo: { ...item.productInfo },
          itemInfo: {
            ...item.itemInfo,
            linePrice: extractFloat(item.paidUnitPrice) * item.itemInfo.quantityCanceled,
          },
        }));

      const outOfStockItems = []; // cartItems.filter((item) => item.itemInfo.quantityOOS);
      const orderDetailsReturn = {
        orderNumber: orderDetails.orderId,
        orderDate: orderDetails.orderDate.replace('T', ' '),
        pickUpExpirationDate:
          res.body.orderLookupResponse.orderSummary.requestedDeliveryBy &&
          res.body.orderLookupResponse.orderSummary.requestedDeliveryBy.replace('T', ' '),
        pickedUpDate: (orderDetails.dateShipped || '').replace('T', ' '),
        shippedDate: (orderDetails.dateShipped || '').replace('T', ' '),
        orderStatus: orderDetails.orderStatus ? orderDetails.orderStatus.toLowerCase() : '',
        status:
          orderDetails.orderType === orderConfig.ORDER_ITEM_TYPE.BOSS
            ? orderDetails.orderStatus
            : orderStatusMapper[orderDetails.orderStatus],
        trackingNumber: orderDetails.tracking,
        trackingUrl:
          orderDetails.trackingUrl !== 'N/A' ? sanitizeEntity(orderDetails.trackingUrl) : '#',
        isBopisOrder: orderDetails.orderType === orderConfig.ORDER_ITEM_TYPE.BOPIS,
        isBossOrder: orderDetails.orderType === orderConfig.ORDER_ITEM_TYPE.BOSS,
        orderType: orderDetails.orderType,
        bossMaxDate: orderShipping.bossMaxDate || null,
        bossMinDate: orderShipping.bossMinDate || null,
        summary: {
          currencySymbol: orderBilling.subtotal.replace(/[0-9]|\.|,|-/gi, ''),
          totalItems: orderCart.items.length
            ? orderCart.items.map(item => parseInt(item.quantity, 10)).reduce((a, b) => a + b)
            : 0,
          subTotal: extractFloat(orderBilling.subtotal),
          purchasedItems: parseInt(orderDetails.totalQuantityPurchased, 10),
          shippedItems: parseInt(orderDetails.totalQuantityShipped, 10),
          canceledItems: parseInt(orderDetails.totalQuantityCanceled, 10),
          returnedItems: parseInt(orderDetails.totalQuantityReturned, 10),
          returnedTotal: extractFloat(orderDetails.totalAmountReturned),
          couponsTotal: extractFloat(orderBilling.discount),
          shippingTotal: extractFloat(orderBilling.shipping),
          totalTax: extractFloat(orderBilling.tax),
          grandTotal: extractFloat(orderBilling.total),
        },
        appliedGiftCards: paymentCards.filter(card => card.cardType === giftCardType),
        canceledItems,
        purchasedItems: shipments.concat(remainingItems),
        outOfStockItems,
        checkout: {
          shippingAddress:
            orderDetails.orderType === 'ECOM'
              ? {
                  firstName: orderShipping.firstName,
                  lastName: orderShipping.lastName,
                  addressLine1: orderShipping.addressLine1,
                  addressLine2: orderShipping.addressLine2,
                  city: orderShipping.city,
                  state: orderShipping.state,
                  zipCode: orderShipping.zipCode,
                  country: orderShipping.country,
                }
              : null,
          pickUpStore:
            orderDetails.orderType !== 'ECOM'
              ? {
                  // NOTE: WE WILL NEVER SHOW AN ECOM ORDER AND BOPIS ORDER AT THE SAME TIME, SHIPPING IS SHARED IN THE SAME VAR AS PER BACKEND
                  basicInfo: {
                    id: null,
                    storeName: orderShipping.addressLine1.split('|')[0],
                    address: {
                      addressLine1: `${orderShipping.addressLine1.split('|')[1] || ''} ${
                        orderShipping.addressLine2
                      }`,
                      city: orderShipping.city,
                      state: orderShipping.state,
                      zipCode: orderShipping.zipCode,
                    },
                    phone: orderShipping.phone,
                  },
                  distance: null,
                  pickUpPrimary: {
                    firstName: orderShipping.firstName,
                    lastName: orderShipping.lastName,
                    emailAddress: orderShipping.email,
                  },
                  pickUpAlternative:
                    orderShipping.altFirstName && orderShipping.altFirstName.length > 0
                      ? {
                          firstName: orderShipping.altFirstName,
                          lastName: orderShipping.altLastName,
                          emailAddress: orderShipping.altEmail,
                        }
                      : null,
                }
              : null,
          billing: {
            card: paymentCards.find(card => card.cardType !== giftCardType),
            sameAsShipping: false,
            // Backend returns billing address as an empty object for gift card orders
            billingAddress:
              Object.keys(orderBillingAddress).length > 0
                ? {
                    firstName: orderBillingAddress.firstName,
                    lastName: orderBillingAddress.lastName,
                    addressLine1: orderBillingAddress.addressLine1,
                    addressLine2: orderBillingAddress.addressLine2,
                    city: orderBillingAddress.city,
                    state: orderBillingAddress.state,
                    zipCode: orderBillingAddress.zipCode,
                    country: orderBillingAddress.country,
                  }
                : null,
          },
        },
      };

      // Parse Store Hours
      if (orderShipping.storeHours && orderShipping.storeHours.length) {
        orderDetailsReturn.checkout.pickUpStore.hours = {
          regularHours: parseStoreHours(orderShipping.storeHours),
        };
      }

      return orderDetailsReturn;
    })
    .catch(err => {
      throw err;
    });
};

export default { getOrderHistory };
