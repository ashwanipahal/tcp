import { ORDERDETAILS_ACTION_PATTERN } from '../../../../constants/reducer.constants';

const ORDERDETAILS_CONSTANTS = {
  GET_ORDERDETAILS: `${ORDERDETAILS_ACTION_PATTERN}GET_ORDERDETAILS`,
  SET_ORDERDETAILS: `${ORDERDETAILS_ACTION_PATTERN}SET_ORDERDETAILS`,
  STATUS_CONSTANTS: {
    ORDER_SHIPPED: 'order shipped',
    PARTIALLY_SHIPPED: 'partially shipped',
    ORDER_PICKED: 'order picked',
    ORDER_RECEIVED: 'order received',
    ORDER_IN_PROCESS: 'order in process',
    ORDER_PARTIALLY_SHIPPED: 'partially shipped',
    ORDER_CANCELED: 'canceled',
    ORDER_CANCELLED: 'cancelled',
    ITEMS_RECEIVED: 'received',
    ITEMS_READY_FOR_PICKUP: 'ready for pickup',
    ITEMS_PICKED_UP: 'picked up',
    ORDER_PICKED_UP: 'order picked up',

    SUCCESSFULLY_PICKED_UP: 'successfully picked up',
    ORDER_EXPIRED: 'expired',
    ORDER_PROCESSING: 'processing',
    NA: 'N/A',
    ORDER_USER_CALL_NEEDED: 'call needed',
    ORDER_CONTACT_CUSTOMER_SERVICE: 'please contact our customer service',
    ORDER_PROCESSING_AT_FACILITY: 'order processing at facility',
    EXPIRED_AND_REFUNDED: 'expired and refunded',
    TOP_PREVIEW_ITEMS_COUNT: 3,
  },
};

export default ORDERDETAILS_CONSTANTS;
