import React from 'react';
import { shallow } from 'enzyme';
import ShippingPage from '../ShippingPage.view';
import { ShippingFormVanilla } from '../../organisms/ShippingForm/views/ShippingForm.view';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<ShippingPage />);
    tree.instance().renderLeftSection();
    expect(tree).toMatchSnapshot();
    expect(ShippingFormVanilla).toHaveLength(1);
  });
});
