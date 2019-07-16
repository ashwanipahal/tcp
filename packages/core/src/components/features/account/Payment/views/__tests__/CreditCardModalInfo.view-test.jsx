import React from 'react';
// import { List } from 'immutable';
import { shallow } from 'enzyme';
import { CreditCardModalInfoVanilla } from '../CreditCardModalInfo.view';

describe('CreditCardModalInfo Component', () => {
  it('should render correctly', () => {
    const props = {
      data: {
        heading: 'abc',
        cardText: {
          expire: 'fgh',
          cardEnd: '111',
        },
        addressDetails: {
          addressLine1: 'Yucca Street',
          addressLine2: '',
          city: 'Los Angeles',
          firstName: 'six',
          lastName: 'test',
          state: 'CA',
          zipCode: '90028',
        },
        TotalExp: '123',
        getAccNumbr: 'www',
      },
    };
    const tree = shallow(<CreditCardModalInfoVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
