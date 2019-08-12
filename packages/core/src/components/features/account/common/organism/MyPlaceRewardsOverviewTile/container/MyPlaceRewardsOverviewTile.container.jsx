import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCouponList } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import { getAllRewardsCoupons } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyPlaceRewardsOverviewTileComponent from '../views';


export class MyPlaceRewardsOverviewTile extends React.PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  render(){
    return <MyPlaceRewardsOverviewTileComponent {...this.props} />
  }
}

const mapStateToProps = state => ({
  coupons: getAllRewardsCoupons(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCoupons: () => {
    dispatch(getCouponList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaceRewardsOverviewTile);
