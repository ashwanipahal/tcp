import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import promotionBannerSelectors from './PromotionBanner.selectors';
import PromotionBanner from '../views/PromotionBanner.view';
import { getTcpSegmentValue } from '../../../../../reduxStore/selectors/session.selectors';

export class PromotionBannerContainer extends PureComponent<Props> {
  render() {
    const { labels, tcpSegmentValue, bossBanner, fullBleed } = this.props;
    return (
      <PromotionBanner
        labels={labels}
        tcpSegmentValue={tcpSegmentValue}
        bossBanner={bossBanner}
        fullBleed={fullBleed}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    labels: promotionBannerSelectors.getPickupPromotionBannerLabels(state),
    tcpSegmentValue: getTcpSegmentValue(state),
  };
};
export default connect(mapStateToProps)(PromotionBannerContainer);
