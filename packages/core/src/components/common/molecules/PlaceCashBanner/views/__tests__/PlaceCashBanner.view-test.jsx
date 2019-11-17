import React from 'react';
import { shallow } from 'enzyme';

import { PlaceCashBannerVanilla } from '../PlaceCashBanner.view';

describe('ProductAddToBagVanilla should render correctly', () => {
  const label1 = "YAY!, You'll Earn #earnedPlaceCashValue# in PLACE BUCKS";
  const label2 = 'Get #cashAmountOff#  for every #placeCashOffer# you spend!';
  const label3 = 'Cannot be combined with any other offer. Terms & conditions apply.';
  const label4 = 'See Details';
  const imgUrl = 'https://test1.theplace.com/image/upload/v1573831659/group_3x.png';

  const props = {
    labels: {
      lbl_placeCash_US_bag_label1: label1,
      lbl_placeCash_CA_bag_label1: label1,
      lbl_placeCash_US_confirmation_label1: label1,
      lbl_placeCash_CA_confirmation_label1: label1,
      lbl_placeCash_US_bag_label2: label2,
      lbl_placeCash_CA_bag_label2: label2,
      lbl_placeCash_US_confirmation_label2: label2,
      lbl_placeCash_CA_confirmation_label2: label2,
      lbl_placeCash_US_bag_label3: label3,
      lbl_placeCash_CA_bag_label3: label3,
      lbl_placeCash_US_confirmation_label3: label3,
      lbl_placeCash_CA_confirmation_label3: label3,
      lbl_placeCash_US_bag_label4: label4,
      lbl_placeCash_CA_bag_label4: label4,
      lbl_placeCash_US_confirmation_label4: label4,
      lbl_placeCash_CA_confirmation_label4: label4,
      lbl_placeCash_US_bag_imgUrl: imgUrl,
      lbl_placeCash_CA_bag_imgUrl: imgUrl,
      lbl_placeCash_US_confirmation_imgUrl: imgUrl,
      lbl_placeCash_CA_confirmation_imgUrl: imgUrl,
    },
    isEnabled: false,
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<PlaceCashBannerVanilla {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
