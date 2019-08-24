import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../styles/MyRewards.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import Anchor from '../../../../../../common/atoms/Anchor';
import DetailedCouponTile from '../../../molecule/DetailedCouponTile';
import EmptyRewards from '../../../molecule/EmptyRewards';
import { COUPON_STATUS } from '../../../../../../../services/abstractors/CnC/CartItemTile';

const MyRewards = ({
  labels,
  className,
  coupons,
  onViewCouponDetails,
  onApplyCouponToBag,
  onRemove,
  isApplyingOrRemovingCoupon,
  isMobile,
}) => {
  const heading = `${labels.myPlaceRewards.lbl_my_rewards_heading} (${coupons.size})`;
  const isApplyingCoupon = !!coupons.find(
    coupon => coupon.status === COUPON_STATUS.APPLYING || coupon.status === COUPON_STATUS.REMOVING
  );
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
        >
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            className="my-rewards-heading"
            data-locator="my-rewards-heading"
          >
            {heading}
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
          ignoreGutter={{
            small: true,
            medium: true,
            large: true,
          }}
        >
          {coupons.size > 0 ? (
            <BodyCopy component="div" className="rewards-container elem-mb-XXL">
              {coupons.map(coupon => {
                return (
                  <DetailedCouponTile
                    key={coupon.id}
                    labels={labels.common}
                    coupon={coupon}
                    onViewCouponDetails={onViewCouponDetails}
                    onApplyCouponToBag={onApplyCouponToBag}
                    onRemove={onRemove}
                    isDisabled={isApplyingOrRemovingCoupon || isApplyingCoupon}
                    isMobile={isMobile}
                    className="elem-mb-LRG"
                  />
                );
              })}
            </BodyCopy>
          ) : (
            <EmptyRewards labels={labels} />
          )}
        </Col>

        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
          className="anchor-wrapper"
        >
          <Anchor
            fontSizeVariation="medium"
            underline
            noLink
            href="https://www.childrensplace.com/us/content/myplace-rewards-page"
            anchorVariation="primary"
            data-locator="my-rewards-program-details"
            target="_blank"
          >
            {labels.myPlaceRewards.ACC_LBL_MY_REWARDS_PROGRAM_DETAILS}
          </Anchor>
          <Anchor
            fontSizeVariation="medium"
            underline
            noLink
            href="https://www.childrensplace.com/us/help-center/#termsAndConditionsli"
            anchorVariation="primary"
            data-locator="my-rewards-tnc"
            className="elem-ml-XXL"
            target="_self"
          >
            {labels.common.lbl_common_tnc}
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};

MyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, myPlaceRewards: {} }),
  className: PropTypes.string,
  coupons: PropTypes.shape([]),
  onViewCouponDetails: PropTypes.func,
  onApplyCouponToBag: PropTypes.func,
  onRemove: PropTypes.func,
  isApplyingOrRemovingCoupon: PropTypes.bool,
  isMobile: PropTypes.bool,
};

MyRewards.defaultProps = {
  labels: {
    common: { lbl_common_tnc: '' },
    myPlaceRewards: {
      ACC_LBL_MY_REWARDS_PROGRAM_DETAILS: '',
      ACC_LBL_MY_REWARDS_SHOP_NOW: '',
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: '',
      ACC_LBL_MY_REWARDS_HEADING: '',
    },
  },
  className: '',
  coupons: [],
  onViewCouponDetails: () => {},
  onApplyCouponToBag: () => {},
  onRemove: () => {},
  isApplyingOrRemovingCoupon: false,
  isMobile: true,
};

export default withStyles(MyRewards, styles);
export { MyRewards as MyRewardsVanilla };
