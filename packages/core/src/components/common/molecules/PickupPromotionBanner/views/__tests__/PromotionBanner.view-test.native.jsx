import React from 'react';
import { shallow } from 'enzyme';

import { PromotionBannerVanilla, modifiedBannerText } from '../PromotionBanner.view.native';

describe('ProductAddToBagVanilla should render correctly', () => {
  const props = {
    bossBanner: true,
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
      lbl_fullBleed_banner_boss_text: 'PICK UP IN STORE AND SAVE AN EXTRA $tcpSegmentValue$%',
    },
    fullBleed: false,
    tcpSegmentValue: '',
    itemBrand: 'tcp',
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<PromotionBannerVanilla {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call modifiedBannerText', () => {
    props.fullBleed = true;
    const wrapper = shallow(<PromotionBannerVanilla {...props} />);
    modifiedBannerText('', props);
    expect(wrapper).toMatchSnapshot();
  });
});
