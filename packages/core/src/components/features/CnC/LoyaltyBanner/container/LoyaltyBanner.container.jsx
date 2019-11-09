import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getIsInternationalShipping } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import { resetPLCCResponse } from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.actions';
import { closeAddedToBag } from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.actions';
import BagPageSelector from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';

import LoyaltyBannerView from '../views/LoyaltyBannerView';
import {
  getThresholdValue,
  cartOrderDetails,
  getLoyaltyBannerLabels,
  confirmationDetails,
} from './LoyaltyBanner.selectors';

import { isGuest } from '../../Checkout/container/Checkout.selector';
import { isPlccUser } from '../../../account/User/container/User.selectors';

export const LoyaltyBannerContainer = ({
  bagLoading,
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
      navigation={navigation}
      bagLoading={bagLoading}
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
  navigation: PropTypes.shape({}),
  bagLoading: PropTypes.bool,
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
  bagLoading: false,
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
export const mapStateToProps = (state, ownProps) => ({
  labels: getLoyaltyBannerLabels(state),
  orderDetails:
    ownProps.pageCategory === 'confirmation' ? confirmationDetails(state) : cartOrderDetails(state),
  thresholdValue: getThresholdValue(state),
  isGuestCheck: isGuest(state),
  isPlcc: isPlccUser(state),
  currencySymbol: getCurrencySymbol(state),
  isInternationalShipping: getIsInternationalShipping(state),
  bagLoading: BagPageSelector.isBagLoading(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoyaltyBannerContainer);
