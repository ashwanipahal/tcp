import React from 'react';
import { shallow } from 'enzyme';
import { OrderSummaryDetailsVanilla } from '../OrderSummaryDetails.view';

describe('Order Summary Details component', () => {
  it('should renders correctly with shipping value', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {
        summary: {
          currencySymbol: '$',
          grandTotal: 12.5,
          shippingTotal: 23,
          totalTax: 1.37,
        },
      },
    };
    const component = shallow(<OrderSummaryDetailsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('if orderDetails Data is not available', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {},
    };
    const component = shallow(<OrderSummaryDetailsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with free shipping', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {
        summary: {
          currencySymbol: '$',
          grandTotal: 12.5,
          shippingTotal: 0,
          totalTax: 1.37,
        },
      },
    };
    const component = shallow(<OrderSummaryDetailsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly for valid coupon and promotion amount', () => {
    const props = {
      ordersLabels: {},
      orderDetailsData: {
        summary: {
          currencySymbol: '$',
          grandTotal: 12.5,
          shippingTotal: 0,
          totalTax: 1.37,
          couponsTotal: -21.2,
        },
      },
    };
    const component = shallow(<OrderSummaryDetailsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
