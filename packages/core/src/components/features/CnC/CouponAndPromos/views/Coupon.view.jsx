import React from 'react';
import PropTypes from 'prop-types';
import CouponListSection from '../organism/CouponListSection';

const CouponView = ({ labels, appliedCouponList, availableCouponList }) => {
  return (
    <React.Fragment>
      {appliedCouponList && (
        <CouponListSection
          labels={labels}
          couponList={appliedCouponList}
          className="applied_coupon"
          heading={labels.APPLIED_REWARDS_HEADING}
        />
      )}
      {availableCouponList && (
        <CouponListSection
          labels={labels}
          couponList={availableCouponList}
          className="available_coupon"
          heading={labels.AVAILABLE_REWARDS_HEADING}
          helpSubHeading="true"
        />
      )}
    </React.Fragment>
  );
};

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
};

export default CouponView;
