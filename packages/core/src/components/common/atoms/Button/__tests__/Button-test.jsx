import React from 'react';
import { shallow } from 'enzyme';
import { ButtonVanilla } from '../views/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-button',
      buttonVariation: 'fixed-width',
    };
    const component = shallow(<ButtonVanilla {...props}>ABCD</ButtonVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-button')).toHaveLength(1);
    // The default button should not be disabled
    expect(component.find({ disabled: true })).toHaveLength(0);
  });

  it('renders disabled button correctly', () => {
    const props = {
      className: 'sample-button',
      buttonVariation: 'fixed-width',
      disabled: true,
    };
    const component = shallow(<ButtonVanilla {...props}>ABCD</ButtonVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-button')).toHaveLength(1);
    expect(component.find({ disabled: true })).toHaveLength(1);
  });
});
