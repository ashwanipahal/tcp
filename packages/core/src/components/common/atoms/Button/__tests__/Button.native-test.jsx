import React from 'react';
import { shallow } from 'enzyme';
import Button from '../views/Button.native';

describe('Button', () => {
  const props = {
    id: 'btn',
    name: 'button test',
    buttonVariation: 'fixed-width',
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<Button {...props} />);
  });

  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('#btn')).toHaveLength(1);
  });
});
