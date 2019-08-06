import React from 'react';
import PropTypes from 'prop-types';
import CouponListSection from '../organism/CouponListSection';
import CouponDetailModal from './CouponDetailModal.view';

class CouponView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }

  couponDetailClick = selectedCoupon => {
    console.log('selectedCoupon', selectedCoupon);
    this.setState({
      status: true,
    });
  };

  render() {
    const { labels, appliedCouponList, availableCouponList } = this.props;
    const { status } = this.state;
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
          data={{
            heading: 'heading',
            title: 'title1',
            description: 'address',
            buttons: {
              cancel: 'cancle',
              confirm: 'confim',
            },
          }}
          setDeleteModalMountState={state => {
            console.log('state', state);
          }}
          labels={labels}
          onDeleteAddress={() => {}}
          showUpdatedNotificationOnModal={() => {}}
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
