import React from 'react';
import { shallow } from 'enzyme';
import { PriceCurrencyVanilla } from '../views/PriceCurrency.view';

describe('PriceCurrency component with USD Currency', () => {
  it('renders correctly', () => {
    const props = {
      price: 0,
      currencySymbol: '$',
      currency: 'USD',
    };
    const component = shallow(<PriceCurrencyVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});

describe('PriceCurrency component with Australian Dollar', () => {
  it('renders correctly', () => {
    const props = {
      price: 0,
      currencySymbol: '$',
      currency: 'AUD',
    };
    const component = shallow(<PriceCurrencyVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
