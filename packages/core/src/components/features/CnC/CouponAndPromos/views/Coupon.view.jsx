import React from 'react';
import PropTypes from 'prop-types';
import CouponListSection from '../../../../common/organisms/CouponListSection';
import CouponDetailModal from './CouponDetailModal.view';

class CouponView extends React.Component<Props> {
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
    const { labels, appliedCouponList, availableCouponList } = this.props;
    const { status, selectedCoupon } = this.state;
    return (
      <React.Fragment>
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
          openState={status}
          heading="heading"
          selectedCoupon={selectedCoupon}
          onRequestClose={() => {
            this.setState({
              status: false,
            });
          }}
          labels={labels}
        />
      </React.Fragment>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
};

export default CouponView;
