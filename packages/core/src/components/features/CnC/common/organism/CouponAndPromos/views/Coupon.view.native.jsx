import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import { styles, WrapperStyle, CouponListContainer } from '../styles/Coupon.style.native';
import CouponForm from '../../../molecules/CouponForm';
import CouponListSection from '../../../../../../common/organisms/CouponListSection';
import CouponHelpModal from './CouponHelpModal.view';
import CouponDetailModal from './CouponDetailModal.view';

class CouponView extends React.PureComponent {
  state = {
    detailStatus: false,
    helpStatus: false,
    selectedCoupon: {},
  };

  couponDetailClick = coupon => {
    this.setState({
      detailStatus: true,
      selectedCoupon: coupon,
    });
  };

  toggleNeedHelpModal = () => {
    const { helpStatus } = this.state;
    this.setState({
      helpStatus: !helpStatus,
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
      handleRemoveCoupon,
      handleErrorCoupon,
    } = this.props;

    const { detailStatus, helpStatus, selectedCoupon } = this.state;

    return (
      <WrapperStyle>
        <CouponForm
          onSubmit={handleApplyCoupon}
          isFetching={isFetching}
          source="form"
          labels={labels}
          onNeedHelpTextClick={this.toggleNeedHelpModal}
        />
        <CouponListContainer>
          {appliedCouponList && (
            <CouponListSection
              labels={labels}
              isFetching={isFetching}
              couponList={appliedCouponList}
              className="applied_coupon"
              heading={labels.APPLIED_REWARDS_HEADING}
              couponDetailClick={this.couponDetailClick}
              onRemove={handleRemoveCoupon}
              dataLocator="coupon-cartAppliedRewards"
              handleErrorCoupon={handleErrorCoupon}
            />
          )}
          {availableCouponList && (
            <CouponListSection
              labels={labels}
              isFetching={isFetching}
              couponList={availableCouponList}
              className="available_coupon"
              heading={labels.AVAILABLE_REWARDS_HEADING}
              helpSubHeading="true"
              couponDetailClick={this.couponDetailClick}
              helpAnchorClick={this.toggleNeedHelpModal}
              onApply={handleApplyCouponFromList}
              dataLocator="coupon-cartAvaliableRewards"
              handleErrorCoupon={handleErrorCoupon}
            />
          )}
        </CouponListContainer>
        <CouponDetailModal
          labels={labels}
          openState={detailStatus}
          coupon={selectedCoupon}
          onRequestClose={() => {
            this.setState({
              detailStatus: false,
            });
          }}
        />
        <CouponHelpModal
          labels={labels}
          openState={helpStatus}
          onRequestClose={this.toggleNeedHelpModal}
        />
      </WrapperStyle>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleApplyCouponFromList: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
  handleErrorCoupon: PropTypes.func.isRequired,
};

export default withStyles(CouponView, styles);
export { CouponView as CouponViewVanilla };
