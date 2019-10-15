import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles';
import LoyaltyBannerSection from '../../../molecules/LoyaltyBannerSection';
import Styles from '../styles/LoyaltyBanner.style';

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
      />
    );
  }
}

export default withStyles(LoyaltyBanner, Styles);
export { LoyaltyBanner as LoyaltyBannerVanilla };
