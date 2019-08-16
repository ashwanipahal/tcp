import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCouponList } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import { getAllCoupons } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyWalletTileComponent from '../views';

export class MyWalletTile extends PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  render() {
    return <MyWalletTileComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  coupons: getAllCoupons(state),
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
