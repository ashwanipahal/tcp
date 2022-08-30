import React from 'react';
import { shallow } from 'enzyme';
import { Animated } from 'react-native';
import AppSplash from '../AppSplash';

describe('Appsplash component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppSplash />);
    jest.runOnlyPendingTimers();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper.find('View').length).toBe(1);
    expect(wrapper.find(Animated.View).length).toBe(2);
    expect(wrapper.find(Animated.Image).length).toBe(1);
  });

  it('should render tcp launch image by default', () => {
    const image = wrapper.find(Animated.Image);
    expect(image.props().source.testUri).toContain('tcpLaunchImage.png');
  });
});
