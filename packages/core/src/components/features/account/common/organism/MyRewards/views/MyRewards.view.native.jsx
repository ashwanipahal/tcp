import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { View } from 'react-native';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import { getScreenWidth } from '@tcp/core/src/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import ToastContainer from '@tcp/core/src/components/common/atoms/Toast/container/Toast.container.native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
import CouponDetailModal from '../../../../../CnC/common/organism/CouponAndPromos/views/CouponDetailModal.view.native';
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
      commonLabels,
      coupons,
      onViewCouponDetails,
      onApplyCouponToBagFromList,
      toastMessage,
      onRemove,
      isApplyingOrRemovingCoupon,
    } = this.props;
    const isApplyingCoupon = !!coupons.find(
      coupon => coupon.status === COUPON_STATUS.APPLYING || coupon.status === COUPON_STATUS.REMOVING
    );
    return (
      <DetailedCouponTile
        key={item.id}
        labels={commonLabels}
        coupon={item}
        onViewCouponDetails={onViewCouponDetails}
        onApplyCouponToBagFromList={onApplyCouponToBagFromList}
        toastMessage={toastMessage}
        onRemove={onRemove}
        isDisabled={isApplyingOrRemovingCoupon || isApplyingCoupon}
        className="elem-mb-LRG"
      />
    );
  };

  render() {
    const {
      labels,
      showLink,
      navigation,
      coupons,
      couponsLabels,
      selectedCoupon,
      ...otherProps
    } = this.props;
    const heading = `${getLabelValue(labels, 'lbl_my_rewards_heading', 'placeRewards')} (${
      coupons.size
    })`;
    const isSelected = selectedCoupon !== null;
    return (
      <View>
        <ToastContainer />
        {selectedCoupon && (
          <CouponDetailModal
            labels={couponsLabels}
            openState={isSelected}
            coupon={selectedCoupon}
            {...otherProps}
          />
        )}
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
          <EmptyRewards navigation={navigation} labels={labels} />
        )}
        {showLink && (
          <StyledAnchorWrapper>
            <Anchor
              fontSizeVariation="medium"
              underline
              onPress={() => {
                UrlHandler(endpoints.myPlaceRewardsPage);
              }}
              anchorVariation="primary"
              dataLocator="my-rewards-program-details"
              text={getLabelValue(labels, 'lbl_my_rewards_program_details', 'placeRewards')}
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
                text={getLabelValue(labels, 'lbl_common_tnc', 'placeRewards')}
              />
            </AnchorLeftMargin>
          </StyledAnchorWrapper>
        )}
      </View>
    );
  }
}

MyRewards.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  commonLabels: PropTypes.shape({}),
  coupons: PropTypes.shape([]),
  onViewCouponDetails: PropTypes.func,
  onApplyCouponToBagFromList: PropTypes.func,
  onRemove: PropTypes.func,
  toastMessage: PropTypes.func,
  isApplyingOrRemovingCoupon: PropTypes.bool,
  showLink: PropTypes.bool,
  selectedCoupon: PropTypes.shape({}),
  couponsLabels: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
};

MyRewards.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_rewards_program_details: '',
      lbl_my_rewards_heading: '',
      lbl_common_tnc: '',
    },
  },
  commonLabels: {},
  coupons: [],
  onViewCouponDetails: () => {},
  onApplyCouponToBagFromList: () => {},
  onRemove: () => {},
  toastMessage: () => {},
  isApplyingOrRemovingCoupon: false,
  showLink: false,
  selectedCoupon: {},
  couponsLabels: {},
  navigation: {},
};

export default MyRewards;
