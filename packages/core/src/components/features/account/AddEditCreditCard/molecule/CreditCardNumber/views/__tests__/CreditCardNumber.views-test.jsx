import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardNumber } from '../CreditCardNumber.views';

describe('CreditCardNumber component', () => {
  it('should renders correctly when cardType is present', () => {
    const props = {
      cardType: 'VISA',
    };
    const component = shallow(<CreditCardNumber {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when isExpirationRequired is false', () => {
    const props = {
      cardType: '',
    };
    const component = shallow(<CreditCardNumber {...props} />);
    expect(component).toMatchSnapshot();
  });
});
