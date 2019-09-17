import React from 'react';
import { shallow } from 'enzyme';
import PayPalButton from '../views/PayPalButton.view';

describe('PayPalButton component', () => {
  it('PayPalButton component renders correctly', () => {
    const props = {
      className: '',
      locale: '',
      style: '',
      containerId: '',
    };
    const component = shallow(<PayPalButton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
