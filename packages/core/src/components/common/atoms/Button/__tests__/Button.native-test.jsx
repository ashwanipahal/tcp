import React from 'react';
import { shallow } from 'enzyme';
import Button from '../views/Button.native';

describe('Button', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should render correctly', () => {
    const tree = shallow(<Button name="button test" />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const props = {
      title: 'Hello',
      id: 'abc',
      buttonVariation: 'fixed-width',
    };
    const component = shallow(<Button {...props} />);
    expect(component.find('#abc')).toHaveLength(1);
  });
});
