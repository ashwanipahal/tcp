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
      checkThresholdValue,
      isInternationalShipping,
      openOverlay,
      closeAddedToBagModal,
      inheritedStyles,
      openApplyNowModal,
      footerLabels,
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
          checkThresholdValue={checkThresholdValue}
          isInternationalShipping={isInternationalShipping}
          openOverlay={openOverlay}
          closeAddedToBagModal={closeAddedToBagModal}
          inheritedStyles={inheritedStyles}
          openApplyNowModal={openApplyNowModal}
          footerLabels={footerLabels}
        />
      </div>
    ) : null;
  }
}

export default withStyles(LoyaltyBanner, Styles);
export { LoyaltyBanner as LoyaltyBannerVanilla };
