import React from 'react';
import { shallow } from 'enzyme';
import { CTAVanilla } from '../views/CTA';

describe('CTA component', () => {
  it('CTA component renders correctly', () => {
    const props = {
      className: 'checkout',
      onClickCartCheckout: jest.fn(),
    };
    const component = shallow(<CTAVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
