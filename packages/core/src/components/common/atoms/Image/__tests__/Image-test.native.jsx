import React from 'react';
import { shallow } from 'enzyme';
import ImageComp from '../views/Image.native';

describe('ImageComp', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ImageComp id="ImageComp" />);
  });

  it('should be defined', () => {
    expect(ImageComp).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('#ImageComp')).toHaveLength(1);
  });
});
