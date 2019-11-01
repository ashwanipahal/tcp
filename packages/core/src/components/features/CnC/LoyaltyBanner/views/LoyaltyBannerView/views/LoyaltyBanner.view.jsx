import React from 'react';
import PropTypes from 'prop-types';
import { isUsOnly } from '@tcp/core/src/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import LoyaltyBannerSection from '../../../molecules/LoyaltyBannerSection';
import Styles from '../styles/LoyaltyBanner.style';

class LoyaltyBanner extends React.PureComponent<Props> {
  static propTypes = {
    pageCategory: PropTypes.string,
    className: PropTypes.string,
    isInternationalShipping: PropTypes.string,
  };

  static defaultProps = {
    pageCategory: '',
    className: '',
    isInternationalShipping: false,
  };

  render() {
    const {
      className,
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
      openLoginModal,
      checkThresholdValue,
      isInternationalShipping,
    } = this.props;
    return !isInternationalShipping && isUsOnly() ? (
      <div className={className}>
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
          openLoginModal={openLoginModal}
          checkThresholdValue={checkThresholdValue}
          isInternationalShipping={isInternationalShipping}
        />
      </div>
    ) : null;
  }
}

export default withStyles(LoyaltyBanner, Styles);
export { LoyaltyBanner as LoyaltyBannerVanilla };
