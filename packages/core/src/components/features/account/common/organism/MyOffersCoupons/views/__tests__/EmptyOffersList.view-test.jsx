import React from 'react';
import { shallow } from 'enzyme';
import { EmptyOffersList } from '../EmptyOffersList.view';

const commonLabels = {
  placeRewards: {
    lbl_my_rewards_shop_now: 'shop now',
    lbl_my_rewards_emptySupportingText: 'Supporting text',
  },
};

describe('EmptyOffersList', () => {
  it('should render correctly', () => {
    const props = {
      commonLabels,
    };
    const tree = shallow(<EmptyOffersList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
