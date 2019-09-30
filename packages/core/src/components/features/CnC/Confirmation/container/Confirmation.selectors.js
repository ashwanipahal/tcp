/* eslint-disable extra-rules/no-commented-out-code */
import { createSelector } from 'reselect';
// import {
//   getPersonalDataState,
// } from '../../../account/User/container/User.selectors';
// import { getAPIConfig } from '../../../../../utils';
// import constants from '../../Checkout/Checkout.constants';

export const getOrderConfirmation = state => {
  return state.Confirmation && state.Confirmation.get('orderConfirmation');
};

const getConfirmationSummary = createSelector(
  getOrderConfirmation,
  confirmation => {
    return confirmation && confirmation.get('summary');
  }
);

// const getOrderEmailAddress = createSelector(getOrderConfirmation, confirmation => {
//   return confirmation && confirmation.userDetails && confirmation.userDetails.emailAddress;
// })

// const getItemsCount = createSelector(getConfirmationSummary, summary => {
//   return summary && summary.itemsCount;
// })

// const getSubTotal = createSelector(getConfirmationSummary, summary => {
//   return summary && summary.subTotal;
// })

// const getGrandTotal = createSelector(getConfirmationSummary, summary => {
//   return summary && summary.grandTotal;
// })

// const getSummary = createSelector(getConfirmationSummary, summary => {
// if(summary){
//   return {
//     ...summary,
//     orderBalanceTotal: summary.grandTotal - summary.giftCardsTotal
//   };
// }

// })

// const getHoldDate = createSelector(getOrderConfirmation, orderConfirmation => {
//   return orderConfirmation && orderConfirmation.holdDate;
// });

// const getIsOrderHasShipping = createSelector(getOrderConfirmation, orderConfirmation => {
//   return orderConfirmation &&  orderConfirmation.shipping && orderConfirmation.shipping.itemsCount > 0;
// })

// FIXME: This needs to be re-writen... it seems this is meant to deal with a mixed order/Bopis order, if not a mixed order it returns null
// const getFullfilmentCentersMap = createSelector(getOrderConfirmation, orderConfirmation => {

//   // Check that BOSS/BOPIS is from the same store as store selection can not be more than 2
//   const isSamePickUpStore = orderConfirmation.totalsByFullfillmentCenterMap && orderConfirmation.totalsByFullfillmentCenterMap.length > 1 &&
//     orderConfirmation.totalsByFullfillmentCenterMap[0].id === orderConfirmation.totalsByFullfillmentCenterMap[1].id || false;

//   // Only Bopis Order Confirmation Info
//   const pickupStores = orderConfirmation.totalsByFullfillmentCenterMap ? orderConfirmation.totalsByFullfillmentCenterMap.map((elem) => {
//     return {
//       ...elem,
//       isSamePickUpStore,
//       // storeLink: routingStoreView.getLocationFromPageInfo(state, {
//       //   page: PAGES.storeDetails,
//       //   pathSuffix: buildStorePageUrlSuffix(elem)
//       // }).pathname
//     };
//   }) : null;
//   // Shipping Order Info
//   const { shipping } = orderConfirmation;

//   // sth stand for ship to home, we should slap the person who wrote this.
//   let sth;

//   // this gets the ecom order and adds data to it, Why in the holy hells name is this not in the abstractor??
//   if (shipping) {
//     const { address } = shipping;
//     const { firstName, lastName } = address;
//     sth = [{
//       shippingFullname: `${firstName} ${lastName}`,
//       productsCount: shipping.itemsCount,

//       orderDate: shipping.orderDate,
//       orderNumber: orderConfirmation.orderDetails.orderNumber,
//       orderLink: shipping.orderLink,
//       orderTotal: shipping.orderTotal,

//       emailAddress: shipping.emailAddress,
//       encryptedEmailAddress: shipping.encryptedEmailAddress,
//       isShippingWithSinglePickup: pickupStores && pickupStores.length === 1 || false
//     }];
//   } else {
//     return pickupStores;
//   }

//   /*  Given the logic if this order has an ecom order but
//       no BOPIS then return null, or neither... this needs to all be consolidated into
//       a single operator to deal with a ECOM/BOPIS/mixed order.
//   */
//   return pickupStores && sth ? pickupStores.concat(sth) : null;
// })

const getInitialCreateAccountValues = createSelector(
  getOrderConfirmation,
  orderConfirmation => {
    return orderConfirmation && orderConfirmation.userDetails;
  }
);

