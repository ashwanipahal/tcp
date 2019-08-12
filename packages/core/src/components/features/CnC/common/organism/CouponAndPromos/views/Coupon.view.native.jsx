import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles';
import { styles, WrapperStyle } from '../styles/Coupon.style.native';
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
    console.log('availableCouponList', availableCouponList);
    return (
      <WrapperStyle>
        <CouponForm onSubmit={handleApplyCoupon} source="form" />;
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
