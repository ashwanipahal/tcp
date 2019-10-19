import React from 'react';
import { shallow } from 'enzyme';
import OrderGroupHeader from '../OrderGroupHeader.view';

describe('Order Group Header component', () => {
  it('should renders correctly', () => {
    const props = { label: 'PurchaseItems', message: '1' };
    const component = shallow(<OrderGroupHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
