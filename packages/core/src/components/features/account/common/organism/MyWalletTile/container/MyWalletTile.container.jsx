import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCouponList } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import {
  getAllCoupons,
  getCouponFetchingState,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyWalletTileComponent from '../views';
import MyWalletTileSkelton from '../skelton/MyWalletTileSkelton.view';

export class MyWalletTile extends PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
  };

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  render() {
    const { isFetching } = this.props;

    return !isFetching ? <MyWalletTileComponent {...this.props} /> : <MyWalletTileSkelton />;
  }
}

MyWalletTile.propTypes = {
  isFetching: PropTypes.bool,
};

MyWalletTile.defaultProps = {
  isFetching: false,
};

const mapStateToProps = state => ({
  coupons: getAllCoupons(state),
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
)(MyWalletTile);
