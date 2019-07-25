import React from 'react';
import { shallow } from 'enzyme';
import { AnchorVanilla } from '../views/Anchor.native';

describe('Anchor Native', () => {
  let component;
  const navigate = jest.fn();
  let navigation;
  beforeEach(() => {
    navigation = {
      navigate,
    };
    component = shallow(
      <AnchorVanilla
        url="https://www.google.com/p/Rainbow--The-Birthday-Girl--Graphic-Tee"
        navigation={navigation}
        text="click Me"
        internal
      />
    );
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

  it('should call parseUrl', () => {
    component.props().onPress();
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('should call onPress for external url handler', () => {
    component.setProps({ internal: false, onPress: navigate });
    component.props().onPress();
    expect(navigate).toHaveBeenCalledTimes(2);
  });

  it('should call for plp page', () => {
    component.setProps({ internal: true, url: 'https://www.google.com/c/test' });
    component.props().onPress();
    expect(navigate).toHaveBeenCalledTimes(3);
  });

  it('should return null', () => {
    component.setProps({ internal: true, url: 'https://www.google.com/test' });
    component.props().onPress();
    expect(navigate).toHaveBeenCalledTimes(3);
  });

  it('should return navigation to default browser', () => {
    component.setProps({ internal: false, onPress: null });
    component.props().onPress();
    expect(navigate).toHaveBeenCalledTimes(3);
  });
});
