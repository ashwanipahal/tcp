import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BagPageSelector from '../../../../../CnC/BagPage/container/BagPage.selectors';
import BAG_PAGE_ACTIONS from '../../../../../CnC/BagPage/container/BagPage.actions';
import { getCouponList } from '../../../../../CnC/common/organism/CouponAndPromos/container/Coupon.actions';
import CouponAndPromos from '../../../../../CnC/common/organism/CouponAndPromos';

export class MyOffersCouponsContainer extends PureComponent {
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent, fetchCoupons } = this.props;
    fetchNeedHelpContent([needHelpContentId]);
    fetchCoupons();
  }

  render() {
    const { closedOverlay } = this.props;
    return <CouponAndPromos showAccordian={false} isCarouselView closedOverlay={closedOverlay} />;
  }
}

export const mapDispatchToProps = dispatch => ({
  fetchNeedHelpContent: contentIds => {
    dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
  },
  fetchCoupons: () => {
    dispatch(getCouponList());
  },
});

export const mapStateToProps = state => ({
  needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
});

MyOffersCouponsContainer.propTypes = {
  fetchCoupons: PropTypes.func.isRequired,
  closedOverlay: PropTypes.func,
  fetchNeedHelpContent: PropTypes.func.isRequired,
  needHelpContentId: PropTypes.string,
};

MyOffersCouponsContainer.defaultProps = {
  closedOverlay: () => {},
  needHelpContentId: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOffersCouponsContainer);
