import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCouponList } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import {
  getAllRewardsCoupons,
  getCouponFetchingState,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyPlaceRewardsOverviewTileComponent from '../views';
import { getBrierleySwitch } from './MyPlaceRewardsOverviewTile.selectors';
import MyPlaceRewardsOverviewTileSkelton from '../skelton/MyPlaceRewardsOverviewTileSkelton.view';

export class MyPlaceRewardsOverviewTile extends PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return <MyPlaceRewardsOverviewTileSkelton />;
    }
    return <MyPlaceRewardsOverviewTileComponent {...this.props} />;
  }
}

MyPlaceRewardsOverviewTile.propTypes = {
  isFetching: PropTypes.bool,
};

MyPlaceRewardsOverviewTile.defaultProps = {
  isFetching: false,
};

const mapStateToProps = state => ({
  coupons: getAllRewardsCoupons(state),
  isBrierleyEnabled: getBrierleySwitch(state),
  isFetching: getCouponFetchingState(state),
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
