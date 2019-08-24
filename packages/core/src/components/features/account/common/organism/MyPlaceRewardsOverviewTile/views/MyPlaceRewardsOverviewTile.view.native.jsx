import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import BonusPointsDays from '@tcp/core/src/components/common/organisms/BonusPointsDays';
import {
  UnderlineStyle,
  PlaceRewardsTileContainer,
  ButtonWrapperStyle,
  ShopAnchor,
} from '../styles/MyPlaceRewardsOverviewTile.style.native';
import CouponList from '../../../molecule/CouponList';

/*
MyPlaceRewardsOverviewTile component is used in AccountOverview screen on app
*/
export class MyPlaceRewardsOverviewTile extends React.PureComponent<Props> {
  render() {
    const { labels, coupons, isBrierleyEnabled, handleComponentChange, navigation } = this.props;
    const rewardCouponsCount = coupons && coupons.size;
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
      <PlaceRewardsTileContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={labels.lbl_overview_myPlaceRewardsHeading}
          color="black"
        />

        <LineComp {...UnderlineStyle} />

        {rewardCouponsCount > 0 && (
          <View>
            <BodyCopy
              fontSize="fs14"
              fontWeight="semibold"
              data-locator={rewardDataLocator}
              text={walletOverviewInfo}
              margin-bottom="15"
            />
            <CouponList coupons={coupons} sliceCount={2} labels={labels} />
          </View>
        )}

        {!rewardCouponsCount && (
          <View>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              text={labels.lbl_overview_myPlaceRewardsDesc}
              color="black"
            />
            <ShopAnchor>
              <Anchor
                anchorVariation="button"
                buttonVariation="variable-width"
                fullWidth
                centered
                fill="WHITE"
                dataLocator="accountoverview-myplacerewardstile-startshopbtn"
                accessibilityRole="link"
                accessibilityLabel={labels.lbl_overview_myPlaceRewardsShopNow}
                text={labels.lbl_overview_myPlaceRewardsShopNow}
                borderWidth="1"
                borderColor="black"
                onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
              />
            </ShopAnchor>
          </View>
        )}

        <LineComp {...UnderlineStyle} />

        {isBrierleyEnabled && <BonusPointsDays view="read" labels={labels} />}

        <ButtonWrapperStyle>
          <CustomButton
            text={labels.lbl_overview_myPlaceRewardsCTA}
            buttonVariation="variable-width"
            fill="BLUE"
            color="white"
            onPress={() => handleComponentChange('myPlaceRewardsMobile')}
          />
        </ButtonWrapperStyle>
      </PlaceRewardsTileContainer>
    );
  }
}

MyPlaceRewardsOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsHeading: PropTypes.string,
    lbl_overview_myPlaceRewardsCTA: PropTypes.string,
    lbl_overview_myPlaceRewardsAvailable: PropTypes.string,
    lbl_overview_myPlaceRewardsDesc: PropTypes.string,
    lbl_overview_myPlaceRewardsShopNow: PropTypes.string,
  }),
  coupons: PropTypes.shape([]).isRequired,
  isBrierleyEnabled: PropTypes.bool,
};

MyPlaceRewardsOverviewTile.defaultProps = {
  isBrierleyEnabled: true,
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsHeading: '',
    lbl_overview_myPlaceRewardsCTA: '',
    lbl_overview_myPlaceRewardsAvailable: '',
    lbl_overview_myPlaceRewardsDesc: '',
    lbl_overview_myPlaceRewardsShopNow: '',
  }),
};

export default withNavigation(MyPlaceRewardsOverviewTile);
