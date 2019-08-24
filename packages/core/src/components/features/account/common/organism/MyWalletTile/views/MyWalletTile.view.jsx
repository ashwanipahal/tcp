import React from 'react';
import PropTypes from 'prop-types';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import CouponList from '../../../molecule/CouponList';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy/views/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/MyWalletTile.style';
import internalEndpoints from '../../../internalEndpoints';

export const MyWalletTile = ({ className, labels, commonLabels, coupons }) => {
  const couponsCount = coupons.size;
  let walletOverviewInfo = '';
  let walletDataLocator = '';
  let myWalletCTA = '';

  if (couponsCount) {
    walletOverviewInfo = labels.lbl_overview_myWalletOfferAvailable.replace(/\{0\}/, couponsCount);
    walletDataLocator = 'accountoverview-mywallettile-youhaverewardtext';
    myWalletCTA = labels.lbl_overview_walletViewAllCTA;
  } else {
    walletOverviewInfo = labels.lbl_overview_myWalletNoOfferAvailable;
    walletDataLocator = 'accountoverview-mywallettile-startshoptext';
    myWalletCTA = labels.lbl_overview_viewMyWalletCTA;
  }
  return (
    <AccountOverviewTile
      className={className}
      title={labels.lbl_overview_myWalletHeading}
      ctaTitle={myWalletCTA}
      ctaLink={internalEndpoints.myWalletPage.link}
      ctaPath={internalEndpoints.myWalletPage.path}
      dataLocatorPrefix="mywallettile"
    >
      <section className="elem-pb-MED">
        <BodyCopy
          className={`${!couponsCount ? 'margin-none' : ''} elem-mb-LRG`}
          fontSize="fs14"
          fontWeight="semibold"
          data-locator={walletDataLocator}
        >
          {walletOverviewInfo}
        </BodyCopy>

        {!couponsCount && (
          <BodyCopy
            className="elem-mb-LRG"
            fontSize="fs14"
            fontWeight="semibold"
            data-locator={walletDataLocator}
          >
            {labels.lbl_overview_myWalletStartShop}
          </BodyCopy>
        )}

        {!couponsCount && (
          <div>
            <Anchor
              anchorVariation="button"
              buttonVariation="variable-width"
              fullWidth
              centered
              fill="WHITE"
              to={internalEndpoints.shopNowPage.link}
              asPath={internalEndpoints.shopNowPage.path}
              data-locator="accountoverview-mywallettile-startshopbtn"
            >
              {labels.lbl_overview_myWalletShopCTA}
            </Anchor>
          </div>
        )}

        <CouponList coupons={coupons} sliceCount={3} labels={labels} commonLabels={commonLabels} />
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
  commonLabels: PropTypes.shape({}).isRequired,
  coupons: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

MyWalletTile.defaultProps = {
  className: '',
};

export default withStyles(MyWalletTile, styles);
