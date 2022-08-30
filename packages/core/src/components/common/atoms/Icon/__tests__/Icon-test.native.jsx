import React from 'react';
import { shallow } from 'enzyme';
import { CustomIconVanilla } from '../views/Icon.native';
import { ICON_FONT_CLASS, ICON_NAME } from '../Icon.constants';

describe('CustomIcon', () => {
  let component;
  const props = {
    name: ICON_NAME.chevronRight,
    size: 20,
    color: '#ff0000',
    iconFontName: ICON_FONT_CLASS.FontAwesome,
    isDisabled: false,
    onPress: () => {},
    isButton: false,
    theme: {},
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
