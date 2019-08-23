import React from 'react';
import { shallow } from 'enzyme';
import { PickupPageVanilla } from '../views/CheckoutPickUpForm.view';
import { PickUpFormPartVanilla } from '../../../organisms/PickUpFormPart/views/PickUpFormPart.view';

describe('pickup view Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<PickupPageVanilla />);
    tree.instance().pickupForm();
    expect(tree).toMatchSnapshot();
    expect(PickUpFormPartVanilla).toHaveLength(0);
  });
});
