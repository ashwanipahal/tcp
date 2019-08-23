import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardNumber } from '../CreditCardNumber.view.native';

describe('CreditCardNumber component', () => {
  it('should renders correctly when cardType is present', () => {
    const props = {
      cardType: 'VISA',
      className: 'field',
      isEdit: false,
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
