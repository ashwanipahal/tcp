import React from 'react';
import LoyaltyBannerSection from '../../../molecules/LoyaltyBannerSection';

class LoyaltyBanner extends React.PureComponent<Props> {
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
      />
    );
  }
}

export default LoyaltyBanner;
