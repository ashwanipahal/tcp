import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles';
import {
  styles,
  WrapperStyle,
  CouponListContainer,
  StyledHeader,
} from '../styles/Coupon.style.native';
import CouponForm from '../../../molecules/CouponForm';
import CouponListSection from '../../../../../../common/organisms/CouponListSection';
import CouponHelpModal from './CouponHelpModal.view';
import CouponDetailModal from './CouponDetailModal.view';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { getLabelValue } from '../../../../../../../utils';

class CouponView extends React.PureComponent {
  state = {
    detailStatus: false,
    helpStatus: false,
    selectedCoupon: {},
  };

  couponDetailClick = coupon => {
    this.setState({
      detailStatus: true,
      selectedCoupon: coupon,
    });
  };

  toggleNeedHelpModal = () => {
    const { helpStatus } = this.state;
    this.setState({
      helpStatus: !helpStatus,
    });
  };

  getHeader = ({ labels }) => {
    return (
      <StyledHeader>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          component="span"
          text={getLabelValue(labels, 'lbl_bonusPoints_placeRewardsDay')}
        />
      </StyledHeader>
    );
  };

  getContent = ({
    isFetching,
    labels,
    handleApplyCoupon,
    handleApplyCouponFromList,
    appliedCouponList,
    availableCouponList,
    handleRemoveCoupon,
    handleErrorCoupon,
    detailStatus,
    helpStatus,
    selectedCoupon,
  }) => {
    return (
      <WrapperStyle>
        <CouponForm
          onSubmit={handleApplyCoupon}
          isFetching={isFetching}
          source="form"
          labels={labels}
          onNeedHelpTextClick={this.toggleNeedHelpModal}
        />
        <CouponListContainer>
          {appliedCouponList && (
            <CouponListSection
              labels={labels}
              isFetching={isFetching}
              couponList={appliedCouponList}
              className="applied_coupon"
              heading={labels.APPLIED_REWARDS_HEADING}
              couponDetailClick={this.couponDetailClick}
              onRemove={handleRemoveCoupon}
              dataLocator="coupon-cartAppliedRewards"
              handleErrorCoupon={handleErrorCoupon}
            />
          )}
          {availableCouponList && (
            <CouponListSection
              labels={labels}
              isFetching={isFetching}
              couponList={availableCouponList}
              className="available_coupon"
              heading={labels.AVAILABLE_REWARDS_HEADING}
              helpSubHeading="true"
              couponDetailClick={this.couponDetailClick}
              helpAnchorClick={this.toggleNeedHelpModal}
              onApply={handleApplyCouponFromList}
              dataLocator="coupon-cartAvaliableRewards"
              handleErrorCoupon={handleErrorCoupon}
            />
          )}
        </CouponListContainer>
        <CouponDetailModal
          labels={labels}
          openState={detailStatus}
          coupon={selectedCoupon}
          onRequestClose={() => {
            this.setState({
              detailStatus: false,
            });
          }}
        />
        <CouponHelpModal
          labels={labels}
          openState={helpStatus}
          onRequestClose={this.toggleNeedHelpModal}
        />
      </WrapperStyle>
    );
  };

  render() {
    const {
      isFetching,
      labels,
      handleApplyCoupon,
      handleApplyCouponFromList,
      appliedCouponList,
      availableCouponList,
      handleRemoveCoupon,
      handleErrorCoupon,
      isCheckout,
      showAccordian,
    } = this.props;

    const { detailStatus, helpStatus, selectedCoupon } = this.state;

    const header = this.getHeader({ labels });
    const body = this.getContent({
      isFetching,
      labels,
      handleApplyCoupon,
      handleApplyCouponFromList,
      appliedCouponList,
      availableCouponList,
      handleRemoveCoupon,
      handleErrorCoupon,
      isCheckout,
      detailStatus,
      helpStatus,
      selectedCoupon,
    });

    return (
      <View>
        {showAccordian ? (
          <CollapsibleContainer header={header} body={body} iconLocator="arrowicon" />
        ) : (
          <>
            {header}
            {body}
          </>
        )}
      </View>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isCheckout: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleApplyCouponFromList: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
  handleErrorCoupon: PropTypes.func.isRequired,
  showAccordian: PropTypes.bool,
};

CouponView.defaultProps = {
  showAccordian: true,
};

export default withStyles(CouponView, styles);
export { CouponView as CouponViewVanilla };
