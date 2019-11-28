import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardNumberVanilla } from '../views/CreditCardNumber.view.native';

describe('CreditCardNumber component', () => {
  let component;
  const props = {
    cardType: 'VISA',
    className: '',
    isEdit: true,
  };
  beforeEach(() => {
    component = shallow(<CreditCardNumberVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should renders correctly when cardType is present', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return CreditCardTextBox component value one', () => {
    expect(component.find('CreditCardTextBox')).toHaveLength(1);
  });
});
