import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCouponList } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import { getAllRewardsCoupons } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyPlaceRewardsOverviewTileComponent from '../views';
import { getBrierleySwitch } from './MyPlaceRewardsOverviewTile.selectors';

export class MyPlaceRewardsOverviewTile extends PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  render() {
    return <MyPlaceRewardsOverviewTileComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  coupons: getAllRewardsCoupons(state),
  isBrierleyEnabled: getBrierleySwitch(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCoupons: () => {
    dispatch(getCouponList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPlaceRewardsOverviewTile);
