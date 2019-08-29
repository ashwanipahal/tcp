import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Anchor from '../../../../../../common/atoms/Anchor';
import styles from '../styles/MyRewards.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import DetailedCouponTile from '../../../molecule/DetailedCouponTile';
import EmptyRewards from '../../../molecule/EmptyRewards';
import EmptyWalletRewards from '../../../molecule/EmptyWalletRewards';
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
  view,
  showLink,
}) => {
  const heading =
    view === 'all'
      ? `${labels.myPlaceRewards.lbl_my_rewards_wallet_heading} (${coupons.size})`
      : `${labels.myPlaceRewards.lbl_my_rewards_heading} (${coupons.size})`;
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
                    view={view}
                    className="elem-mb-LRG"
                  />
                );
              })}
            </BodyCopy>
          ) : (
            <>
              {view === 'all' ? (
                <EmptyWalletRewards labels={labels} />
              ) : (
                <EmptyRewards labels={labels} />
              )}
            </>
          )}
        </Col>
        {showLink && (
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
              dataLocator="my-rewards-program-details"
              target="_blank"
            >
              {labels.myPlaceRewards.lbl_my_rewards_program_details}
            </Anchor>
            <Anchor
              fontSizeVariation="medium"
              underline
              noLink
              href="https://www.childrensplace.com/us/help-center/#termsAndConditionsli"
              anchorVariation="primary"
              dataLocator="my-rewards-tnc"
              className="elem-ml-XXL"
              target="_self"
            >
              {labels.common.lbl_common_tnc}
            </Anchor>
          </Col>
        )}
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
  view: PropTypes.string,
  showLink: PropTypes.bool,
};

MyRewards.defaultProps = {
  labels: {
    common: { lbl_common_tnc: '' },
    myPlaceRewards: {
      lbl_my_rewards_program_details: '',
      lbl_my_rewards_shop_now: '',
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
  view: '',
  showLink: false,
};

export default withStyles(MyRewards, styles);
export { MyRewards as MyRewardsVanilla };
