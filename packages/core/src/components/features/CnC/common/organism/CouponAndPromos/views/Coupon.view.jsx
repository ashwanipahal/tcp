import React from 'react';
import PropTypes from 'prop-types';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { PROMOTION_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Col from '../../../../../../common/atoms/Col';
import CouponListSection from '../../../../../../common/organisms/CouponListSection';
import CouponDetailModal from './CouponDetailModal.view';
import CouponHelpModal from './CouponHelpModal.view';
import CouponForm from '../../../molecules/CouponForm';
import styles from '../styles/Coupon.style';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';
// import ApplyNowModal from '../../../../../../common/molecules/ApplyNowPLCCModal';

class CouponView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      detailStatus: false,
      helpStatus: false,
      selectedCoupon: {},
    };
  }

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
      <div className="elem-mb-SM rewards-header">
        <BodyCopy fontFamily="secondary" fontSize="fs16" fontWeight="semibold" component="span">
          {labels.couponCollapsibleHeader}
        </BodyCopy>
      </div>
    );
  };

  getContent = ({
    isFetching,
    labels,
    handleApplyCoupon,
    handleApplyCouponFromList,
    appliedCouponList,
    availableCouponList,
    className,
    handleRemoveCoupon,
    handleErrorCoupon,
    detailStatus,
    helpStatus,
    selectedCoupon,
    additionalClassName,
    idPrefix,
  }) => {
    return (
      <div className={className}>
        <CouponForm
          onSubmit={handleApplyCoupon}
          isFetching={isFetching}
          source="form"
          labels={labels}
          onNeedHelpTextClick={this.toggleNeedHelpModal}
          additionalClassNameModal={additionalClassName}
          idPrefix={idPrefix}
        />
        <div className="coupon_list">
          {appliedCouponList && appliedCouponList.size > 0 && (
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
              additionalClassNameModal={additionalClassName}
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
              additionalClassNameModal={additionalClassName}
            />
          )}
          {/* UX timer for coupons list visibility */}
          <RenderPerf.Measure name={PROMOTION_VISIBLE} />
          <CouponDetailModal
            labels={labels}
            openState={detailStatus}
            coupon={selectedCoupon}
            onRequestClose={() => {
              this.setState({
                detailStatus: false,
              });
            }}
            applyToBag={handleApplyCouponFromList}
            additionalClassNameModal={additionalClassName}
          />
          <CouponHelpModal
            labels={labels}
            openState={helpStatus}
            coupon={selectedCoupon}
            onRequestClose={() => {
              this.setState({
                helpStatus: false,
              });
            }}
            heading="Help Modal"
            additionalClassNameModal={additionalClassName}
          />
        </div>
        {/* <ApplyNowModal /> */}
      </div>
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
      className,
      handleRemoveCoupon,
      handleErrorCoupon,
      showAccordian,
      additionalClassNameModal,
      idPrefix,
    } = this.props;
    const { detailStatus, helpStatus, selectedCoupon } = this.state;
    const header = this.getHeader({ labels });
    const body = additionalClassName =>
      this.getContent({
        isFetching,
        labels,
        handleApplyCoupon,
        handleApplyCouponFromList,
        appliedCouponList,
        availableCouponList,
        className,
        handleRemoveCoupon,
        handleErrorCoupon,
        detailStatus,
        helpStatus,
        selectedCoupon,
        additionalClassName,
        idPrefix,
      });
    const defaultOpen = availableCouponList && availableCouponList.size > 0;
    return (
      <div className={className}>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
          ignoreGutter={{ small: true }}
        >
          <CollapsibleContainer
            className={`${className} ${showAccordian ? 'couponsWrapperAccordian' : ''}`}
            header={header}
            body={body(additionalClassNameModal)}
            iconLocator="arrowicon"
            defaultOpen={defaultOpen}
            isDefaultView={!showAccordian}
          />
        </Col>
      </div>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  handleRemoveCoupon: PropTypes.func.isRequired,
  appliedCouponList: PropTypes.shape([]).isRequired,
  availableCouponList: PropTypes.shape([]).isRequired,
  additionalClassNameModal: PropTypes.string.isRequired,
};

export default withStyles(CouponView, styles);
export { CouponView as CouponViewVanilla };
