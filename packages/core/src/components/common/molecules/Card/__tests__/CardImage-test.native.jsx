import React from 'react';
import { shallow } from 'enzyme';
import { CardImage } from '../views/CardImage.native';

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
    cardNumber: '************3743',
  };
  const component = shallow(<CardImage {...props} />);

  it('renders correctly without props', () => {
    expect(component).toMatchSnapshot();
  });
});
