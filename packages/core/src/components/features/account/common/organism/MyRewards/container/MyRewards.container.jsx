import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCouponList,
  applyCoupon,
  removeCoupon,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import {
  getAllCoupons,
  getAllRewardsCoupons,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyRewards from '../views';

export class MyRewardsContainer extends PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
    view: PropTypes.string,
    coupons: PropTypes.shape([]).isRequired,
    rewardCoupons: PropTypes.shape([]).isRequired,
  };

  static defaultProps = {
    view: 'reward',
  };

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  render() {
    const { coupons, rewardCoupons, view, ...otherProps } = this.props;
    return <MyRewards coupons={view === 'reward' ? rewardCoupons : coupons} {...otherProps} />;
  }
}

const mapStateToProps = state => ({
  coupons: getAllCoupons(state),
  rewardCoupons: getAllRewardsCoupons(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCoupons: () => {
    dispatch(getCouponList());
  },
  onApplyCouponToBag: payload => {
    dispatch(applyCoupon(payload));
  },
  onRemove: payload => {
    dispatch(removeCoupon(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRewardsContainer);
