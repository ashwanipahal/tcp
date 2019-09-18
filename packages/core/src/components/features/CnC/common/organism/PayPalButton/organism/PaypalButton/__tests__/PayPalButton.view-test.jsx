import React from 'react';
import { shallow } from 'enzyme';
import PayPalButton from '../views/PayPalButton.view';

describe('PayPalButton component', () => {
  it('PayPalButton component renders correctly', () => {
    const mocked = jest.fn();
    const props = {
      className: '',
      height: 48,
      containerId: '',
      isQualifedOrder: false,
      error: 'Error',
      isAddToBagModal: false,
      initalizePayPalButton: mocked,
    };
    const component = shallow(<PayPalButton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
