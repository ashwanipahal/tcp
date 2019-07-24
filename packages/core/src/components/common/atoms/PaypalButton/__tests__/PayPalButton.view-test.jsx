import React from 'react';
import { shallow } from 'enzyme';
import PayPalButton from '@tcp/core/src/components/common/atoms/PayPalButton/views/PayPalButton.view';

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
