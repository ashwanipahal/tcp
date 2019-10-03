/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationView from '../views';
import selectors from './Confirmation.selectors';
import { isGuest, isUsSite } from '../../Checkout/container/Checkout.selector';
import { fetchUpdateOrderDetailsData } from './Confirmation.actions';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';

/**
 * @class ConfirmationContainer
 * @description container component to render confirmation component.
 */
class ConfirmationContainer extends React.Component {
  static propTypes = {
    /** Flag indicates whether the user is a guest */
    isGuestUser: PropTypes.bool,

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
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    fetchUpdateOrderDetails: contentIds => {
      dispatch(fetchUpdateOrderDetailsData(contentIds));
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationContainer);
export { ConfirmationContainer as ConfirmationContainerVanilla };
