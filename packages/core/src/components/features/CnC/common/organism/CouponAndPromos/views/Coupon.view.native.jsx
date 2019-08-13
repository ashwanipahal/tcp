import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import { styles, WrapperStyle, CouponListContainer } from '../styles/Coupon.style.native';
import CouponForm from '../../../molecules/CouponForm';
import CouponListSection from '../../../../../../common/organisms/CouponListSection';

class CouponView extends React.PureComponent {
  render() {
    const {
      isFetching,
      labels,
      handleApplyCoupon,
      handleApplyCouponFromList,
      appliedCouponList,
      availableCouponList,
      className,
      handleRemoveCoupon,
    } = this.props;
    return (
      <WrapperStyle>
        <CouponForm onSubmit={handleApplyCoupon} source="form" />
        <CouponListContainer>
          {appliedCouponList && (
            <CouponListSection
              labels={labels}
              couponList={appliedCouponList}
              className="applied_coupon"
              heading={labels.APPLIED_REWARDS_HEADING}
              couponDetailClick={this.couponDetailClick}
              onRemove={handleRemoveCoupon}
              dataLocator="coupon-cartAppliedRewards"
            />
          )}
          {availableCouponList && (
            <CouponListSection
              labels={labels}
              couponList={availableCouponList}
              className="available_coupon"
              heading={labels.AVAILABLE_REWARDS_HEADING}
              helpSubHeading="true"
              couponDetailClick={this.couponDetailClick}
              helpAnchorClick={this.helpAnchorClick}
              onApply={handleApplyCouponFromList}
              dataLocator="coupon-cartAvaliableRewards"
            />
          )}
        </CouponListContainer>
      </WrapperStyle>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
};

export default withStyles(CouponView, styles);
export { CouponView as CouponViewVanilla };
