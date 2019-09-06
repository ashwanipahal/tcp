import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import {
  UnderlineStyle,
  PlaceRewardsTileContainer,
  ButtonWrapperStyle,
  ShopAnchor,
  CouponListWrapper,
  CouponWrapper,
} from '../styles/MyWalletTile.style.native';
import CouponList from '../../../molecule/CouponList';
/*
MyWalletTile component is used in AccountOverview screen on app
*/
export const MyWalletTile = ({ labels, commonLabels, coupons, navigation }) => {
  const couponsCount = coupons && coupons.size;
  let walletOverviewInfo = '';
  let walletDataLocator = '';
  let myWalletCTA = '';
  const myWalletStartShop = `${labels.lbl_overview_myWalletNoOfferAvailable} ${
    labels.lbl_overview_myWalletStartShop
  }`;

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
    <PlaceRewardsTileContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={labels.lbl_overview_myWalletHeading}
        color="black"
      />

      <LineComp {...UnderlineStyle} />

      {couponsCount > 0 && (
        <CouponWrapper>
          <View>
            <BodyCopy
              fontSize="fs14"
              fontWeight="semibold"
              data-locator={walletDataLocator}
              text={walletOverviewInfo}
            />
          </View>
          <CouponListWrapper>
            <CouponList
              coupons={coupons}
              sliceCount={3}
              labels={labels}
              commonLabels={commonLabels}
            />
          </CouponListWrapper>
        </CouponWrapper>
      )}

      {!couponsCount && (
        <View>
          <BodyCopy fontFamily="secondary" fontSize="fs13" text={myWalletStartShop} color="black" />
          <ShopAnchor>
            <Anchor
              anchorVariation="button"
              buttonVariation="variable-width"
              fullWidth
              centered
              fill="WHITE"
              dataLocator="accountoverview-myWallettile-startshopbtn"
              accessibilityRole="link"
              accessibilityLabel={labels.lbl_overview_myWalletShopCTA}
              text={labels.lbl_overview_myWalletShopCTA}
              borderWidth="1"
              borderColor="black"
              onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
            />
          </ShopAnchor>
        </View>
      )}

      <ButtonWrapperStyle>
        <CustomButton
          text={myWalletCTA}
          buttonVariation="variable-width"
          fill="BLUE"
          onPress={() => navigateToNestedRoute(navigation, 'WalletStack', 'walletPage')}
        />
      </ButtonWrapperStyle>
    </PlaceRewardsTileContainer>
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
  handleComponentChange: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
};

MyWalletTile.defaultProps = {
  className: '',
  navigation: {},
};

export default withNavigation(MyWalletTile);
