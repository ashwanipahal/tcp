import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getLabelsCartItemTile } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import PromotionBanner from '../views/PromotionBanner.view';
import {getTcpSegmentValue} from '../../../../../reduxStore/selectors/session.selectors'

export class PromotionBannerContainer extends PureComponent<Props> {

  render() {
    const { labels, tcpSegmentValue, bossBanner, fullBleed } = this.props;
    return <PromotionBanner labels={labels} tcpSegmentValue={tcpSegmentValue} bossBanner={bossBanner} fullBleed={fullBleed} />;
  }
}

export const mapStateToProps = state => {
  return {
    labels: {
      lbl_banner_boss_disc_tcp_default: '5',
      lbl_banner_boss_disc_tcp_A: '6',
      lbl_banner_boss_disc_tcp_B: '10',
      lbl_banner_boss_disc_tcp_C: '15',
      lbl_banner_boss_disc_gym_default: '6',
      lbl_banner_boss_disc_gym_A: '7',
      lbl_banner_boss_disc_gym_B: '12',
      lbl_banner_boss_disc_gym_C: '15',
      lbl_banner_boss_text: 'EXTRA $tcpSegmentValue$% OFF',
      lbl_fullBleed_banner_boss_text: 'PICK UP IN STORE AND SAVE AN EXTRA $tcpSegmentValue$%'

    }, //getLabelsCartItemTile(state),
    tcpSegmentValue: getTcpSegmentValue(state)
  };
};
export default connect(mapStateToProps)(PromotionBannerContainer);
