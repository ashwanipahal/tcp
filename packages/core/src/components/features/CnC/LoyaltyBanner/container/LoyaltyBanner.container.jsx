import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getIsInternationalShipping } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import { resetPLCCResponse } from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.actions';
import { closeAddedToBag } from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.actions';

import LoyaltyBannerView from '../views/LoyaltyBannerView';
import {
  getThresholdValue,
  cartOrderDetails,
  getLoyaltyBannerLabels,
  confirmationDetails,
  getFooterLabels,
} from './LoyaltyBanner.selectors';

import { isGuest } from '../../Checkout/container/Checkout.selector';
import { isPlccUser } from '../../../account/User/container/User.selectors';

export const LoyaltyBannerContainer = ({
  labels,
  orderDetails,
  thresholdValue,
  isGuestCheck,
  isPlcc,
  currencySymbol,
  pageCategory,
  isInternationalShipping,
  openOverlay,
  closeAddedToBagModal,
  inheritedStyles,
  openApplyNowModal,
  footerLabels,
  navigation,
}) => {
  const {
    estimatedRewards,
    subTotal,
    subTotalWithDiscounts,
    cartTotalAfterPLCCDiscount,
    earnedReward,
    pointsToNextReward,
  } = orderDetails;
  return (
    <LoyaltyBannerView
      labels={labels}
      estimatedRewardsVal={estimatedRewards}
      currentSubtotal={subTotal}
      estimatedSubtotal={cartTotalAfterPLCCDiscount}
      checkThresholdValue={subTotalWithDiscounts}
      thresholdValue={thresholdValue}
      isGuest={isGuestCheck}
      earnedReward={earnedReward}
      isPlcc={isPlcc}
      pointsToNextReward={pointsToNextReward}
      getCurrencySymbol={currencySymbol}
      pageCategory={pageCategory}
      isInternationalShipping={isInternationalShipping}
      openOverlay={openOverlay}
      closeAddedToBagModal={closeAddedToBagModal}
      inheritedStyles={inheritedStyles}
      openApplyNowModal={openApplyNowModal}
      footerLabels={footerLabels}
      navigation={navigation}
    />
  );
};

LoyaltyBannerContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderDetails: PropTypes.shape({}).isRequired,
  closeAddedToBagModal: PropTypes.func.isRequired,
  openOverlay: PropTypes.func.isRequired,
  thresholdValue: PropTypes.number,
  isGuestCheck: PropTypes.bool,
  isPlcc: PropTypes.bool,
  currencySymbol: PropTypes.string,
  pageCategory: PropTypes.string,
  isInternationalShipping: PropTypes.bool,
  inheritedStyles: PropTypes.string,
  openApplyNowModal: PropTypes.func.isRequired,
  footerLabels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
};

LoyaltyBannerContainer.defaultProps = {
  thresholdValue: null,
  isGuestCheck: false,
  isPlcc: false,
  currencySymbol: '',
  pageCategory: '',
  isInternationalShipping: false,
  inheritedStyles: '',
  navigation: null,
};

export const mapDispatchToProps = dispatch => ({
  openOverlay: component => dispatch(openOverlayModal(component)),
  closeAddedToBagModal: () => {
    dispatch(closeAddedToBag());
  },
  openApplyNowModal: payload => {
    dispatch(toggleApplyNowModal(payload));
    dispatch(resetPLCCResponse(payload));
  },
});

/* istanbul ignore next */
export const mapStateToProps = (state, ownProps) => {
  const isGuestState = isGuest(state);
  const isPlccState = isPlccUser(state);
  const loyaltyLabels = getLoyaltyBannerLabels(state);
  return {
    labels: loyaltyLabels,
    orderDetails:
      ownProps.pageCategory === 'confirmation'
        ? confirmationDetails(state)
        : cartOrderDetails(state),
    thresholdValue: getThresholdValue(state),
    isGuestCheck: isGuest(state),
    isPlcc: isPlccUser(state),
    currencySymbol: getCurrencySymbol(state),
    isInternationalShipping: getIsInternationalShipping(state),
    footerLabels: getFooterLabels(state, ownProps.pageCategory, isGuestState, isPlccState),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoyaltyBannerContainer);
