import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import CouponIcon from '@tcp/core/src/components/features/account/common/molecule/CouponIcon';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  CouponTileSection,
  CouponWrapper,
  CouponInfo,
  TitleWrapper,
} from '../styles/CouponTile.style.native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

export const CouponTile = ({ coupon, commonLabels, labels }) => {
  return (
    <CouponTileSection>
      <CouponWrapper>
        <CouponIcon coupon={coupon} labels={commonLabels} />
        <CouponInfo>
          <TitleWrapper>
            <BodyCopy
              fontSize="fs10"
              fontWeight="black"
              title={coupon.title}
              data-locator="accountoverview-myplacerewatdstile-rewardvalue"
              text={coupon.title}
            />
          </TitleWrapper>
          {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH && (
            <BodyCopy
              fontSize="fs10"
              data-locator="accountoverview-myplacerewatdstile-rewarduseby"
              text={`${getLabelValue(labels, 'lbl_overview_couponValid')} ${
                coupon.effectiveDate
              } - ${coupon.expirationDate}`}
            />
          )}

          {coupon.offerType !== COUPON_REDEMPTION_TYPE.PLACECASH && (
            <BodyCopy
              fontSize="fs10"
              data-locator="accountoverview-myplacerewatdstile-rewarduseby"
              text={`${getLabelValue(labels, 'lbl_overview_couponUseBy')} ${coupon.expirationDate}`}
            />
          )}
        </CouponInfo>
      </CouponWrapper>
    </CouponTileSection>
  );
};

CouponTile.propTypes = {
  coupon: PropTypes.shape({
    offerType: PropTypes.string,
    expirationDate: PropTypes.string,
    title: PropTypes.string,
    effectiveDate: PropTypes.string,
  }).isRequired,
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsCouponType: PropTypes.string,
    lbl_overview_myPlaceRewardsUseBy: PropTypes.string,
    lbl_overview_couponTypePlacecash: PropTypes.string,
    lbl_overview_couponTypeReward: PropTypes.string,
    lbl_overview_couponTypeSaving: PropTypes.string,
    lbl_overview_couponValid: PropTypes.string,
    lbl_overview_couponUseBy: PropTypes.string,
  }),
  commonLabels: PropTypes.shape({}),
};

CouponTile.defaultProps = {
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsCouponType: '',
    lbl_overview_myPlaceRewardsUseBy: '',
    lbl_overview_couponTypePlacecash: '',
    lbl_overview_couponTypeReward: '',
    lbl_overview_couponTypeSaving: '',
    lbl_overview_couponValid: '',
    lbl_overview_couponUseBy: '',
  }),
  commonLabels: {},
};

export default CouponTile;
