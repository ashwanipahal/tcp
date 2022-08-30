import React from 'react';
import { shallow } from 'enzyme';
import { ShippingFormVanilla } from '../views/ShippingForm.view.native';

describe('Shipping Form', () => {
  it('should render correctly', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      handleSubmit: jest.fn(),
      isGuest: true,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with non us site', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      handleSubmit: jest.fn(),
      isGuest: true,
      isUsSite: false,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with signed in', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
      handleSubmit: jest.fn(),
      isGuest: false,
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
