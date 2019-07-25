import React from 'react';
import { shallow } from 'enzyme';
import { CustomIconVanilla } from '../views/Icon.native';
import { ICON_FONT_CLASS } from '../Icon.constants';
import IconStyle from '../Icon.style.native';

describe('CustomButton', () => {
  let component;
  const props = {
    name: 'FontAwesome',
    size: 20,
    color: '#ff0000',
    children: {},
    iconFontName: ICON_FONT_CLASS.FontAwesome,
    isDisabled: false,
    iconStyle: {},
    backgroundColor: '#ff0000',
    borderRadius: 0,
    onPress: () => {},
    isButton: false,
    sizeVariation: 'medium',
    theme: { ...IconStyle },
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
});
