import React from 'react';
import PropTypes from 'prop-types';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import CouponList from '../../../molecule/CouponList';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/MyWalletTile.style';
import internalEndpoints from '../../../internalEndpoints';

export const MyWalletTile = ({ className, labels, coupons }) => {
  const couponsCount = coupons.size;
  let walletOverviewInfo = '';
  let walletDataLocator = '';

  if (couponsCount) {
    walletOverviewInfo = labels.lbl_overview_myWalletOfferAvailable.replace(/\{0\}/, couponsCount);
    walletDataLocator = 'accountoverview-mywallettile-youhaverewardtext';
  } else {
    walletOverviewInfo = labels.lbl_overview_myWalletNoOfferAvailable;
    walletDataLocator = 'accountoverview-mywallettile-startshoptext';
  }
  return (
    <AccountOverviewTile
      className={className}
      title={labels.lbl_overview_myWalletHeading}
      ctaTitle={labels.lbl_overview_myWalletCTA}
      ctaLink={internalEndpoints.myWalletPage}
      dataLocatorPrefix="myrewardstile"
    >
      <section className="elem-pb-MED">
        <BodyCopy
          className="elem-mb-LRG"
          fontSize="fs14"
          fontWeight="semibold"
          data-locator={walletDataLocator}
        >
          {walletOverviewInfo}
          {!couponsCount && labels.lbl_overview_myWalletStartShop}
        </BodyCopy>

        {!couponsCount && (
          <div>
            <Anchor
              anchorVariation="button"
              buttonVariation="variable-width"
              fullWidth
              centered
              fill="WHITE"
              to={internalEndpoints.shopNowPage}
              data-locator="accountoverview-myplacerewardstile-startshopbtn"
            >
              {labels.lbl_overview_myWalletShopCTA}
            </Anchor>
          </div>
        )}

        <CouponList coupons={coupons} sliceCount={5} labels={labels} />
      </section>
    </AccountOverviewTile>
  );
};

MyWalletTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_myWalletHeading: PropTypes.string.isRequired,
    lbl_overview_myWalletCTA: PropTypes.string.isRequired,
    lbl_overview_myWalletOfferAvailable: PropTypes.string.isRequired,
    lbl_overview_myWalletNoOfferAvailable: PropTypes.string.isRequired,
    lbl_overview_myWalletStartShop: PropTypes.string.isRequired,
    lbl_overview_myWalletShopCTA: PropTypes.string.isRequired,
  }).isRequired,
  coupons: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

MyWalletTile.defaultProps = {
  className: '',
};

export default withStyles(MyWalletTile, styles);
