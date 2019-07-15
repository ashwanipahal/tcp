import React from 'react';
import { shallow } from 'enzyme';
import CustomButton from '../views/Button.native';

describe('CustomButton', () => {
  let component;
  const props = {
    id: 'btn',
  };

  beforeEach(() => {
    component = shallow(<CustomButton {...props} />);
  });

  it('should be defined', () => {
    expect(CustomButton).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('#btn')).toHaveLength(1);
  });
});
