import React from 'react';
import { shallow } from 'enzyme';
import { CardVanilla } from '../views/Card';

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
    cardNumber: '',
    showAddress: false,
  };

  it('renders correctly without props', () => {
    const component = shallow(<CardVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
