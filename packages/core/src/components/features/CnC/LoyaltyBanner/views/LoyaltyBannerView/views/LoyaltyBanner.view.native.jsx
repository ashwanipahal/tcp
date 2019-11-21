import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoyaltyBannerSection from '../../../molecules/LoyaltyBannerSection';

class LoyaltyBanner extends PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    estimatedRewardsVal: PropTypes.number.isRequired,
    currentSubtotal: PropTypes.number.isRequired,
    estimatedSubtotal: PropTypes.number.isRequired,
    thresholdValue: PropTypes.number.isRequired,
    isGuest: PropTypes.bool.isRequired,
    earnedReward: PropTypes.number.isRequired,
    isPlcc: PropTypes.bool.isRequired,
    pointsToNextReward: PropTypes.number.isRequired,
    getCurrencySymbol: PropTypes.func.isRequired,
    pageCategory: PropTypes.string.isRequired,
    footerLabels: PropTypes.shape({}),
    openApplyNowModal: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    closeAddedToBagModal: PropTypes.func,
  };

  static defaultProps = {
    labels: {},
    footerLabels: {},
    closeAddedToBagModal: () => {},
  };

  render() {
    const {
      labels,
      estimatedRewardsVal,
      currentSubtotal,
      estimatedSubtotal,
      thresholdValue,
      isGuest,
      earnedReward,
      isPlcc,
      pointsToNextReward,
      getCurrencySymbol,
      pageCategory,
      footerLabels,
      openApplyNowModal,
      navigation,
      closeAddedToBagModal,
    } = this.props;
    return (
      <LoyaltyBannerSection
        labels={labels}
        estimatedRewardsVal={estimatedRewardsVal}
        currentSubtotal={currentSubtotal}
        estimatedSubtotal={estimatedSubtotal}
        thresholdValue={thresholdValue}
        isGuest={isGuest}
        earnedReward={earnedReward}
        isPlcc={isPlcc}
        pointsToNextReward={pointsToNextReward}
        getCurrencySymbol={getCurrencySymbol}
        pageCategory={pageCategory}
        footerLabels={footerLabels}
        openApplyNowModal={openApplyNowModal}
        navigation={navigation}
        closeAddedToBagModal={closeAddedToBagModal}
      />
    );
  }
}

export default LoyaltyBanner;
