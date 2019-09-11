import React from 'react';
import { shallow } from 'enzyme';
import { PaymentMethodsVanilla } from '../views/PaymentMethods.view';

describe('ButtonList component', () => {
  const props = {
    className: '',
    paymentHeader: '',
    labels: {},
  };

  it('renders correctly without props', () => {
    const component = shallow(<PaymentMethodsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
