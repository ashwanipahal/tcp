import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import CouponList from '../../../molecule/CouponList';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import styles from '../styles/MyPlaceRewardsOverviewTile.style';

export const MyPlaceRewardsOverviewTile = ({
  className,
  labels,
  commonLabels,
  coupons,
  isBrierleyEnabled,
}) => {
  const rewardCouponsCount = coupons.size;
  let walletOverviewInfo = '';
  let rewardDataLocator = '';

  if (rewardCouponsCount) {
    walletOverviewInfo = labels.lbl_overview_myPlaceRewardsAvailable.replace(
      /\{0\}/,
      rewardCouponsCount
    );
    rewardDataLocator = 'accountoverview-myplacerewatdstile-youhaverewardtext';
  } else {
    walletOverviewInfo = labels.lbl_overview_myPlaceRewardsDesc;
    rewardDataLocator = 'accountoverview-myplacerewatdstile-startshoptext';
  }
  return (
    <AccountOverviewTile
      className={className}
      title={labels.lbl_overview_myPlaceRewardsHeading}
      ctaTitle={labels.lbl_overview_myPlaceRewardsCTA}
      dataLocatorPrefix="myrewardstile"
      ctaLink="/account?id=place-rewards"
      ctaPath="/account/place-rewards"
    >
      <section className={`elem-pb-MED ${isBrierleyEnabled ? 'bordered' : ''}`}>
        <BodyCopy
          className="elem-mb-LRG"
          fontSize="fs14"
          fontWeight="semibold"
          data-locator={rewardDataLocator}
        >
          {walletOverviewInfo}
        </BodyCopy>
        <CouponList coupons={coupons} sliceCount={2} labels={labels} commonLabels={commonLabels} />
        {!rewardCouponsCount && (
          <div>
            <Anchor
              anchorVariation="button"
              buttonVariation="variable-width"
              fullWidth
              centered
              fill="WHITE"
              to="/home"
              dataLocator="accountoverview-myplacerewardstile-startshopbtn"
            >
              {labels.lbl_overview_myPlaceRewardsShopNow}
            </Anchor>
          </div>
        )}
      </section>
      {isBrierleyEnabled && <BonusPointsDays view="read" labels={labels} />}
    </AccountOverviewTile>
  );
};

MyPlaceRewardsOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsHeading: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsCTA: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsAvailable: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsDesc: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsShopNow: PropTypes.string.isRequired,
  }).isRequired,
  commonLabels: PropTypes.shape({}),
  coupons: PropTypes.shape([]).isRequired,
  isBrierleyEnabled: PropTypes.bool,
  className: PropTypes.string,
};

MyPlaceRewardsOverviewTile.defaultProps = {
  isBrierleyEnabled: true,
  className: '',
  commonLabels: {},
};

export default withStyles(MyPlaceRewardsOverviewTile, styles);
