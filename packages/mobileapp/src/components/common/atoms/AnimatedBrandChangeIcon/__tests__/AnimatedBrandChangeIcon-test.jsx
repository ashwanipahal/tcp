import React from 'react';
import { shallow } from 'enzyme';
import AnimatedBrandChangeIcon from '../AnimatedBrandChangeIcon';

describe('Animated Brand Change Icon Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AnimatedBrandChangeIcon />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render brand component', () => {
    expect(component.find('[name="tcpBrand"]').length).toBe(1);
    expect(component.find('[name="gymboreeBrand"]').length).toBe(1);
  });

  it('should change position on click', () => {
    component.instance().setState({ openSwitch: false });
    component.props().onPress();
    expect(component.instance().state.openSwitch).toBeTruthy();
  });

  it('should change position on tcp brand switch', () => {
    const brand = component.find('[name="tcpBrand"]');
    brand.props().onPress();
    expect(component.instance().state.openSwitch).toBeFalsy();
  });

  it('should change position on gymboree brand switch', () => {
    const toggleBrandAction = jest.fn();
    const updateAppTypeHandler = jest.fn();
    component.setProps({ toggleBrandAction, updateAppTypeHandler });
    const brand = component.find('[name="gymboreeBrand"]');
    brand.props().onPress();
    expect(component.instance().state.openSwitch).toBeFalsy();
    expect(toggleBrandAction).toHaveBeenCalled();
    expect(updateAppTypeHandler).toHaveBeenCalled();
  });
});
