import React from 'react';
import { shallow } from 'enzyme';
import { ImageCompVanilla } from '../views/Image.native';

describe('ImageCompVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ImageCompVanilla />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('Image')).toHaveLength(1);
  });
});
