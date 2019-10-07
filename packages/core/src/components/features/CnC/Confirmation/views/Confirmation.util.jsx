import PropTypes from 'prop-types';
import { constants as VenmoConstants } from '../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';

const propTypes = {
  className: PropTypes.string,
  /** Flag indicates whether the user is a guest */
  isGuest: PropTypes.bool,

  /** indicates order payment is processing */
  isOrderPending: PropTypes.bool,

  /** email address of the user that placed the order */
  emailAddress: PropTypes.string.isRequired,

  /** shipped order only details */
  orderDetails: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    orderNumber: PropTypes.string.isRequired,
    trackingLink: PropTypes.string.isRequired,
  }).isRequired,

  /** Bopis order details */
  orderNumbersByFullfillmentCenter: PropTypes.shape({
    holdDate: PropTypes.instanceOf(Date).isRequired,
    fullfillmentCenterMap: PropTypes.shape([{}]),
  }).isRequired,
  updateOrderDetailsData: PropTypes.shape({}),
  labels: PropTypes.shape({}).isRequired,
  encryptedEmailAddress: PropTypes.string,
  orderShippingDetails: PropTypes.shape({}),
  isVenmoPaymentInProgress: PropTypes.bool,
  venmoPayment: PropTypes.shape({
    userName: PropTypes.string,
    ccBrand: PropTypes.string,
    ccType: PropTypes.string,
  }),
  venmoUserName: PropTypes.string,
};
const defaultProps = {
  className: '',
  isGuest: true,
  isOrderPending: false,
  updateOrderDetailsData: null,
  encryptedEmailAddress: '',
  orderShippingDetails: null,
  isVenmoPaymentInProgress: false,
  venmoPayment: {
    userName: '',
    ccBrand: VenmoConstants.VENMO,
    ccType: VenmoConstants.VENMO,
  },
  venmoUserName: '',
};

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function checkIfNotShippingFullName
 * @description return boolean value if shippingFullname is present .
 */
const checkIfShippingFullName = ({ orderNumbersByFullfillmentCenter }) => {
  return orderNumbersByFullfillmentCenter.fullfillmentCenterMap.find(
    center => !!center.shippingFullname
  );
};

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function checkIfNotShippingFullName
 * @description return boolean value if shippingFullname is not present .
 */
const checkIfNotShippingFullName = ({ orderNumbersByFullfillmentCenter }) => {
  return orderNumbersByFullfillmentCenter.fullfillmentCenterMap.find(
    center => !center.shippingFullname
  );
};

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function checkIffullfillmentCenterMap
 * @description return boolean value if fullfillmentCenterMap is present .
 */
const checkIffullfillmentCenterMap = orderNumbersByFullfillmentCenter => {
  return orderNumbersByFullfillmentCenter && orderNumbersByFullfillmentCenter.fullfillmentCenterMap;
};

export {
  defaultProps,
  propTypes,
  checkIfShippingFullName,
  checkIfNotShippingFullName,
  checkIffullfillmentCenterMap,
};
