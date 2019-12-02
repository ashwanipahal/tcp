/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationView from '../views';
import selectors from './Confirmation.selectors';
import checkoutSelectors, { isGuest, isUsSite } from '../../Checkout/container/Checkout.selector';
import { fetchUpdateOrderDetailsData } from './Confirmation.actions';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import PlaceCashSelector from '../../PlaceCashBanner/container/PlaceCashBanner.selectors';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import SMSNotificationSelectors from '../organisms/SMSNotifications/container/SMSNotifications.selectors';

const { getVenmoOrderUserId, getVenmoPayment, isVenmoOrderPayment } = checkoutSelectors;
/**
 * @class ConfirmationContainer
 * @description container component to render confirmation component.
 */
class ConfirmationContainer extends React.Component {
  static propTypes = {
    /** Flag indicates whether the user is a guest */
    isGuestUser: PropTypes.bool,
    venmoOrderConfirmationId: PropTypes.string,
    venmoPayment: PropTypes.shape({}),
    venmoOrderConfirmationContent: PropTypes.string,
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
    updateOrderDetailsBopisId: PropTypes.string,
    updateOrderDetailsBossId: PropTypes.string,
    fetchUpdateOrderDetails: PropTypes.func.isRequired,
    updateOrderDetailsData: PropTypes.shape({}),
    labels: PropTypes.shape({}).isRequired,
    encryptedEmailAddress: PropTypes.string,
    orderShippingDetails: PropTypes.shape({}),
    isCanadaSite: PropTypes.bool,
    isUsSiteId: PropTypes.bool,
    venmoUserName: PropTypes.string,
    pageCategory: PropTypes.string,
    isVenmoPaymentInProgress: PropTypes.bool,
    navigation: PropTypes.shape({}).isRequired,
    isGymboreeCanadaSite: PropTypes.bool,
    placeCashConfirmationContentId: PropTypes.string,
    fetchModuleXContent: PropTypes.func.isRequired,
    notificationMsgContentId: PropTypes.string,
    subscribeSuccessMsgContentId: PropTypes.string,
  };

  static defaultProps = {
    isGuestUser: true,
    isOrderPending: false,
    updateOrderDetailsBopisId: null,
    updateOrderDetailsBossId: null,
    updateOrderDetailsData: null,
    encryptedEmailAddress: '',
    orderShippingDetails: null,
    isCanadaSite: false,
    isUsSiteId: true,
    venmoUserName: '',
    pageCategory: '',
    isVenmoPaymentInProgress: false,
    isGymboreeCanadaSite: false,
    placeCashConfirmationContentId: '',
    notificationMsgContentId: '',
    subscribeSuccessMsgContentId: '',
    venmoOrderConfirmationContent: '',
    venmoOrderConfirmationId: null,
    venmoPayment: {},
  };

  /**
   * @function componentDidMount
   * called when component is mount and calls getInitialProps method of wrapped component
   * and adds didFocus listener to the view which is called every time view is displayed
   *
   */
  componentDidMount() {
    const {
      updateOrderDetailsBopisId,
      updateOrderDetailsBossId,
      fetchUpdateOrderDetails,
      orderNumbersByFullfillmentCenter,
      placeCashConfirmationContentId,
      fetchModuleXContent,
      notificationMsgContentId,
      subscribeSuccessMsgContentId,
      venmoOrderConfirmationId,
    } = this.props;
    /* istanbul ignore else */
    if (fetchUpdateOrderDetails) {
      const isBossInList =
        orderNumbersByFullfillmentCenter &&
        orderNumbersByFullfillmentCenter.fullfillmentCenterMap.find(
          store => store.orderType === CONFIRMATION_CONSTANTS.ORDER_ITEM_TYPE.BOSS
        );
      const moduleXId = isBossInList ? updateOrderDetailsBossId : updateOrderDetailsBopisId;
      fetchUpdateOrderDetails([moduleXId]);
    }
    // Call for notification adn Subscribe content needs to be removed from SMS component now
    fetchModuleXContent([
      placeCashConfirmationContentId,
      notificationMsgContentId,
      subscribeSuccessMsgContentId,
      venmoOrderConfirmationId,
    ]);
  }

