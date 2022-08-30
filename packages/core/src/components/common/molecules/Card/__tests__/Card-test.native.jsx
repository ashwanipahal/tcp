import React from 'react';
import { shallow } from 'enzyme';
import { CardVanilla } from '../views/Card.native';

describe('Card component', () => {
  const props = {
    card: {
      accountNo: '************3743',
      addressDetails: {
        addressLine1: 'Dorney Park Road',
        addressLine2: '',
        city: 'Allentown',
        country: 'US',
      },
      ccBrand: 'PLACE CARD',
      ccType: 'PLACE CARD',
      creditCardId: 82596,
      defaultInd: false,
    },
    className: '',
    dataLocatorPrefix: '',
    fontWeight: '',
    labels: { lbl_billing_select: 'test', lbl_billing_default_card: 'default' },
    isMobile: false,
    isDefault: false,
    cardNumber: '************3743',
    showAddress: false,
  };
  const component = shallow(<CardVanilla {...props} />);

  it('renders correctly without props', () => {
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with props dataLocatorPrefix', () => {
    component.setProps({ dataLocatorPrefix: 'card' });
    expect(component).toBeDefined();
  });
  it('renders correctly with showAddress', () => {
    component.setProps({ showAddress: true });
    expect(component).toBeDefined();
  });
  it('renders correctly with isDefault', () => {
    component.setProps({ isDefault: true });
    expect(component).toBeDefined();
  });
});
