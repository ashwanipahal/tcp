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
      isReviewPage,
      isConfirmationPage,
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
        isReviewPage={isReviewPage}
        isConfirmationPage={isConfirmationPage}
      />
    );
  }
}

export default LoyaltyBanner;
