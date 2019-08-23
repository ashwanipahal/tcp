import React from 'react';
import { shallow } from 'enzyme';
import { ShippingPageVanilla } from '../ShippingPage.container';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const tree = shallow(<ShippingPageVanilla />);
    expect(tree).toMatchSnapshot();
  });
});