// const getEarnedPlaceCashValue = createSelector(getConfirmationSummary, summary => {
//   return summary && summary.valueOfEarnedPcCoupons;
// })

// const getPlaceCashSpotEnabled = createSelector(getEarnedPlaceCashValue, earnedPlaceCashValue => {
//   return earnedPlaceCashValue > 0;
// })

// const getPersonalizedCoupons = (state) => {
//   return state.Confirmation && state.Confirmation.aquiredCouponCode;
// }

// const getEncryptedEmailAddress = createSelector(getOrderConfirmation, confirmation => {
//   return confirmation && confirmation.userDetails && confirmation.userDetails.encryptedEmailAddress;
// })

// const isVenmoPaymentConfirmationDisplayed = = createSelector(getOrderConfirmation, confirmation => {
//   return confirmation && confirmation.venmoPaymentConfirmationDisplayed;
// })

// function getVenmoUserId(state) {
//   const paymentLists = state.confirmation.orderConfirmation.paymentsList;
//   const venmoPayment = paymentLists && paymentLists.find(method => method.paymentMethod.toLowerCase() === 'venmo');
//   return venmoPayment ? venmoPayment.venmoUserId : '';
// }

// const getIsOrderPending = createSelector(getOrderConfirmation, orderConfirmation => {
//   return orderConfirmation && orderConfirmation.isOrderPending;
// })

// const getOrderDetails = createSelector([getFullfilmentCentersMap, getOrderConfirmation], (fullfilmentCentersMap, orderConfirmation) => {
//   return !fullfilmentCentersMap ? orderConfirmation.orderDetails : null
// })

// const getOrderShippingDetails = createSelector([getFullfilmentCentersMap, getOrderConfirmation], (fullfilmentCentersMap, orderConfirmation) => {
//   return !fullfilmentCentersMap ? orderConfirmation.shipping : null;
// })

// const getEstimatedRewards = createSelector(getOrderConfirmation, orderConfirmation => {
//   return (orderConfirmation.summary.estimatedRewards
//     || orderConfirmation.summary.estimatedRewards === 0)
//     ? orderConfirmation.summary.estimatedRewards : null
// })

// const getPointsToNextReward = createSelector(getOrderConfirmation, orderConfirmation => {
//   return orderConfirmation.summary.pointsToNextReward || 0;
// })

// const getEarnedReward = createSelector(getOrderConfirmation, orderConfirmation => {
//   return orderConfirmation.summary.earnedReward || '';
// })

// const getAirmiles = createSelector(getOrderConfirmation, orderConfirmation =>{
//   return orderConfirmation && orderConfirmation.airmiles;
// })

// const getOrderNumbersByFullfillmentCenter = createSelector([getFullfilmentCentersMap, getHoldDate], (fullfilmentCentersMap, holdDate) => {
//   return fullfilmentCentersMap ? {
//     holdDate,
//     fullfillmentCenterMap: fullfilmentCentersMap
//   } : null
// })

//  const getBrierleySwitch = state => {
//   return state.session &&
//     state.session.siteDetails &&
//     state.session.siteDetails.isBrierleyEnabled !== undefined
//     ? state.session.siteDetails.isBrierleyEnabled
//     : true;
// };

// const shouldHideConfirmationEspot = createSelector(getPersonalDataState, personalData => {
//   return personalData && personalData.get('hideConfirmationEspot');
// })

// const getCurrentSiteId = () => {
//   return getAPIConfig().siteId;
// }

// const isCanadaSite = () => {
//   return getCurrentSiteId() === constants.ROUTING_CONST.siteIds.ca;
// }

export default {
  getOrderConfirmation,
  // getOrderEmailAddress,
  // getItemsCount,
  // getSubTotal,
  // getGrandTotal,
  // getSummary,
  // getFullfilmentCentersMap,
  // getHoldDate,
  getInitialCreateAccountValues,
  // getIsOrderHasShipping,
  // getEarnedPlaceCashValue,
  // getPlaceCashSpotEnabled,
  // getPersonalizedCoupons,
  // getEncryptedEmailAddress,
  // getPeronsalizedCoupons,
  // isVenmoPaymentConfirmationDisplayed,
  getConfirmationSummary,
  // getVenmoUserId,
  // getIsOrderPending,
  // getOrderDetails,
  // getOrderShippingDetails,
  // getEstimatedRewards,
  // getPointsToNextReward,
  // getEarnedReward,
  // getAirmiles,
  // getOrderNumbersByFullfillmentCenter,
  // getBrierleySwitch,
  // shouldHideConfirmationEspot
  // isCanadaSite
};
