import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { View } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import { getScreenWidth } from '@tcp/core/src/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { UrlHandler } from '../../../../../../../utils/utils.app';
import {
  CouponHeading,
  StyledAnchorWrapper,
  AnchorLeftMargin,
} from '../styles/MyRewards.style.native';
import endpoints from '../../../externalEndpoints';
import Anchor from '../../../../../../common/atoms/Anchor';
import DetailedCouponTile from '../../../molecule/DetailedCouponTile';
import EmptyRewards from '../../../molecule/EmptyRewards';
import { COUPON_STATUS } from '../../../../../../../services/abstractors/CnC/CartItemTile';


/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = 220;
const MODULE_WIDTH = getScreenWidth() - 30;

/**
 * This Component return the app reawrd tile
 */
class MyRewards extends PureComponent {
  /**
   * @desc Returns app reawrd detail tile
   * Content render on the basis of copoun items.
   */
  renderView = ({ item }) => {
    const {
      labels,
      coupons,
      onViewCouponDetails,
      onApplyCouponToBag,
      onRemove,
      isApplyingOrRemovingCoupon,
    } = this.props;
    const isApplyingCoupon = !!coupons.find(
      coupon => coupon.status === COUPON_STATUS.APPLYING || coupon.status === COUPON_STATUS.REMOVING
    );
    return (
      <DetailedCouponTile
        key={item.id}
        labels={labels.common}
        coupon={item}
        onViewCouponDetails={onViewCouponDetails}
        onApplyCouponToBag={onApplyCouponToBag}
        onRemove={onRemove}
        isDisabled={isApplyingOrRemovingCoupon || isApplyingCoupon}
        className="elem-mb-LRG"
      />
    );
  };

  render() {
    const { labels, coupons } = this.props;
    const heading = `${labels.myPlaceRewards.lbl_my_rewards_heading} (${coupons.size})`;
    return (
      <View>
        <ViewWithSpacing spacingStyles="margin-bottom-LRG margin-top-LRG">
          <CouponHeading>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="extrabold"
              className="my-rewards-heading"
              data-locator="my-rewards-heading"
              text={heading}
            />
          </CouponHeading>
        </ViewWithSpacing>
        {coupons.size > 0 ? (
          <View>
            <Carousel
              data={coupons.toArray()}
              renderItem={this.renderView}
              height={MODULE_HEIGHT}
              width={MODULE_WIDTH}
              variation="show-arrow"
              showDots
              darkArrow
              autoplay={false}
            />
          </View>
        ) : (
          <EmptyRewards labels={labels} />
        )}
        <StyledAnchorWrapper>
          <Anchor
            fontSizeVariation="medium"
            underline
            onPress={() => {
              UrlHandler(endpoints.myPlaceRewardsPage);
            }}
            anchorVariation="primary"
            dataLocator="my-rewards-program-details"
            text={labels.myPlaceRewards.lbl_my_rewards_program_details}
          />
          <AnchorLeftMargin>
            <Anchor
              fontSizeVariation="medium"
              underline
              noLink
              onPress={() => {
                UrlHandler(endpoints.termsAndConditionsPage);
              }}
              anchorVariation="primary"
              dataLocator="my-rewards-tnc"
              text={labels.common.lbl_common_tnc}
            />
          </AnchorLeftMargin>
        </StyledAnchorWrapper>
      </View>
    );
  }
}

MyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, myPlaceRewards: {} }),
  coupons: PropTypes.shape([]),
  onViewCouponDetails: PropTypes.func,
  onApplyCouponToBag: PropTypes.func,
  onRemove: PropTypes.func,
  isApplyingOrRemovingCoupon: PropTypes.bool,
};

MyRewards.defaultProps = {
  labels: {
    common: { lbl_common_tnc: '' },
    myPlaceRewards: {
      lbl_my_rewards_program_details: '',
      lbl_my_rewards_heading: '',
    },
  },
  coupons: [],
  onViewCouponDetails: () => {},
  onApplyCouponToBag: () => {},
  onRemove: () => {},
  isApplyingOrRemovingCoupon: false,
};

export default MyRewards;
