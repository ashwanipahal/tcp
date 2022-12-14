import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import BonusPointsDays from '@tcp/core/src/components/common/organisms/BonusPointsDays';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  UnderlineStyle,
  PlaceRewardsTileContainer,
  ButtonWrapperStyle,
  ShopNowWrapper,
  CouponListWrapper,
  CouponWrapper,
} from '../styles/MyPlaceRewardsOverviewTile.style.native';
import CouponList from '../../../molecule/CouponList';

/*
MyPlaceRewardsOverviewTile component is used in AccountOverview screen on app
*/
export class MyPlaceRewardsOverviewTile extends React.PureComponent<Props> {
  render() {
    const {
      labels,
      commonLabels,
      coupons,
      isBrierleyEnabled,
      handleComponentChange,
      navigation,
    } = this.props;
    const rewardCouponsCount = coupons && coupons.size;
    let walletOverviewInfo = '';
    let rewardDataLocator = '';

    if (rewardCouponsCount) {
      walletOverviewInfo = getLabelValue(labels, 'lbl_overview_myPlaceRewardsAvailable').replace(
        /\{0\}/,
        rewardCouponsCount
      );
      rewardDataLocator = 'accountoverview-myplacerewatdstile-youhaverewardtext';
    } else {
      walletOverviewInfo = getLabelValue(labels, 'lbl_overview_myPlaceRewardsDesc');
      rewardDataLocator = 'accountoverview-myplacerewatdstile-startshoptext';
    }

    return (
      <PlaceRewardsTileContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={getLabelValue(labels, 'lbl_overview_myPlaceRewardsHeading')}
          color="black"
          fontWeight="black"
        />

        <LineComp {...UnderlineStyle} />

        {rewardCouponsCount > 0 && (
          <CouponWrapper>
            <View>
              <BodyCopy
                fontSize="fs14"
                fontWeight="semibold"
                fontFamily="secondary"
                data-locator={rewardDataLocator}
                text={walletOverviewInfo}
              />
            </View>
            <CouponListWrapper>
              <CouponList
                coupons={coupons}
                commonLabels={commonLabels}
                sliceCount={2}
                labels={labels}
              />
            </CouponListWrapper>
          </CouponWrapper>
        )}

        {!rewardCouponsCount && (
          <View>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              text={getLabelValue(labels, 'lbl_overview_myPlaceRewardsDesc')}
              color="black"
            />
            <ShopNowWrapper>
              <CustomButton
                text={getLabelValue(labels, 'lbl_overview_myPlaceRewardsShopNow')}
                onPress={() => navigateToNestedRoute(navigation, 'HomeStack', 'home')}
              />
            </ShopNowWrapper>
          </View>
        )}

        <LineComp {...UnderlineStyle} />

        {isBrierleyEnabled && <BonusPointsDays view="read" labels={labels} />}

        <ButtonWrapperStyle>
          <CustomButton
            text={getLabelValue(labels, 'lbl_overview_myPlaceRewardsCTA')}
            fill="BLUE"
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
  commonLabels: PropTypes.shape({}),
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
  commonLabels: {},
};

export default withNavigation(MyPlaceRewardsOverviewTile);
