import React from 'react';
import { shallow } from 'enzyme';
import { CustomIconVanilla } from '../views/Icon.native';

describe('CustomButton', () => {
  let component;
  const props = {
    name: 'FontAwesome',
    size: 11,
    color: '#ff0000',
  };

  beforeEach(() => {
    component = shallow(<CustomIconVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  // it('should return abc component value one', () => {
  //   expect(component.find('CustomIcon')).toHaveLength(1);
  // });
});
