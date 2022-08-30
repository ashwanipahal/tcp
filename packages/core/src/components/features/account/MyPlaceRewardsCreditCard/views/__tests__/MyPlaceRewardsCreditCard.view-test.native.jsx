import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsCreditCard } from '../MyPlaceRewardsCreditCard.view.native';

describe('MyPlaceRewardsCreditCard View component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<MyPlaceRewardsCreditCard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
