import React from 'react';
import { shallow } from 'enzyme';
import { Animated } from 'react-native';
import SecondAppPeekABooView from '../SecondAppPeekABooView';

Date.now = jest.fn(() => new Date('2019-08-01'));

describe('SecondAppPeekABooView component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SecondAppPeekABooView />);
    jest.runOnlyPendingTimers();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper.find(Animated.View).length).toBe(1);
    expect(wrapper.find(Animated.Image).length).toBe(1);
  });

  it('should render gymboree launch image by default', () => {
    const image = wrapper.find(Animated.Image);
    expect(image.props().source.testUri).toContain('gymboreePeekABoo.png');
  });

  it('should call peek-a-boo animation method', () => {
    wrapper.instance().showAnimation();
    expect(wrapper.find(Animated.View).props().style[0].width).toBeDefined();
  });
});
