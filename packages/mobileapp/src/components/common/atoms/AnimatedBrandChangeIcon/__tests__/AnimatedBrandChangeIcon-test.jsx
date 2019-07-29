import React from 'react';
import { shallow } from 'enzyme';
import AnimatedBrandChangeIcon from '../AnimatedBrandChangeIcon';

describe('Animated Brand Change Icon Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AnimatedBrandChangeIcon />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('TouchableOpacity')).toHaveLength(3);
  });
});
