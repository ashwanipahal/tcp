import React from 'react';
import { shallow } from 'enzyme';
import OrderSummaryDetails from '../OrderSummaryDetails.view';

describe('Order Summary Details component', () => {
  it('should renders correctly with shipping value', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {
        summary: {
          currencySymbol: '$',
          grandTotal: 12.51,
          shippingTotal: 23.1,
          totalTax: 100.1,
        },
      },
    };
    const component = shallow(<OrderSummaryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with free shipping', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {
        summary: {
          currencySymbol: '$',
          grandTotal: 125.5,
          shippingTotal: 10,
          totalTax: 11.37,
        },
      },
    };
    const component = shallow(<OrderSummaryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly for valid coupon and promotion amount', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {
        summary: {
          currencySymbol: '$',
          grandTotal: 122.5,
          shippingTotal: 0,
          totalTax: 1.23,
          couponsTotal: -21.2,
        },
      },
    };
    const component = shallow(<OrderSummaryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
