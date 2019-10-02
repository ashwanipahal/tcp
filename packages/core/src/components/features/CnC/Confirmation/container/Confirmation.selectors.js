/* eslint-disable extra-rules/no-commented-out-code */
import { createSelector } from 'reselect';
// import {
//   getPersonalDataState,
// } from '../../../account/User/container/User.selectors';
import constants from '../../Checkout/Checkout.constants';
import { getLabelValue, buildStorePageUrlSuffix, getAPIConfig } from '../../../../../utils/utils';

const getOrderConfirmation = state => {
  return state.Confirmation && state.Confirmation.get('orderConfirmation');
};

// TODO : Skipping it as it will be fixed after the immutable decision
// ignoring it with istanbul ignore also.
/* istanbul ignore next */
const getConfirmationSummary = createSelector(
  getOrderConfirmation,
  confirmation => {
    return confirmation && confirmation.summary;
  }
);

/* istanbul ignore next */
const getOrderEmailAddress = createSelector(
  getOrderConfirmation,
  confirmation => {
    return confirmation && confirmation.userDetails && confirmation.userDetails.emailAddress;
  }
);

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
/* istanbul ignore next */
const getHoldDate = createSelector(
  getOrderConfirmation,
  orderConfirmation => {
    return orderConfirmation && orderConfirmation.holdDate;
  }
);
/* istanbul ignore next */
const getIsOrderHasShipping = createSelector(
  getOrderConfirmation,
  orderConfirmation => {
    return (
      orderConfirmation && orderConfirmation.shipping && orderConfirmation.shipping.itemsCount > 0
    );
  }
);

// FIXME: This needs to be re-writen... it seems this is meant to deal with a mixed order/Bopis order, if not a mixed order it returns null
/* istanbul ignore next */
const getFullfilmentCentersMap = createSelector(
  getOrderConfirmation,
  orderConfirmation => {
    // Check that BOSS/BOPIS is from the same store as store selection can not be more than 2
    const isSamePickUpStore =
      (orderConfirmation.totalsByFullfillmentCenterMap &&
        orderConfirmation.totalsByFullfillmentCenterMap.length > 1 &&
        orderConfirmation.totalsByFullfillmentCenterMap[0].id ===
          orderConfirmation.totalsByFullfillmentCenterMap[1].id) ||
      false;

    // Only Bopis Order Confirmation Info
    const pickupStores = orderConfirmation.totalsByFullfillmentCenterMap
      ? orderConfirmation.totalsByFullfillmentCenterMap.map(elem => {
          return {
            ...elem,
            isSamePickUpStore,
            storeLink: {
              to: `/store/?storeStr=${buildStorePageUrlSuffix(elem)}`,
              asPath: `/store/${buildStorePageUrlSuffix(elem)}`,
            },
          };
        })
      : null;
    // Shipping Order Info
    const { shipping } = orderConfirmation;

    // sth stand for ship to home, we should slap the person who wrote this.
    let sth;

    // this gets the ecom order and adds data to it, Why in the holy hells name is this not in the abstractor??
    if (shipping) {
      const { address } = shipping;
      const { firstName, lastName } = address;
      sth = [
        {
          shippingFullname: `${firstName} ${lastName}`,
          productsCount: shipping.itemsCount,

          orderDate: shipping.orderDate,
          orderNumber: orderConfirmation.orderDetails.orderNumber,
          orderLink: shipping.orderLink,
          orderTotal: shipping.orderTotal,

          emailAddress: shipping.emailAddress,
          encryptedEmailAddress: shipping.encryptedEmailAddress,
          isShippingWithSinglePickup: (pickupStores && pickupStores.length === 1) || false,
        },
      ];
    } else {
      return pickupStores;
    }

    /*  Given the logic if this order has an ecom order but
      no BOPIS then return null, or neither... this needs to all be consolidated into
      a single operator to deal with a ECOM/BOPIS/mixed order.
  */
    return pickupStores && sth ? pickupStores.concat(sth) : null;
  }
);

/* istanbul ignore next */
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

const getPersonalizedCoupons = state => {
  return state.Confirmation && state.Confirmation.aquiredCouponCode;
};

/* istanbul ignore next */
const getEncryptedEmailAddress = createSelector(
  getOrderConfirmation,
  confirmation => {
    return (
      confirmation && confirmation.userDetails && confirmation.userDetails.encryptedEmailAddress
    );
  }
);

// const isVenmoPaymentConfirmationDisplayed = = createSelector(getOrderConfirmation, confirmation => {
//   return confirmation && confirmation.venmoPaymentConfirmationDisplayed;
// })

// function getVenmoUserId(state) {
//   const paymentLists = state.confirmation.orderConfirmation.paymentsList;
//   const venmoPayment = paymentLists && paymentLists.find(method => method.paymentMethod.toLowerCase() === 'venmo');
//   return venmoPayment ? venmoPayment.venmoUserId : '';
// }

/* istanbul ignore next */
const getIsOrderPending = createSelector(
  getOrderConfirmation,
  orderConfirmation => {
    return orderConfirmation && orderConfirmation.isOrderPending;
  }
);

/* istanbul ignore next */
const getOrderDetails = createSelector(
  [getFullfilmentCentersMap, getOrderConfirmation],
  (fullfilmentCentersMap, orderConfirmation) => {
    return !fullfilmentCentersMap ? orderConfirmation.orderDetails : null;
  }
);

/* istanbul ignore next */
const getOrderShippingDetails = createSelector(
  [getFullfilmentCentersMap, getOrderConfirmation],
  (fullfilmentCentersMap, orderConfirmation) => {
    return !fullfilmentCentersMap ? orderConfirmation.shipping : null;
  }
);

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

