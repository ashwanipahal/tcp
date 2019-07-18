import React from 'react';
// import { List } from 'immutable';
import { shallow } from 'enzyme';
import CreditCardModalInfo from '../CreditCardModalInfo.view';

describe('CreditCardModalInfo Component', () => {
  it('should render correctly', () => {
    const props = {
      data: {
        description: { ccBrand: 'dfg' },
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
    const tree = shallow(<CreditCardModalInfo {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
