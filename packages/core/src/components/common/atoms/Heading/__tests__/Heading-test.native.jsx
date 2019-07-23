import React from 'react';
import { shallow } from 'enzyme';
import { HeadingVanilla } from '../views/Heading.native';

describe('HeadingVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<HeadingVanilla />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('Text')).toHaveLength(1);
  });
});
