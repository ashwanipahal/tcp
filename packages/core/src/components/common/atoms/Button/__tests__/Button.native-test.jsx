import React from 'react';
import { shallow } from 'enzyme';
import Button from '../views/Button.native';

describe('Button', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Button />);
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
