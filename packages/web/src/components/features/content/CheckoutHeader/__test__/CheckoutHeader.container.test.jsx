import React from 'react';
import { shallow } from 'enzyme';
import CheckoutHeader from '../container/CheckoutHeader.container';

describe('checkout header Container', () => {
  const props = {
    labels: {},
    brandTabs: {},
  };
  it('should render Added to Bag view section', () => {
    const component = shallow(<CheckoutHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
