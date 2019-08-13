import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { List } from 'immutable';
import { applyCoupon, removeCoupon, setError } from './Coupon.actions';
import {
  getCouponFetchingState,
  getCouponsLabels,
  getAppliedCouponListState,
  getAvailableCouponListState,
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
      handleErrorCoupon,
    } = this.props;

    const appliedCouponListTwo = List([
      ...availableCouponList,
      {
        id: 'Y00105578',
        status: 'applied',
        labelStatus: 'REMOVE',
        isExpiring: true,
        title: '$20 OFF On $50',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$10 OFF On $50',
        isStarted: true,
        offerType: 'saving',
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
      },
    ]);

    const availableCouponListTwo = List([
      ...availableCouponList,
      {
        id: 'Y00105578',
        status: 'available',
        labelStatus: 'APPLY',
        isExpiring: true,
        title: '$20 OFF On $50',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$10 OFF On $50',
        isStarted: true,
        offerType: 'saving',
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
      },
      {
        id: 'Y00105578',
        status: 'available',
        labelStatus: 'APPLY',
        isExpiring: true,
        title: '$10 OFF On $50',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$10 OFF On $50',
        isStarted: true,
        offerType: 'saving',
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
      },
    ]);
    return (
      <Coupon
        labels={labels}
        isFetching={isFetching}
        handleApplyCoupon={handleApplyCoupon}
        handleApplyCouponFromList={handleApplyCouponFromList}
        handleRemoveCoupon={handleRemoveCoupon}
        appliedCouponList={appliedCouponListTwo}
        availableCouponList={availableCouponListTwo}
        handleErrorCoupon={handleErrorCoupon}
      />
    );
  }
}

CouponContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  labels: PropTypes.shape.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleApplyCouponFromList: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape({}).isRequired,
  availableCouponList: PropTypes.shape({}).isRequired,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponContainer);
