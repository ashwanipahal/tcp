import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Col from '@tcp/core/src/components/common/atoms/Col';
import CouponListSection from '../../../../../../common/organisms/CouponListSection';
import CouponDetailModal from './CouponDetailModal.view';
import CouponHelpModal from './CouponHelpModal.view';
import CouponForm from '../../../molecules/CouponForm';
import styles from '../styles/Coupon.style';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';

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

  getHeader = () => {
    return (
      <div className="elem-mb-SM rewards-header">
        <BodyCopy fontFamily="secondary" fontSize="fs16" fontWeight="semibold" component="span">
          REWARDS & OFFERS
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
  }) => {
    return (
      <div className={className}>
        <CouponForm
          onSubmit={handleApplyCoupon}
          isFetching={isFetching}
          source="form"
          labels={labels}
          onNeedHelpTextClick={this.toggleNeedHelpModal}
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
          />
        </div>
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
      className,
      handleRemoveCoupon,
      handleErrorCoupon,
      detailStatus,
      helpStatus,
      selectedCoupon,
    });
    return (
      <div className={`${className} coupon-form`}>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
          ignoreGutter={{ small: true, medium: true }}
          className={showAccordian ? 'hide-in-large-up' : 'hideAccordian'}
        >
          <CollapsibleContainer
            className={className}
            header={header}
            body={body}
            iconLocator="arrowicon"
          />
        </Col>
        <div className={showAccordian ? 'hide-in-medium-down' : ''}>{body}</div>
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
};

export default withStyles(CouponView, styles);
export { CouponView as CouponViewVanilla };
