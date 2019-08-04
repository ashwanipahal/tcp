import React from 'react';
import { connect } from 'react-redux';
import { getCouponList } from './Coupon.actions';
import { getCouponListState, getCouponListFetchingState } from './Coupon.selectors';
import Coupon from '../views/Coupon.view';
import labels from './Coupon.labels';

export class CouponContainer extends React.Component<Props> {
  getCouponList = () => {};

  render() {
    return <Coupon labels={labels} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCouponListAction: () => {
      dispatch(getCouponList());
    },
  };
};

const mapStateToProps = state => {
  return {
    couponList: getCouponListState(state),
    isFetching: getCouponListFetchingState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponContainer);
