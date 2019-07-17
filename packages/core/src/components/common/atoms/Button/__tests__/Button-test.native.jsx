import React from 'react';
import { shallow } from 'enzyme';
import { CustomButtonVanilla } from '../views/Button.native';

describe('CustomButton', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CustomButtonVanilla />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('TouchableOpacity')).toHaveLength(1);
  });
});
