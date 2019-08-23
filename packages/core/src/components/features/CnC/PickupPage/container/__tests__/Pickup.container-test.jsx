import React from 'react';
import { shallow } from 'enzyme';
import { PickupContainerVanilla } from '../Pickup.container';

describe('Pickup Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<PickupContainerVanilla />);
    expect(tree).toMatchSnapshot();
  });
});
