import React from 'react';
import { connect } from 'react-redux';
import { getCouponList } from './Coupon.actions';
import {
  getAppliedCouponListState,
  getAvailableCouponListState,
  getCouponListFetchingState,
} from './Coupon.selectors';
import Coupon from '../views/Coupon.view';
import labels from './Coupon.labels';

export class CouponContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCouponListAction } = this.props;
    getCouponListAction();
  }

  render() {
    const { appliedCouponList, availableCouponList } = this.props;
    return (
      <React.Fragment>
        <Coupon
          labels={labels}
          appliedCouponList={appliedCouponList}
          availableCouponList={availableCouponList}
        />
      </React.Fragment>
    );
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
    appliedCouponList: getAppliedCouponListState(state),
    availableCouponList: getAvailableCouponListState(state),
    isFetching: getCouponListFetchingState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponContainer);
