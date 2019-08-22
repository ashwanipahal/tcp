import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { navigateToNestedRoute } from '@tcp/core/src/utils/utils.app';
import { withNavigation } from 'react-navigation';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  UnderlineStyle,
  AddressTileContainer,
  ButtonWrapperStyle,
  ShopAnchor,
} from '../styles/MyPlaceRewardsOverviewTile.style.native';
import Anchor from '../../../../../../common/atoms/Anchor';
import CouponList from '../../../molecule/CouponList';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';

export class MyPlaceRewardsOverviewTile extends React.PureComponent<Props> {
  render() {
    const { className, labels, coupons, isBrierleyEnabled, handleComponentChange } = this.props;
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
    const { navigation } = this.props;
    return (
      <View>
        <AddressTileContainer>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            text={labels.lbl_overview_myPlaceRewardsHeading}
            color="black"
          />
          <UnderlineStyle />
          {rewardCouponsCount > 0 && (
            <View>
              <BodyCopy
                className="elem-mb-LRG"
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
                  data-locator="accountoverview-myplacerewardstile-startshopbtn"
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
          <UnderlineStyle />
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
        </AddressTileContainer>
      </View>
    );
  }
}

MyPlaceRewardsOverviewTile.propTypes = {
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

MyPlaceRewardsOverviewTile.defaultProps = {
  isBrierleyEnabled: true,
  className: '',
};

export default withNavigation(MyPlaceRewardsOverviewTile);
