import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/MyRewards.style';
import DetailedCouponTile from '../../../molecule/DetailedCouponTile';
import EmptyRewards from '../../../molecule/EmptyRewards';
import EmptyWalletRewards from '../../../molecule/EmptyWalletRewards';
import { COUPON_STATUS } from '../../../../../../../services/abstractors/CnC/CartItemTile';

const MyRewards = ({
  labels,
  commonLabels,
  className,
  coupons,
  onViewCouponDetails,
  onApplyCouponToBagFromList,
  onRemove,
  isApplyingOrRemovingCoupon,
  handleErrorCoupon,
  isMobile,
  view,
  showLink,
}) => {
  const heading =
    view === 'all'
      ? `${getLabelValue(labels, 'lbl_my_rewards_wallet_heading', 'placeRewards')} (${
          coupons.size
        })`
      : `${getLabelValue(labels, 'lbl_my_rewards_heading', 'placeRewards')} (${coupons.size})`;
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
                    labels={commonLabels}
                    coupon={coupon}
                    onViewCouponDetails={onViewCouponDetails}
                    onApplyCouponToBagFromList={onApplyCouponToBagFromList}
                    onRemove={onRemove}
                    handleErrorCoupon={handleErrorCoupon}
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
              {getLabelValue(labels, 'lbl_my_rewards_program_details', 'placeRewards')}
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
              {getLabelValue(labels, 'lbl_common_tnc', 'placeRewards')}
            </Anchor>
          </Col>
        )}
      </Row>
    </div>
  );
};

MyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, placeRewards: {} }),
  commonLabels: PropTypes.shape({}),
  className: PropTypes.string,
  coupons: PropTypes.shape([]),
  onViewCouponDetails: PropTypes.func,
  onRemove: PropTypes.func,
  onApplyCouponToBagFromList: PropTypes.func,
  handleErrorCoupon: PropTypes.func,
  isApplyingOrRemovingCoupon: PropTypes.bool,
  isMobile: PropTypes.bool,
  view: PropTypes.string,
  showLink: PropTypes.bool,
};

MyRewards.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_rewards_program_details: '',
      lbl_my_rewards_shop_now: '',
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: '',
      ACC_LBL_MY_REWARDS_HEADING: '',
      lbl_common_tnc: '',
    },
  },
  commonLabels: {},
  className: '',
  coupons: [],
  onViewCouponDetails: () => {},
  onRemove: () => {},
  onApplyCouponToBagFromList: () => {},
  handleErrorCoupon: () => {},
  isApplyingOrRemovingCoupon: false,
  isMobile: true,
  view: '',
  showLink: false,
};

export default withStyles(MyRewards, styles);
export { MyRewards as MyRewardsVanilla };
