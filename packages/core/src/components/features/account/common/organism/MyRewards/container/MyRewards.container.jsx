import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CouponHelpModal from '@tcp/core/src/components/features/CnC/common/organism/CouponAndPromos/views/CouponHelpModal.view';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
import BagPageSelector from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import {
  getCouponList,
  applyCoupon,
  removeCoupon,
  setError,
  toggleNeedHelpModalState,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';

import {
  getAllCoupons,
  getAllRewardsCoupons,
  getCouponsLabels,
  getCouponFetchingState,
  getNeedHelpModalState,
  getNeedHelpContent,
} from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.selectors';
import { getCommonLabels } from '../../../../Account/container/Account.selectors';
import MyRewards from '../views';
import CouponDetailModal from '../../../../../CnC/common/organism/CouponAndPromos/views/CouponDetailModal.view';
import { toastMessageInfo } from '../../../../../../common/atoms/Toast/container/Toast.actions.native';
import { DEFAULT_TOAST_ERROR_MESSAGE_TTL } from '../../../../../../../config/site.config';

export class MyRewardsContainer extends PureComponent {
  static propTypes = {
    fetchCoupons: PropTypes.func.isRequired,
    view: PropTypes.string,
    coupons: PropTypes.shape([]).isRequired,
    rewardCoupons: PropTypes.shape([]).isRequired,
    couponsLabels: PropTypes.shape({}).isRequired,
    onApplyCouponToBagFromList: PropTypes.func,
    handleErrorCoupon: PropTypes.func,
    toastMessage: PropTypes.func,
    isApplyingOrRemovingCoupon: PropTypes.bool,
    isNeedHelpModalOpen: PropTypes.bool,
    toggleNeedHelpModal: PropTypes.func.isRequired,
    needHelpRichText: PropTypes.string,
    fetchNeedHelpContent: PropTypes.func.isRequired,
    needHelpContentId: PropTypes.string,
  };

  static defaultProps = {
    view: 'reward',
    onApplyCouponToBagFromList: () => { },
    handleErrorCoupon: () => { },
    toastMessage: () => { },
    isApplyingOrRemovingCoupon: false,
    isNeedHelpModalOpen: false,
    needHelpRichText: '',
    needHelpContentId: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCoupon: null,
    };
  }

  componentDidMount() {
    const { fetchCoupons, needHelpContentId, fetchNeedHelpContent } = this.props;
    fetchCoupons();
    fetchNeedHelpContent([needHelpContentId]);
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

  /**
   * This function use for close coupon details for popup modal
   * can be passed in the component.
   * @param coupon - this is coupon data used for show coupon details
   */
  onCloseCouponDetails = () => {
    this.setState({
      selectedCoupon: null,
    });
  };

  render() {
    const {
      coupons,
      rewardCoupons,
      couponsLabels,
      view,
      handleErrorCoupon,
      onApplyCouponToBagFromList,
      toastMessage,
      isApplyingOrRemovingCoupon,
      isNeedHelpModalOpen,
      toggleNeedHelpModal,
      needHelpRichText,
      ...otherProps
    } = this.props;
    const { selectedCoupon } = this.state;
    const updateLabels = { ...couponsLabels, NEED_HELP_RICH_TEXT: needHelpRichText };

    return (
      <>
        <MyRewards
          coupons={view === 'reward' ? rewardCoupons : coupons}
          view={view}
          onViewCouponDetails={this.onViewCouponDetails}
          onApplyCouponToBagFromList={onApplyCouponToBagFromList}
          handleErrorCoupon={handleErrorCoupon}
          toastMessage={toastMessage}
          selectedCoupon={selectedCoupon}
          couponsLabels={couponsLabels}
          onRequestClose={this.onCloseCouponDetails}
          isFetching={isApplyingOrRemovingCoupon}
          {...otherProps}
        />
        {selectedCoupon && (
          <CouponDetailModal
            labels={couponsLabels}
            openState={selectedCoupon}
            coupon={selectedCoupon}
            handleErrorCoupon={handleErrorCoupon}
            onRequestClose={this.onCloseCouponDetails}
            onApplyCouponToBagFromList={onApplyCouponToBagFromList}
          />
        )}
        <CouponHelpModal
          labels={updateLabels}
          openState={isNeedHelpModalOpen}
          coupon={selectedCoupon}
          onRequestClose={() => {
            this.props.toggleNeedHelpModal();
          }}
          heading="Help Modal"
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  coupons: getAllCoupons(state),
  commonLabels: getCommonLabels(state),
  rewardCoupons: getAllRewardsCoupons(state),
  couponsLabels: getCouponsLabels(state),
  isApplyingOrRemovingCoupon: getCouponFetchingState(state),
  isNeedHelpModalOpen: getNeedHelpModalState(state),
  needHelpRichText: getNeedHelpContent(state),
  needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
});

const analyticsData = {
  eventName: 'walletlinksclickevent',
  pageNavigationText: 'my account-my wallet-apply to bag',
};

export const mapDispatchToProps = dispatch => ({
  fetchCoupons: () => {
    dispatch(getCouponList());
  },
  onApplyCouponToBagFromList: coupon => {
    return new Promise((resolve, reject) => {
      dispatch(
        applyCoupon({
          formData: { couponCode: coupon.id, analyticsData },
          formPromise: { resolve, reject },
          coupon,
        })
      );
    });
  },
  onRemove: coupon => {
    return new Promise((resolve, reject) => {
      dispatch(removeCoupon({ coupon, formPromise: { resolve, reject } }));
    });
  },
  handleErrorCoupon: coupon => {
    setTimeout(() => {
      dispatch(setError({ msg: null, couponCode: coupon.id }));
    }, DEFAULT_TOAST_ERROR_MESSAGE_TTL);
  },
  toastMessage: coupon => {
    dispatch(toastMessageInfo(coupon.error));
    setTimeout(() => {
      dispatch(setError({ msg: null, couponCode: coupon.id }));
    }, DEFAULT_TOAST_ERROR_MESSAGE_TTL);
  },
  toggleNeedHelpModal: () => {
    dispatch(toggleNeedHelpModalState());
  },
  fetchNeedHelpContent: contentIds => {
    dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRewardsContainer);
