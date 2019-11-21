import React from 'react';
import { shallow } from 'enzyme';
import { OrderBillingDetailsVanilla } from '../OrderBillingDetails.view';

describe('Order Billing Details component', () => {
  it('should renders correctly with credit card details', () => {
    const props = {
      ordersLabels: {},
      className: '',
      orderDetailsData: {
        checkout: {
          billing: {
            card: {
              cardType: 'VISA',
              endingNumbers: '************1111',
            },
          },
        },
      },
    };
    const component = shallow(<OrderBillingDetailsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with venmo card ', () => {
    const props = {
      ordersLabels: {},
      className: '',
      orderDetailsData: {
        checkout: {
          billing: {
            card: {
              cardType: 'VENMO',
              endingNumbers: 'testusername',
            },
          },
        },
      },
    };
    const component = shallow(<OrderBillingDetailsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
