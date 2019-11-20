import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAllCoupons,
  getCouponFetchingState,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyWalletTileComponent from '../views';
import MyWalletTileSkelton from '../skelton/MyWalletTileSkelton.view';

export class MyWalletTile extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool,
  };

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return <MyWalletTileSkelton />;
    }
    return <MyWalletTileComponent {...this.props} />;
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

export default connect(
  mapStateToProps,
  null
)(MyWalletTile);
