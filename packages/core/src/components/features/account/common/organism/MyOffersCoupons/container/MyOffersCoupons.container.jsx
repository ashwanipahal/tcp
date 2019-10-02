import React from 'react';
import { connect } from 'react-redux';
import BagPageSelector from '../../../../../CnC/BagPage/container/BagPage.selectors';
import BAG_PAGE_ACTIONS from '../../../../../CnC/BagPage/container/BagPage.actions';
import CouponAndPromos from '../../../../../CnC/common/organism/CouponAndPromos';

export class MyOffersCouponsContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent } = this.props;
    fetchNeedHelpContent([needHelpContentId]);
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
});

export const mapStateToProps = state => ({
  needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOffersCouponsContainer);
