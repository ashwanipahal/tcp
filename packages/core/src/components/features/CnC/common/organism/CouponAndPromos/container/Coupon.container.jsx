import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { applyCoupon } from './Coupon.actions';
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
      appliedCouponList,
      availableCouponList,
      needHelpRichText,
    } = this.props;

    const updateLabels = { ...labels, NEED_HELP_RICH_TEXT: needHelpRichText };
    return (
      <Coupon
        labels={updateLabels}
        isFetching={isFetching}
        handleApplyCoupon={handleApplyCoupon}
        appliedCouponList={appliedCouponList}
        availableCouponList={availableCouponList}
      />
    );
  }
}

CouponContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  labels: PropTypes.shape.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape({}).isRequired,
  availableCouponList: PropTypes.shape({}).isRequired,
};

export const mapDispatchToProps = dispatch => ({
  handleApplyCoupon: formData =>
    new Promise((resolve, reject) => {
      dispatch(applyCoupon({ formData, formPromise: { resolve, reject } }));
    }),
});

const mapStateToProps = state => ({
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
