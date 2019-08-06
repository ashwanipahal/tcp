import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CouponListSection from '../../../../common/organisms/CouponListSection';
import CouponDetailModal from './CouponDetailModal.view';
import styles from '../styles/Coupon.style';

class CouponView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      selectedCoupon: {},
    };
  }

  couponDetailClick = coupon => {
    this.setState({
      status: true,
      selectedCoupon: coupon,
    });
  };

  render() {
    const { labels, appliedCouponList, availableCouponList, className } = this.props;
    const { status, selectedCoupon } = this.state;
    return (
      <div className={className}>
        {appliedCouponList && (
          <CouponListSection
            labels={labels}
            couponList={appliedCouponList}
            className="applied_coupon"
            heading={labels.APPLIED_REWARDS_HEADING}
            couponDetailClick={this.couponDetailClick}
          />
        )}
        {availableCouponList && (
          <CouponListSection
            labels={labels}
            couponList={availableCouponList}
            className="available_coupon"
            heading={labels.AVAILABLE_REWARDS_HEADING}
            helpSubHeading="true"
            couponDetailClick={this.couponDetailClick}
          />
        )}
        <CouponDetailModal
          labels={labels}
          openState={status}
          coupon={selectedCoupon}
          onRequestClose={() => {
            this.setState({
              status: false,
            });
          }}
          applyToBag={() => {}}
        />
      </div>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
};

export default withStyles(CouponView, styles);