  /**
   * renders wrapped component
   *
   * @returns
   */
  render() {
    const {
      updateOrderDetailsData,
      labels,
      isGuestUser,
      isOrderPending,
      emailAddress,
      encryptedEmailAddress,
      orderDetails,
      orderShippingDetails,
      isCanadaSite,
      isUsSiteId,
      orderNumbersByFullfillmentCenter,
      venmoUserName,
      pageCategory,
      navigation,
      isGymboreeCanadaSite,
      venmoOrderConfirmationContent,
      isVenmoPaymentInProgress,
    } = this.props;
    return (
      <ConfirmationView
        isGuest={isGuestUser}
        isOrderPending={isOrderPending}
        emailAddress={emailAddress}
        encryptedEmailAddress={encryptedEmailAddress}
        orderDetails={orderDetails}
        orderShippingDetails={orderShippingDetails}
        isCanadaSite={isCanadaSite}
        isUsSite={isUsSiteId}
        orderNumbersByFullfillmentCenter={orderNumbersByFullfillmentCenter}
        labels={labels}
        updateOrderDetailsData={updateOrderDetailsData}
        venmoUserName={venmoUserName}
        isVenmoPaymentInProgress={isVenmoPaymentInProgress}
        pageCategory={pageCategory}
        navigation={navigation}
        isGymboreeCanadaSite={isGymboreeCanadaSite}
        venmoOrderConfirmationContent={venmoOrderConfirmationContent}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    fetchUpdateOrderDetails: contentIds => {
      dispatch(fetchUpdateOrderDetailsData(contentIds));
    },
    fetchModuleXContent: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
  };
};

export const mapStateToProps = state => {
  return {
    isGuestUser: isGuest(state),
    isOrderPending: selectors.getIsOrderPending(state),
    emailAddress: selectors.getOrderEmailAddress(state),
    encryptedEmailAddress: selectors.getEncryptedEmailAddress(state),
    orderDetails: selectors.getOrderDetails(state),
    orderShippingDetails: selectors.getOrderShippingDetails(state),
    // personalizedCoupons: selectors.getPersonalizedCoupons(state),
    // isRewardsEnabled: isUsSite(state),
    // estimatedRewards: selectors.getEstimatedRewards(state),
    // pointsToNextReward: selectors.getPointsToNextReward(state),
    // earnedReward: selectors.getEarnedReward(state),
    // isSmsMarketingEnabled: isUsSite(state),
    isCanadaSite: selectors.isCanadaSite(state),
    isUsSiteId: isUsSite(state),
    //     isBrierleyEnabled: selectors.getBrierleySwitch(state),
    //     rewardsBanner: {
    //       contentSlotName: 'checkout_confirmation_MPR_promo'
    //     },

    //     banner: {
    //       contentSlotName: 'checkout_confirmation_banner'
    //     },
    //     isAirmilesEnabled: selectors.isCanadaSite(state),
    //     airmiles: selectors.getAirmiles(state),
    //     hideConfirmationEspot: selectors.shouldHideConfirmationEspot(state),

    orderNumbersByFullfillmentCenter: selectors.getOrderNumbersByFullfillmentCenter(state),
    labels: selectors.getConfirmationLabels(state),
    updateOrderDetailsBopisId: selectors.getUpdateOrderDetailsId(
      state,
      'Update_Order_Details_BOPIS'
    ),
    updateOrderDetailsBossId: selectors.getUpdateOrderDetailsId(state, 'Update_Order_Details_BOSS'),
    updateOrderDetailsData: selectors.getUpdateOrderDetailsData(state),
    venmoUserName: getVenmoOrderUserId(state),
    isGymboreeCanadaSite: selectors.isGymboreeCanadaSite(state),
    placeCashConfirmationContentId: PlaceCashSelector.getPlaceDetailsContentId(
      state,
      PlaceCashSelector.getPlaceCashDetailBannerLabel(state, null, true)
    ),
    notificationMsgContentId: SMSNotificationSelectors.getNotificationMsgContentId(state),
    subscribeSuccessMsgContentId: SMSNotificationSelectors.getSubscribeSuccessMsgContentId(state),
    venmoPayment: getVenmoPayment(state),
    venmoOrderConfirmationId: selectors.getVenmoOrderConfirmationContentId(
      state,
      'Venmo_Order_Confirmation'
    ),
    venmoOrderConfirmationContent: selectors.getVenmoOrderConfirmationContent(
      state,
      'Venmo_Order_Confirmation'
    ),
    isVenmoPaymentInProgress: isVenmoOrderPayment(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationContainer);
export { ConfirmationContainer as ConfirmationContainerVanilla };
