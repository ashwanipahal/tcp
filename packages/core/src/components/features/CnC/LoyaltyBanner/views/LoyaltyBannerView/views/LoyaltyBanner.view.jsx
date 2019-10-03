import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import LoyaltyBannerSection from '../../../molecules/LoyaltyBannerSection';
import Styles from '../styles/LoyaltyBanner.style';

class LoyaltyBanner extends React.PureComponent<Props> {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
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
    } = this.props;
    return (
      <div className={className}>
        <LoyaltyBannerSection
          labels={labels}
          estimatedRewardsVal={estimatedRewardsVal}
          currentSubtotal={currentSubtotal}
          estimatedSubtotal={estimatedSubtotal}
          thresholdValue={thresholdValue}
          isGuest={isGuest}
          earnedReward={earnedReward}
        />
      </div>
    );
  }
}

export default withStyles(LoyaltyBanner, Styles);
export { LoyaltyBanner as LoyaltyBannerVanilla };
