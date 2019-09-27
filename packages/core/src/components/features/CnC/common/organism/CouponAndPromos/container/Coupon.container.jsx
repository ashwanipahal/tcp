import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { applyCoupon, removeCoupon, setError } from './Coupon.actions';
import {
  getCouponFetchingState,
  getCouponsLabels,
  getAppliedCouponListState,
  getAvailableCouponListState,
  getNeedHelpContent,
} from './Coupon.selectors';
import Coupon from '../views/Coupon.view';

export class CouponContainer extends React.PureComponent<Props> {
  render() {
    const {
      labels,
      isFetching,
      handleApplyCoupon,
      handleApplyCouponFromList,
      handleRemoveCoupon,
      appliedCouponList,
      availableCouponList,
      needHelpRichText,
      handleErrorCoupon,
      isCheckout,
      showAccordian,
      additionalClassNameModal,
    } = this.props;
    const updateLabels = { ...labels, NEED_HELP_RICH_TEXT: needHelpRichText };
    return (
      <Coupon
        labels={updateLabels}
        isCheckout={isCheckout}
        isFetching={isFetching}
        handleApplyCoupon={handleApplyCoupon}
        handleApplyCouponFromList={handleApplyCouponFromList}
        handleRemoveCoupon={handleRemoveCoupon}
        appliedCouponList={appliedCouponList}
        availableCouponList={availableCouponList}
        handleErrorCoupon={handleErrorCoupon}
        showAccordian={showAccordian}
        additionalClassNameModal={additionalClassNameModal}
      />
    );
  }
}

CouponContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isCheckout: PropTypes.bool.isRequired,
  labels: PropTypes.shape.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleApplyCouponFromList: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape({}).isRequired,
  availableCouponList: PropTypes.shape({}).isRequired,
  showAccordian: PropTypes.bool.isRequired,
  additionalClassNameModal: PropTypes.string.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  handleApplyCouponFromList: coupon => {
    return new Promise((resolve, reject) => {
      dispatch(
        applyCoupon({
          formData: { couponCode: coupon.id },
          formPromise: { resolve, reject },
          coupon,
        })
      );
    });
  },
  handleRemoveCoupon: coupon => {
    return new Promise((resolve, reject) => {
      dispatch(removeCoupon({ coupon, formPromise: { resolve, reject } }));
    });
  },
  handleApplyCoupon: (formData, _, props) =>
    new Promise((resolve, reject) => {
      dispatch(
        applyCoupon({ formData, source: props && props.source, formPromise: { resolve, reject } })
      );
    }),
  handleErrorCoupon: coupon => {
    setTimeout(() => {
      dispatch(setError({ msg: null, couponCode: coupon.id }));
    }, 5000);
  },
});

export const mapStateToProps = state => ({
  isFetching: getCouponFetchingState(state),
  labels: getCouponsLabels(state),
  appliedCouponList: getAppliedCouponListState(state),
  availableCouponList: getAvailableCouponListState(state),
  needHelpRichText: getNeedHelpContent(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponContainer);
