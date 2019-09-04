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
  getCouponsLabels,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import MyRewards from '../views';
import CouponDetailModal from '../../../../../CnC/common/organism/CouponAndPromos/views/CouponDetailModal.view';

export class MyRewardsContainer extends PureComponent {

  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
    view: PropTypes.string,
    coupons: PropTypes.shape([]).isRequired,
    rewardCoupons: PropTypes.shape([]).isRequired,
    couponsLabels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    view: 'reward',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCoupon: null,
    };
  }

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  /**
   * This function use for view coupon details for popup modal
   * can be passed in the component.
   * @param coupon - this is coupon data used for show coupon details
   */
  onViewCouponDetails = coupon => {
    this.setState({
      selectedCoupon: coupon,
    });
  };

  render() {
    const { coupons, rewardCoupons, couponsLabels, view, ...otherProps } = this.props;
    const { selectedCoupon } = this.state;

    return (
      <>
        <MyRewards
          coupons={view === 'reward' ? rewardCoupons : coupons}
          view={view}
          onViewCouponDetails={this.onViewCouponDetails}
          {...otherProps}
        />
        {selectedCoupon && (
          <CouponDetailModal
            labels={couponsLabels}
            openState={selectedCoupon}
            coupon={selectedCoupon}
            onRequestClose={() => {
              this.setState({
                selectedCoupon: null,
              });
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  coupons: getAllCoupons(state),
  rewardCoupons: getAllRewardsCoupons(state),
  couponsLabels: getCouponsLabels(state),
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
