import React from 'react';
import { shallow } from 'enzyme';
import { ShippingFormVanilla } from '../views/ShippingForm.view';

describe('Shipping Form', () => {
  it('should render correctly', () => {
    const props = {
      addressLabels: { addressFormLabels: {} },
      shippingLabels: {},
      smsSignUpLabels: {},
    };
    const tree = shallow(<ShippingFormVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
