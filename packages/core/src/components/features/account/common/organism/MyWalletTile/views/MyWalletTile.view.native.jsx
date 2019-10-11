import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { BodyCopy, Anchor, Button } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';

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
  const myWalletStartShop = `${getLabelValue(
    labels,
    'lbl_overview_myWalletNoOfferAvailable'
  )} ${getLabelValue(labels, 'lbl_overview_myWalletStartShop')}`;

  if (couponsCount) {
    walletOverviewInfo = getLabelValue(labels, 'lbl_overview_myWalletOfferAvailable').replace(
      /\{0\}/,
      couponsCount
    );
    walletDataLocator = 'accountoverview-mywallettile-youhavewallettext';
    myWalletCTA = getLabelValue(labels, 'lbl_overview_walletViewAllCTA');
  } else {
    walletOverviewInfo = getLabelValue(labels, 'lbl_overview_myWalletNoOfferAvailable');
    walletDataLocator = 'accountoverview-mywallettile-startshoptext';
    myWalletCTA = getLabelValue(labels, 'lbl_overview_viewMyWalletCTA');
  }

  return (
    <PlaceRewardsTileContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={getLabelValue(labels, 'lbl_overview_myWalletHeading')}
        color="black"
        fontWeight="black"
      />
      <UnderlineStyle />
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
              accessibilityLabel={getLabelValue(labels, 'lbl_overview_myWalletShopCTA')}
              text={getLabelValue(labels, 'lbl_overview_myWalletShopCTA')}
              borderWidth="1"
              borderColor="black"
              onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
            />
          </ShopAnchor>
        </View>
      )}

      <ButtonWrapperStyle>
        <Button
          text={myWalletCTA}
          fill="BLUE"
          onPress={() => navigateToNestedRoute(navigation, 'WalletStack', 'walletPage')}
        />
      </ButtonWrapperStyle>
    </PlaceRewardsTileContainer>
  );
};

MyWalletTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_myWalletHeading: PropTypes.string,
    lbl_overview_myWalletCTA: PropTypes.string,
    lbl_overview_myWalletOfferAvailable: PropTypes.string,
    lbl_overview_myWalletNoOfferAvailable: PropTypes.string,
    lbl_overview_myWalletStartShop: PropTypes.string,
    lbl_overview_myWalletShopCTA: PropTypes.string,
  }),
  commonLabels: PropTypes.shape({}),
  coupons: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}),
};

MyWalletTile.defaultProps = {
  navigation: {},
  labels: {
    lbl_overview_myWalletHeading: '',
    lbl_overview_myWalletCTA: '',
    lbl_overview_myWalletOfferAvailable: '',
    lbl_overview_myWalletNoOfferAvailable: '',
    lbl_overview_myWalletStartShop: '',
    lbl_overview_myWalletShopCTA: '',
  },
  commonLabels: {},
};

export default withNavigation(MyWalletTile);
