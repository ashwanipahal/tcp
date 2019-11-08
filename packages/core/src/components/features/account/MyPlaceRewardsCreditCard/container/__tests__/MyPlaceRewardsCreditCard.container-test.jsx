import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsCreditCardContainer } from '../MyPlaceRewardsCreditCard.container';

describe('MyPlaceRewardsCreditCardContainer component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      isPLCCModalOpen: false,
      openPLCCModal: () => {},
      openApplyNowModal: () => {},
    };
    const component = shallow(<MyPlaceRewardsCreditCardContainer {...props} />);
    expect(component).toMatchSnapshot();
  });
});
