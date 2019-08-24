import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardFields } from '../CreditCardFields.view';

describe('CreditCardFields component', () => {
  it('should renders correctly when isExpirationRequired is true', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
    };
    const component = shallow(<CreditCardFields {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when isExpirationRequired is false', () => {
    const props = {
      isExpirationRequired: false,
      labels: {
        paymentGC: {},
        common: {},
      },
    };
    const component = shallow(<CreditCardFields {...props} />);
    expect(component).toMatchSnapshot();
  });
});
