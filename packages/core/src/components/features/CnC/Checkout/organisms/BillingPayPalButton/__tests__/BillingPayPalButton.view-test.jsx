import React from 'react';
import { shallow } from 'enzyme';
import { BillingPayPalButtonVanilla } from '../views/BillingPayPalButton.view';

const labels = {
  continueWithPayPal: 'Payment Method',
};

describe('ButtonList component', () => {
  const props = {
    className: '',
    labels,
  };

  it('renders correctly without props', () => {
    const component = shallow(<BillingPayPalButtonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly without props', () => {
    const component = shallow(<BillingPayPalButtonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
