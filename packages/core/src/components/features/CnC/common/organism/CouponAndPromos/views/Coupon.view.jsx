import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CouponListSection from '../../../../../../common/organisms/CouponListSection';
import CouponDetailModal from './CouponDetailModal.view';
import CouponHelpModal from './CouponHelpModal.view';
import CouponForm from '../../../molecules/CouponForm';
import styles from '../styles/Coupon.style';

class CouponView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      detailStatus: false,
      helpStatus: false,
      selectedCoupon: {},
    };
  }

  couponDetailClick = coupon => {
    this.setState({
      detailStatus: true,
      selectedCoupon: coupon,
    });
  };

  helpAnchorClick = () => {
    this.setState({
      helpStatus: true,
    });
  };

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
    const { detailStatus, helpStatus, selectedCoupon } = this.state;
    return (
      <div className={className}>
        <CouponForm onSubmit={handleApplyCoupon} isFetching={isFetching} />
        <div className="coupon_list">
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
          <CouponDetailModal
            labels={labels}
            openState={detailStatus}
            coupon={selectedCoupon}
            onRequestClose={() => {
              this.setState({
                detailStatus: false,
              });
            }}
            applyToBag={handleApplyCouponFromList}
          />
          <CouponHelpModal
            labels={labels}
            openState={helpStatus}
            coupon={selectedCoupon}
            onRequestClose={() => {
              this.setState({
                helpStatus: false,
              });
            }}
            heading="Help Modal"
          />
        </div>
      </div>
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