/* istanbul ignore next */
const getOrderNumbersByFullfillmentCenter = createSelector(
  [getFullfilmentCentersMap, getHoldDate],
  (fullfilmentCentersMap, holdDate) => {
    return fullfilmentCentersMap
      ? {
          holdDate,
          fullfillmentCenterMap: fullfilmentCentersMap,
        }
      : null;
  }
);

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

const getCurrentSiteId = () => {
  return getAPIConfig().siteId;
};

const isCanadaSite = () => {
  return getCurrentSiteId() === constants.ROUTING_CONST.siteIds.ca;
};

const getConfirmationLblObj = state =>
  state && state.Labels && state.Labels.checkout && state.Labels.checkout.orderConfirmation;

const getConfirmationLabels = createSelector(
  getConfirmationLblObj,
  confirmationLbl => {
    const labels = {};
    const lblKeys = [
      'lbl_confirmation_heading',
      'lbl_confirmation_mixOrderMsg1',
      'lbl_confirmation_mixOrderMsg2',
      'lbl_confirmation_orderMsg1',
      'lbl_confirmation_shippingMsg',
      'lbl_confirmation_pickup',
      'lbl_confirmation_orderMsg2',
      'lbl_confirmation_pendingOrderMsg',
      'lbl_confirmation_pickupAt',
      'lbl_confirmation_shippingTo',
      'lbl_confirmation_item',
      'lbl_confirmation_items',
      'lbl_confirmation_currencySign',
      'lbl_confirmation_bopisDate',
      'lbl_confirmation_today',
      'lbl_confirmation_tomorrow',
      'lbl_confirmation_phone',
      'lbl_confirmation_orderNumber',
      'lbl_confirmation_orderDate',
      'lbl_confirmation_orderTotal',
      'lbl_confirmation_nextHeading',
      'lbl_confirmation_nextDetails',
      'lbl_confirmation_nextDetails_boss',
      'lbl_confirmation_updateOrderHeading',
    ];
    lblKeys.forEach(key => {
      labels[key] = getLabelValue(confirmationLbl, key);
    });
    const {
      lbl_confirmation_heading: thankYouHeading,
      lbl_confirmation_mixOrderMsg1: mixOrderMsg1,
      lbl_confirmation_mixOrderMsg2: mixOrderMsg2,
      lbl_confirmation_orderMsg1: orderMsg1,
      lbl_confirmation_shippingMsg: shippingMsg,
      lbl_confirmation_pickup: pickup,
      lbl_confirmation_orderMsg2: orderMsg2,
      lbl_confirmation_pendingOrderMsg: pendingOrderMsg,
      lbl_confirmation_pickupAt: pickupAt,
      lbl_confirmation_shippingTo: shippingTo,
      lbl_confirmation_item: item,
      lbl_confirmation_items: items,
      lbl_confirmation_currencySign: currencySign,
      lbl_confirmation_bopisDate: bopisDate,
      lbl_confirmation_today: today,
      lbl_confirmation_tomorrow: tomorrow,
      lbl_confirmation_phone: phone,
      lbl_confirmation_orderNumber: orderNumber,
      lbl_confirmation_orderDate: orderDate,
      lbl_confirmation_orderTotal: orderTotal,
      lbl_confirmation_nextHeading: nextHeading,
      lbl_confirmation_nextDetails: nextDetails,
      lbl_confirmation_updateOrderHeading: updateOrderHeading,
      lbl_confirmation_nextDetails_boss: nextDetailsBoss,
    } = labels;
    return {
      thankYouHeading,
      mixOrderMsg1,
      mixOrderMsg2,
      orderMsg1,
      shippingMsg,
      pickup,
      orderMsg2,
      pendingOrderMsg,
      pickupAt,
      shippingTo,
      item,
      items,
      currencySign,
      bopisDate,
      today,
      tomorrow,
      phone,
      orderNumber,
      orderDate,
      orderTotal,
      nextHeading,
      nextDetails,
      updateOrderHeading,
      nextDetailsBoss,
    };
  }
);

/* istanbul ignore next */
const getUpdateOrderDetailsId = (state, option) => {
  const { referred = [] } = state.Labels.checkout.orderConfirmation;
  const content = referred.find(label => label.name === option);
  return content && content.contentId;
};

/* istanbul ignore next */
const getUpdateOrderDetailsData = state => {
  return (
    state.Confirmation.get('updateOrderDetails') &&
    state.Confirmation.get('updateOrderDetails').richText
  );
};

export default {
  getOrderConfirmation,
  getOrderEmailAddress,
  getCurrentSiteId,
  // getItemsCount,
  // getSubTotal,
  // getGrandTotal,
  // getSummary,
  getFullfilmentCentersMap,
  getHoldDate,
  // getInitialCreateAccountValues,
  getIsOrderHasShipping,
  // getFullfilmentCentersMap,
  // getHoldDate,
  getInitialCreateAccountValues,
  // getIsOrderHasShipping,
  // getEarnedPlaceCashValue,
  // getPlaceCashSpotEnabled,
  getPersonalizedCoupons,
  getEncryptedEmailAddress,
  // getPeronsalizedCoupons,
  // isVenmoPaymentConfirmationDisplayed,
  getConfirmationSummary,
  // getVenmoUserId,
  getIsOrderPending,
  getOrderDetails,
  getOrderShippingDetails,
  // getEstimatedRewards,
  // getPointsToNextReward,
  // getEarnedReward,
  // getAirmiles,
  getOrderNumbersByFullfillmentCenter,
  // getBrierleySwitch,
  // shouldHideConfirmationEspot
  isCanadaSite,
  getConfirmationLabels,
  getUpdateOrderDetailsId,
  getUpdateOrderDetailsData,
  getConfirmationLblObj,
};
