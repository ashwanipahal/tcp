import React from 'react';
import { shallow } from 'enzyme';
import { CustomIconVanilla } from '../views/Icon';

describe('Button component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-button',
      buttonVariation: 'fixed-width',
    };
    const component = shallow(<CustomIconVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
