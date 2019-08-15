import React from 'react';
import PropTypes from 'prop-types';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import CouponList from '../molecules/CouponList';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/MyWalletTile.style';

export const MyWalletTile = ({ className, labels, coupons, isBrierleyEnabled }) => {
  const couponsCount = coupons.size;
  let walletOverviewInfo = '';
  let rewardDataLocator = '';

  if (couponsCount) {
    walletOverviewInfo = labels.lbl_overview_myPlaceRewardsAvailable.replace(/\{0\}/, couponsCount);
    rewardDataLocator = 'accountoverview-mywallettile-youhaverewardtext';
  } else {
    walletOverviewInfo = labels.lbl_overview_myPlaceRewardsDesc;
    rewardDataLocator = 'accountoverview-mywallettile-startshoptext';
  }
  return (
    <AccountOverviewTile
      className={className}
      title={labels.lbl_overview_myPlaceRewardsHeading}
      ctaTitle={labels.lbl_overview_myPlaceRewardsCTA}
      dataLocatorPrefix="myrewardstile"
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
        <CouponList coupons={coupons} sliceCount={5} labels={labels} />
        {!couponsCount && <div>FEO</div>}
      </section>
    </AccountOverviewTile>
  );
};

MyWalletTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsHeading: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsCTA: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsAvailable: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsDesc: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsShopNow: PropTypes.string.isRequired,
  }).isRequired,
  coupons: PropTypes.shape([]).isRequired,
  isBrierleyEnabled: PropTypes.bool,
  className: PropTypes.string,
};

MyWalletTile.defaultProps = {
  isBrierleyEnabled: true,
  className: '',
};

export default withStyles(MyWalletTile, styles);
