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
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
