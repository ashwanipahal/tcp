import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardNumberVanilla } from '../views/CreditCardNumber.view';

describe('CreditCardNumber component', () => {
  it('should renders correctly when cardType is present', () => {
    const props = {
      cardType: 'VISA',
    };
    const component = shallow(<CreditCardNumberVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when isExpirationRequired is false', () => {
    const props = {
      cardType: '',
    };
    const component = shallow(<CreditCardNumberVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
