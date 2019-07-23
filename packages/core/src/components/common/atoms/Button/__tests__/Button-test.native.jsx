import React from 'react';
import { shallow } from 'enzyme';
import { CustomButtonVanilla } from '../views/Button.native';

describe('CustomButton', () => {
  let component;

  const props = {
    selectedValue: 'foo',
    data: [],
  };

  beforeEach(() => {
    component = shallow(<CustomButtonVanilla {...props} />);
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
