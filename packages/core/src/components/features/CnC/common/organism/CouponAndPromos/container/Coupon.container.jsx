import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { applyCoupon, removeCoupon, setError } from './Coupon.actions';
import {
  getCouponFetchingState,
  getCouponsLabels,
  getAppliedCouponListState,
  getAvailableCouponListState,
  getNeedHelpContent,
  getAllCoupons,
} from './Coupon.selectors';
import { getGlobalLabels } from '../../../../../account/Account/container/Account.selectors';
import Coupon from '../views/Coupon.view';
import MyOffersCoupons from '../../../../../account/common/organism/MyOffersCoupons/views/MyOffersCoupons.view';

export class CouponContainer extends React.PureComponent {
  render() {
    const {
      labels,
      commonLabels,
      isFetching,
      handleApplyCoupon,
      handleApplyCouponFromList,
      handleRemoveCoupon,
      appliedCouponList,
      availableCouponList,
      allCouponList,
      needHelpRichText,
      handleErrorCoupon,
      isCheckout,
      showAccordian,
      isCarouselView,
      closedOverlay,
      idPrefix,
      additionalClassNameModal,
    } = this.props;
    const updateLabels = { ...labels, NEED_HELP_RICH_TEXT: needHelpRichText };
    return (
      <>
        {!isCarouselView && (
          <Coupon
            labels={updateLabels}
            isCheckout={isCheckout}
            isFetching={isFetching}
            handleApplyCoupon={handleApplyCoupon}
            handleApplyCouponFromList={handleApplyCouponFromList}
            handleRemoveCoupon={handleRemoveCoupon}
            appliedCouponList={appliedCouponList}
            availableCouponList={availableCouponList}
            handleErrorCoupon={handleErrorCoupon}
            showAccordian={showAccordian}
            additionalClassNameModal={additionalClassNameModal}
            idPrefix={idPrefix}
          />
        )}

        {isCarouselView && (
          <MyOffersCoupons
            labels={updateLabels}
            commonLabels={commonLabels}
            isCheckout={isCheckout}
            isFetching={isFetching}
            handleApplyCoupon={handleApplyCoupon}
            handleApplyCouponFromList={handleApplyCouponFromList}
            handleRemoveCoupon={handleRemoveCoupon}
            allCouponList={allCouponList}
            handleErrorCoupon={handleErrorCoupon}
            showAccordian={showAccordian}
            sliceCount={10}
            additionalClassNameModal={additionalClassNameModal}
            isCarouselView={isCarouselView}
            closedOverlay={closedOverlay}
          />
        )}
      </>
    );
  }
}

CouponContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isCheckout: PropTypes.bool.isRequired,
  labels: PropTypes.shape.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleApplyCouponFromList: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape({}).isRequired,
  availableCouponList: PropTypes.shape({}).isRequired,
  showAccordian: PropTypes.bool.isRequired,
  additionalClassNameModal: PropTypes.string.isRequired,
  commonLabels: PropTypes.shape({}).isRequired,
  allCouponList: PropTypes.shape([]).isRequired,
  needHelpRichText: PropTypes.string.isRequired,
  handleErrorCoupon: PropTypes.func.isRequired,
  isCarouselView: PropTypes.bool,
  closedOverlay: PropTypes.func,
  idPrefix: PropTypes.string,
};

CouponContainer.defaultProps = {
  closedOverlay: () => {},
  isCarouselView: false,
  idPrefix: '',
};

export const mapDispatchToProps = (dispatch, { fullPageInfo }) => ({
  handleApplyCouponFromList: coupon => {
    return new Promise((resolve, reject) => {
      dispatch(
        applyCoupon({
          fullPageInfo,
          formData: { couponCode: coupon.id },
          formPromise: { resolve, reject },
          coupon,
        })
      );
    });
  },
  handleRemoveCoupon: coupon => {
    return new Promise((resolve, reject) => {
      dispatch(
        removeCoupon({
          coupon,
          fullPageInfo,
          formPromise: { resolve, reject },
        })
      );
    });
  },
  handleApplyCoupon: (formData, _, props) =>
    new Promise((resolve, reject) => {
      dispatch(
        applyCoupon({
          formData,
          fullPageInfo,
          source: props && props.source,
          formPromise: { resolve, reject },
        })
      );
    }),
  handleErrorCoupon: coupon => {
    setTimeout(() => {
      dispatch(setError({ msg: null, couponCode: coupon.id }));
    }, 5000);
  },
});

export const mapStateToProps = state => ({
  isFetching: getCouponFetchingState(state),
  labels: getCouponsLabels(state),
  appliedCouponList: getAppliedCouponListState(state),
  availableCouponList: getAvailableCouponListState(state),
  allCouponList: getAllCoupons(state),
  needHelpRichText: getNeedHelpContent(state),
  commonLabels: getGlobalLabels(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponContainer);
